# Install dependencies only when needed
FROM node:23.10.0-alpine AS deps

WORKDIR /app
COPY package.json yarn.lock ./
# NOTE: not --frozen-lockfile — the committed yarn.lock is currently out of sync with
# package.json (react/react-dom: resolutions pin ^18.3.1 while devDeps want ^19.1.1).
# Plain `yarn install` uses the lockfile as a base and adjusts those entries. Proper fix:
# run `yarn install` locally and commit the updated yarn.lock, then this can be restored.
RUN yarn install

# If using npm with a `package-lock.json` comment out above and use below instead
# COPY package.json package-lock.json ./
# RUN npm ci

# Rebuild the source code only when needed
FROM node:23.10.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Bigger heap for the 48-package monorepo build + Storybook bundle; no Nx daemon in CI.
ENV NODE_OPTIONS=--max-old-space-size=4096
ENV NX_DAEMON=false
ENV CI=true

# Re-install with the full workspace present (the deps stage only had the root package.json),
# then build every package (types + esm + cjs) before the Storybook build:
#   - Storybook's production build uses packages/*/dist/esm as rollup inputs
#   - tailwind.config.ts -> packages/core/src/preset -> imports @sk-web-gui/utils, which
#     resolves via its package.json "main" to dist/cjs/index.js
# (`boot:storybook` only runs build:esm, which is why dist/cjs was missing.)
RUN yarn install && yarn build && yarn build:storybook

# Production image, copy all the files and run next
FROM node:23.10.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 containeruser

RUN yarn global add http-server

COPY --from=builder --chown=containeruser:nodejs /app/storybook-static ./storybook-static

USER containeruser

# Container port
EXPOSE 8080
ENV PORT=8080

# CMD ["yarn", "run", "storybook"]
CMD ["http-server", "storybook-static"]
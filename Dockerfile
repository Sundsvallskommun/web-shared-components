# Install dependencies only when needed
FROM node:22.14.0-alpine AS deps

WORKDIR /app
COPY package.json yarn.lock ./
# NOTE: not --frozen-lockfile. The repo pins **/react to ^18.3.1 via "resolutions"
# while devDependencies declare react ^19.1.1, which makes yarn consider the
# lockfile permanently out of date under --frozen-lockfile. Fix that react/
# resolutions mismatch to restore reproducible (frozen) installs.
RUN yarn install

# If using npm with a `package-lock.json` comment out above and use below instead
# COPY package.json package-lock.json ./
# RUN npm ci

# Rebuild the source code only when needed
FROM node:22.14.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# The Storybook 10 + Vite production build is memory-heavy (react-docgen-typescript
# builds a full TS program over the monorepo). Without this, Node's default heap cap
# auto-tunes low on a constrained build host and OOMs mid-build — the crash surfaces
# at whatever module jiti happens to be evaluating (e.g. packages/core/src/theme.ts),
# which makes it look unrelated. The app-level NODE_OPTIONS env does NOT reach these
# RUN steps, so it must be set here. The host still needs ~5 GB free (RAM + swap).
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build the styleguide, then generate the component manifest the MCP server reads.
RUN yarn run boot:storybook
RUN node mcp-server/generate-manifest.mjs

# Production image: a single Node server that serves the static styleguide and
# the MCP endpoint at /mcp on the same port.
FROM node:22.14.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 containeruser

# Install only the MCP server's runtime deps (express + MCP SDK), not the full
# monorepo dev dependencies.
COPY mcp-server/package.json ./mcp-server/package.json
RUN cd mcp-server && npm install --omit=dev --no-package-lock

COPY mcp-server/server.mjs ./mcp-server/server.mjs
COPY --from=builder /app/mcp-server/manifest.json ./mcp-server/manifest.json
COPY --from=builder /app/storybook-static ./storybook-static

RUN chown -R containeruser:nodejs /app
USER containeruser

# Container port
EXPOSE 8080
ENV PORT 8080

CMD ["node", "mcp-server/server.mjs"]
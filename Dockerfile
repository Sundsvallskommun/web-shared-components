# Pin both the Node/Alpine release and the multi-platform image digest. Dependabot
# owns updates to this reference.
FROM node:22.23.1-alpine3.24@sha256:16e22a550f3863206a3f701448c45f7912c6896a62de43add43bb9c86130c3e2 AS deps

WORKDIR /app

# Yarn workspaces need the package manifests during installation. Copying the
# filtered build context first keeps a single, frozen install as the only source
# of dependencies used by the build.
COPY . .
RUN HUSKY=0 yarn install --frozen-lockfile --non-interactive

FROM deps AS builder

# Storybook 10 + Vite creates a full TypeScript program for doc generation and
# needs a larger heap on constrained build hosts.
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Do not call the root boot:storybook script here: it intentionally runs another
# install for local development. A container build must never re-resolve deps.
RUN yarn lerna run build:esm --no-private --stream --skip-nx-cache \
  && yarn lerna run build:cjs --no-private --stream --skip-nx-cache \
  && yarn build:storybook \
  && node mcp-server/generate-manifest.mjs \
  && node mcp-server/validate-manifest.mjs

FROM node:22.23.1-alpine3.24@sha256:16e22a550f3863206a3f701448c45f7912c6896a62de43add43bb9c86130c3e2 AS runner

WORKDIR /app
ENV NODE_ENV=production \
  HOST=0.0.0.0 \
  PORT=8080

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 --ingroup nodejs containeruser

# The MCP service has its own committed lockfile because it is deliberately not
# part of the root Yarn workspace. Runtime installation is therefore repeatable.
COPY mcp-server/package.json mcp-server/package-lock.json ./mcp-server/
RUN npm ci --prefix mcp-server --omit=dev --ignore-scripts \
  && npm cache clean --force \
  && rm -rf \
    /root/.npm \
    /usr/local/lib/node_modules/corepack \
    /usr/local/lib/node_modules/npm \
    /opt/yarn-v1.22.22 \
  && rm -f \
    /usr/local/bin/corepack \
    /usr/local/bin/npm \
    /usr/local/bin/npx \
    /usr/local/bin/yarn \
    /usr/local/bin/yarnpkg

COPY mcp-server/server.mjs ./mcp-server/server.mjs
COPY --from=builder /app/mcp-server/manifest.json ./mcp-server/manifest.json
COPY --from=builder /app/storybook-static ./storybook-static

# Application files stay root-owned and read-only to the service account.
USER containeruser

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:8080/healthz').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]

CMD ["node", "mcp-server/server.mjs"]

# Install dependencies only when needed
FROM node:22.14.0-alpine AS deps

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# If using npm with a `package-lock.json` comment out above and use below instead
# COPY package.json package-lock.json ./
# RUN npm ci

# Rebuild the source code only when needed
FROM node:22.14.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

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
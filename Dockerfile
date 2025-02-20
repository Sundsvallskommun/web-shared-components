# Install dependencies only when needed
FROM node:20.18.0-alpine AS deps

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# If using npm with a `package-lock.json` comment out above and use below instead
# COPY package.json package-lock.json ./
# RUN npm ci

# Rebuild the source code only when needed
FROM node:20.18.0-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn run boot:storybook

# Production image, copy all the files and run next
FROM node:20.18.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 containeruser

RUN yarn global add http-server

COPY --from=builder --chown=containeruser:nodejs /app/storybook-static ./storybook-static

USER containeruser

# Container port
EXPOSE 8080
ENV PORT 8080

# CMD ["yarn", "run", "storybook"]
CMD ["http-server", "storybook-static"]
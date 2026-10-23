FROM node:24-slim AS build

WORKDIR /app

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

RUN corepack enable \
    && corepack prepare pnpm@11.25.0 --activate

# Workspace manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

COPY apps/apis/package.json apps/apis/package.json
COPY packages/ai-sdk/package.json packages/ai-sdk/package.json
COPY packages/typescript-config/package.json packages/typescript-config/package.json

# Install workspace dependencies
RUN pnpm install --frozen-lockfile

# Application source
COPY apps/apis apps/apis
COPY packages/ai-sdk packages/ai-sdk
COPY packages/typescript-config packages/typescript-config

# Build SDK, build API, and create production deployment
RUN pnpm --filter @repo/ai-sdk build \
    && pnpm --filter apis build \
    && pnpm --filter apis --prod deploy --legacy /app/deploy

FROM node:24-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

COPY --from=build /app/deploy/ ./

EXPOSE 4000

CMD ["node", "dist/index.js"]
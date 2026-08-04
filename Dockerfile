# Site vitrine Skin Picker — Next.js 15 en mode « standalone ».
# Build : docker compose up -d --build depuis ~/services/skinpicker-site/
#
# L'URL publique est INLINÉE AU BUILD (métadonnées, canonical, Open Graph,
# sitemap, robots) : elle arrive par l'argument NEXT_PUBLIC_SITE_URL. La
# reconstruire est donc obligatoire si le domaine change.

# ── 1. Dépendances ────────────────────────────────────────────────────────────
FROM node:22-slim AS deps
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm ci

# ── 2. Build ──────────────────────────────────────────────────────────────────
FROM node:22-slim AS builder
WORKDIR /build
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_APTABASE_APP_KEY
ARG NEXT_PUBLIC_APTABASE_HOST
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_APTABASE_APP_KEY=$NEXT_PUBLIC_APTABASE_APP_KEY \
    NEXT_PUBLIC_APTABASE_HOST=$NEXT_PUBLIC_APTABASE_HOST \
    NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /build/node_modules node_modules
COPY . .
RUN npm run build

# ── 3. Image finale ───────────────────────────────────────────────────────────
FROM node:22-slim
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=8130 \
    HOSTNAME=0.0.0.0
WORKDIR /srv/site
# `standalone` embarque son propre server.js et le strict nécessaire de node_modules.
COPY --from=builder /build/.next/standalone ./
COPY --from=builder /build/.next/static ./.next/static
COPY --from=builder /build/public ./public
EXPOSE 8130
CMD ["node", "server.js"]

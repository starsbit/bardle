# Production image for self-hosting (homelab k3s "shipyard"): static Angular build served by unprivileged nginx on :8080.
# Build: docker build -t bardle .   Run: docker run -p 8080:8080 bardle
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# build-i18n.js swallows ng build errors, so fail here if any locale is missing
RUN npm run build \
 && for l in en-US ja ko zh; do test -f "dist/bardle/browser/$l/index.html" || { echo "missing locale $l" >&2; exit 1; }; done

FROM nginxinc/nginx-unprivileged:1.29-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/bardle/browser /usr/share/nginx/html
EXPOSE 8080

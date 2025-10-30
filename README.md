# Portafolio de Javier España

<!-- Forced redeploy trigger -->
Last redeploy trigger: 2025-10-29T00:00:00Z



## Continuous Integration (GitHub Actions)

There is a `CI` workflow at `.github/workflows/ci.yml` that runs on pushes and PRs against `main`:

- Installs dependencies with `npm ci`.
- Runs `npm run build`.
- Uploads the `dist/` folder as an artifact for debugging.

If you want Actions to deploy to Netlify automatically, add the following repository secrets in GitHub settings:

- `NETLIFY_AUTH_TOKEN` — your Netlify personal access token
- `NETLIFY_SITE_ID` — the site ID (can be found in the Netlify site settings)

When those secrets are present the workflow includes an optional deploy step that runs `netlify deploy --prod --dir=dist`.

## Docker

A multi-stage `Dockerfile` was added to produce a small, static image served by Nginx. Use this for local containerized testing or to push images to a registry for container-based hosting.

Build locally:

```bash
# build image
docker build -t portafolio:latest .

# run container (port 80)
docker run --rm -p 8080:80 portafolio:latest

# then open http://localhost:8080
```

Notes:
- Docker ensures reproducible builds and is useful when deploying to container platforms (Cloud Run, AWS ECS, DigitalOcean App Platform, etc.).
- Docker itself won't change Netlify CDN caching behavior; to fix stale-client issues use proper cache-control headers (we already added `netlify.toml`) and CI-based deploys that ensure index.html is revalidated.

## Docker Compose

If you want to build and run the app locally with a single command, a `docker-compose.yml` was added. It provides two services:

- `web`: builds the multi-stage production image (uses the `Dockerfile`) and serves the built `dist/` directory with Nginx on port 80. Mapped to host port `8080` by default.
- `dev`: an optional development container that runs the Vite dev server (hot-reload) on port `5173`.

Run both (build and start web container):

```bash
docker compose up --build -d web
# then open http://localhost:8080
```

Run the development container (hot reload):

```bash
docker compose up --build dev
# then open http://localhost:5173
```

To tear down:

```bash
docker compose down
```



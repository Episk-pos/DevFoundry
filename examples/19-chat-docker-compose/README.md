# Chat Docker Compose (Module 19)

The chat application containerized with Docker and orchestrated with Docker Compose — frontend, backend, and database running as isolated containers with Traefik as the reverse proxy.

## What You'll Learn

- **Dockerfile Authoring**: Writing production-ready Dockerfiles for Node.js and React applications
- **Multi-Stage Builds**: Separating build-time and runtime dependencies for smaller images
- **Docker Compose**: Defining and running multi-container applications with a single command
- **Reverse Proxy**: Using Traefik with Docker labels for path-based routing
- **Container Networking**: How services discover and communicate with each other
- **Volume Persistence**: Keeping database data across container restarts
- **Development Overrides**: Using `docker-compose.override.yml` for live reload during development

## Structure

```
19-chat-docker-compose/
├── client/
│   ├── Dockerfile              # Multi-stage build: Node (build) → Caddy (serve)
│   ├── Caddyfile               # Caddy config for SPA routing
│   ├── .dockerignore
│   └── src/                    # React application source
├── server/
│   ├── Dockerfile              # Node.js production image
│   ├── .dockerignore
│   └── src/                    # Express API source (PostgreSQL)
├── docker-compose.yml          # Production-like configuration (Traefik + services)
├── docker-compose.override.yml # Development overrides (live reload)
└── .env.example                # Environment variable template
```

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- No other local dependencies needed — everything runs in containers

## How to Run

### Production-like mode

```bash
# Remove the dev override to run production config only
docker compose -f docker-compose.yml up --build
```

- App: http://localhost:8080
- Traefik dashboard: http://localhost:8081
- Database: localhost:5432

### Development mode (with live reload)

The `docker-compose.override.yml` is loaded automatically and mounts your source code into the containers:

```bash
docker compose up --build
```

Edit files in `server/src/` or `client/src/` — changes are reflected without rebuilding.

### Useful commands

```bash
# View logs for a specific service
docker compose logs -f backend

# Rebuild a single service
docker compose up --build backend

# Stop everything
docker compose down

# Stop and remove all data (including database)
docker compose down -v

# Open a shell inside a running container
docker compose exec backend sh
```

## Architecture

```
Browser → :8080
            │
        ┌───▼───┐
        │Traefik│  (reverse proxy)
        └───┬───┘
            │
    ┌───────┴────────┐
    │                │
/api/*           /*
    │                │
┌───▼───┐      ┌────▼────┐
│Backend│      │Frontend │
│:3001  │      │(Caddy)  │
└───┬───┘      │:80      │
    │          └─────────┘
┌───▼───┐
│  DB   │
│:5432  │
└───────┘
```

Traefik routes requests by path:
- `/api/*` → backend (Express on port 3001) — priority 2
- `/*` → frontend (Caddy serving static files) — priority 1

The frontend uses `/api` as its API base URL (same origin via Traefik), so no CORS is needed in production.

## Key Files

### server/Dockerfile

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["node", "src/index.js"]
```

### client/Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
EXPOSE 80
```

### client/Caddyfile

```
:80 {
	root * /srv
	try_files {path} /index.html
	file_server
}
```

### docker-compose.yml

```yaml
services:
  traefik:
    image: traefik:v3.2
    command:
      - "--api.dashboard=true"
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
    ports:
      - "8080:80"
      - "8081:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro

  frontend:
    build:
      context: ./client
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.frontend.rule=PathPrefix(`/`)"
      - "traefik.http.routers.frontend.priority=1"
      - "traefik.http.services.frontend.loadbalancer.server.port=80"
    depends_on:
      - backend

  backend:
    build:
      context: ./server
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://postgres:secret@db:5432/chat
      CORS_ORIGIN: http://localhost:8080
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.backend.rule=PathPrefix(`/api`)"
      - "traefik.http.routers.backend.priority=2"
      - "traefik.http.services.backend.loadbalancer.server.port=3001"
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: chat
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  pgdata:
```

## Exercises

### 1. Add a Health Check

Add a Docker health check to the backend service so Docker can detect when the API is ready:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/health || exit 1
```

Then update `docker-compose.yml` so the frontend `depends_on` the backend being healthy, not just started.

### 2. Add Redis

Extend `docker-compose.yml` to include a Redis container for session storage or caching. Connect it to the backend via environment variables and add Traefik labels if needed.

### 3. Production Build Optimization

Compare the image sizes of your frontend before and after multi-stage builds. Use `docker images` to check. How much space did the multi-stage build save?

---

**Corresponds to**: [Module 19: Containerization & Orchestration](https://dev.episkopos.community/docs/curriculum/part-5-infrastructure/containerization-and-orchestration)

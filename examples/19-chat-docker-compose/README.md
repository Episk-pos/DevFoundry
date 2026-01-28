# Chat Docker Compose (Module 19)

The chat application containerized with Docker and orchestrated with Docker Compose — frontend, backend, and database running as isolated containers.

## What You'll Learn

- **Dockerfile Authoring**: Writing production-ready Dockerfiles for Node.js and React applications
- **Multi-Stage Builds**: Separating build-time and runtime dependencies for smaller images
- **Docker Compose**: Defining and running multi-container applications with a single command
- **Container Networking**: How services discover and communicate with each other
- **Volume Persistence**: Keeping database data across container restarts
- **Development Overrides**: Using `docker-compose.override.yml` for live reload during development

## Structure

```
19-chat-docker-compose/
├── client/
│   ├── Dockerfile              # Multi-stage build: Node (build) → nginx (serve)
│   ├── .dockerignore
│   ├── nginx.conf              # Custom nginx config for SPA routing
│   └── src/                    # React application source
├── server/
│   ├── Dockerfile              # Node.js production image
│   ├── .dockerignore
│   └── src/                    # Express API source
├── docker-compose.yml          # Production-like configuration
├── docker-compose.override.yml # Development overrides (live reload)
└── .env.example                # Environment variable template
```

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- No other local dependencies needed — everything runs in containers

## How to Run

### Production-like mode

```bash
docker compose up --build
```

- Frontend: http://localhost:8080
- Backend API: http://localhost:3001/api/health
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
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose.yml

```yaml
services:
  frontend:
    build:
      context: ./client
    ports:
      - "8080:80"
    depends_on:
      - backend

  backend:
    build:
      context: ./server
    ports:
      - "3001:3001"
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://postgres:secret@db:5432/chat
      CORS_ORIGIN: http://localhost:8080
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: chat
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

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

Extend `docker-compose.yml` to include a Redis container for session storage or caching. Connect it to the backend via environment variables.

### 3. Production Build Optimization

Compare the image sizes of your frontend before and after multi-stage builds. Use `docker images` to check. How much space did the multi-stage build save?

---

**Corresponds to**: [Module 19: Containerization & Orchestration](https://dev.episkopos.community/docs/curriculum/part-5-infrastructure/containerization-and-orchestration)

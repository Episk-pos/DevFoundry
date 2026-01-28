---
sidebar_position: 8
title: Chat Docker Compose
description: Containerized chat app with Traefik, Caddy, and PostgreSQL
---

# Chat Docker Compose (Stage 6)

**Multi-container deployment with Docker Compose**

---

## Overview

This example takes the fullstack chat application and containerizes it with Docker. A Traefik reverse proxy routes requests to a Caddy-served React frontend and an Express backend, with PostgreSQL for persistence — all orchestrated by Docker Compose.

**Why this matters:**
- Understand containerization (Dockerfiles, images, containers)
- Learn multi-stage builds for production-optimized images
- See how reverse proxies route traffic between services
- Foundation for Kubernetes and production deployments

---

## What You'll Learn

- **Dockerfiles**: Writing production-ready containers for Node.js and React
- **Multi-Stage Builds**: Build stage (Node) → serve stage (Caddy) for tiny images
- **Docker Compose**: Defining multi-container applications declaratively
- **Traefik**: Label-based reverse proxy with path routing
- **Container Networking**: Service discovery via DNS names
- **Volume Persistence**: Surviving database restarts

---

## Prerequisites

- Completed [Chat Fullstack](/docs/examples/chat-fullstack)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed
- No other local dependencies — everything runs in containers

---

## Project Structure

```
19-chat-docker-compose/
├── client/
│   ├── Dockerfile              # Multi-stage: Node (build) → Caddy (serve)
│   ├── Caddyfile               # SPA routing config
│   └── src/                    # React application
├── server/
│   ├── Dockerfile              # Node.js production image
│   └── src/                    # Express API (PostgreSQL)
├── docker-compose.yml          # Traefik + services
├── docker-compose.override.yml # Dev overrides (live reload)
└── .env.example
```

---

## Quick Start

```bash
cd examples/19-chat-docker-compose

# Production-like mode (Traefik + Caddy + Node + Postgres)
docker compose -f docker-compose.yml up --build

# Development mode (with live reload)
docker compose up --build
```

- App: `http://localhost:8080`
- Traefik dashboard: `http://localhost:8081`

---

## Key Concepts

### 1. Multi-Stage Dockerfile

Build your React app, then serve static files with Caddy — no Node.js in the final image:

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
```

### 2. Traefik Reverse Proxy

Traefik reads Docker labels to route traffic — no config files needed:

```yaml
backend:
  labels:
    - "traefik.enable=true"
    - "traefik.http.routers.backend.rule=PathPrefix(`/api`)"
    - "traefik.http.routers.backend.priority=2"
```

### 3. Architecture

```
Browser → :8080 → Traefik
                    ├── /api/* → Backend (Express :3001)
                    │              └── PostgreSQL (:5432)
                    └── /*    → Frontend (Caddy :80)
```

---

## Curriculum Alignment

This example aligns with:
- **Module 19**: Containerization & Orchestration — Docker and Docker Compose

---

## Next Steps

Ready for Kubernetes? Continue to [Chat Kubernetes](/docs/examples/chat-kubernetes).

---

## Source Code

View the complete source: [`examples/19-chat-docker-compose/`](https://github.com/Episk-pos/DevFoundry/tree/main/examples/19-chat-docker-compose)

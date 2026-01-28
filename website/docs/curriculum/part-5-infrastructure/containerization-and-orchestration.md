---
sidebar_position: 1
title: "Module 19: Containerization & Orchestration"
description: "From 'works on my machine' to 'runs anywhere' — Docker, Kubernetes, and the infrastructure mental model for modern software"
---

# Module 19: Containerization & Orchestration

**From "works on my machine" to "runs anywhere" — Docker, Kubernetes, and the infrastructure mental model for modern software.**

---

## Learning Objectives

By the end of this module, you will:

- Understand why containers exist and what problems they solve
- Write Dockerfiles and build container images
- Run multi-container applications with Docker Compose
- Understand Kubernetes primitives and what role each plays
- Evaluate the K8s-first development stack (kind, Tilt, k3s)
- Articulate when containerization is the right choice

**Time**: 4-5 hours (reading + exercises)

---

## Introduction

In Part III, you deployed your chat app to managed platforms like Vercel and Railway. You pushed code, the platform built it, and gave you a URL. That works — until it doesn't.

What happens when:
- Your app needs a specific version of Node, plus a Redis cache, plus a PostgreSQL database?
- A new teammate joins and spends a full day getting the project running locally?
- Your staging environment behaves differently from production?
- You need to run 10 copies of your backend behind a load balancer?

These are **environment problems** — and containers solve them.

A container packages your application with everything it needs to run: code, runtime, libraries, system tools. If it runs in the container, it runs the same way everywhere — your laptop, your teammate's laptop, staging, production.

This module covers two layers:

1. **Docker** — How to build and run containers (the practical foundation)
2. **Kubernetes** — How to orchestrate containers at scale (the awareness layer)

We'll spend most of our time on Docker because it's the skill you'll use daily. Kubernetes gets enough coverage to build intuition — so when the topic comes up in your team, you can ask the right questions and follow the conversation.

---

## Architecture: Containers vs. Traditional Deployment

### Traditional Deployment (Stage 5)

```
Your Laptop                    Production Server
├── Node v20                   ├── Node v18 (different!)
├── npm packages               ├── npm packages (maybe different)
├── OS: macOS                  ├── OS: Ubuntu Linux
└── Your app code              └── Your app code
    └── "works here"               └── "crashes there"
```

### Container-Based Deployment

```
Your Laptop                    Production Server
├── Docker Engine              ├── Docker Engine (or K8s)
└── Container                  └── Container (identical image)
    ├── Node v20                   ├── Node v20
    ├── npm packages               ├── npm packages
    ├── Alpine Linux               ├── Alpine Linux
    └── Your app code              └── Your app code
        └── "works here"               └── "works here too"
```

**Key insight**: The container IS the environment. Ship the container, ship the guarantee.

---

## Part 1: The Problem Containers Solve

### "Works On My Machine"

Every developer has heard (or said) this. The root cause is always the same: **the environment is different**.

Differences that break things:
- Operating system (macOS vs. Linux vs. Windows)
- Language runtime version (Node 18 vs. 20)
- System libraries (OpenSSL 1.1 vs. 3.0)
- Environment variables (missing or different values)
- File paths and permissions
- Installed tools and their versions

### Before Containers: Virtual Machines

Virtual machines (VMs) solved this by running an entire operating system inside another operating system. You could ship a VM image and guarantee identical environments.

The problem: VMs are heavy. Each one runs a full OS kernel, needs gigabytes of RAM, and takes minutes to start.

```
VM Approach:
┌──────────────────────────────────┐
│  Host OS (your laptop)           │
│  ┌────────────────────────────┐  │
│  │  VM (full guest OS)        │  │
│  │  ┌──────────────────────┐  │  │
│  │  │  Your App             │  │  │
│  │  │  + Runtime            │  │  │
│  │  │  + Libraries          │  │  │
│  │  └──────────────────────┘  │  │
│  │  Full Linux Kernel         │  │
│  │  Full OS Utilities         │  │
│  │  ~1-2 GB overhead          │  │
│  └────────────────────────────┘  │
└──────────────────────────────────┘
```

### Containers: Lightweight Isolation

Containers share the host OS kernel but isolate everything above it. They package just your application and its dependencies — no redundant OS.

```
Container Approach:
┌──────────────────────────────────┐
│  Host OS + Container Runtime     │
│  ┌────────────┐  ┌────────────┐  │
│  │ Container A │  │ Container B │  │
│  │ Your App   │  │ Database   │  │
│  │ + Runtime  │  │ + Config   │  │
│  │ ~100 MB    │  │ ~200 MB    │  │
│  └────────────┘  └────────────┘  │
│  Shared OS Kernel                │
└──────────────────────────────────┘
```

**Result**: Start in seconds, use megabytes instead of gigabytes, run dozens on a single laptop.

### Containers Are Not VMs

This distinction matters:

| | Virtual Machine | Container |
|---|---|---|
| Isolation | Full OS | Process-level |
| Size | Gigabytes | Megabytes |
| Startup | Minutes | Seconds |
| Overhead | High (full kernel) | Minimal (shared kernel) |
| Use case | Different OS needs | Application packaging |

Containers use Linux kernel features (namespaces and cgroups) to isolate processes without the overhead of running a separate kernel. This is why Docker containers are Linux-native — on macOS and Windows, Docker runs a lightweight Linux VM under the hood to provide that kernel.

---

## Part 2: Docker Fundamentals

### Key Concepts

**Image**: A read-only template containing your application and everything it needs to run. Think of it as a snapshot — a frozen, portable environment.

**Container**: A running instance of an image. You can run multiple containers from the same image. Each gets its own isolated filesystem, network, and process space.

**Dockerfile**: A text file with instructions for building an image. It's the recipe.

**Registry**: A storage service for images. Docker Hub is the default public registry. Your team might use a private one (GitHub Container Registry, AWS ECR, etc.).

```
Dockerfile  →  docker build  →  Image  →  docker run  →  Container
(recipe)       (cook)           (dish)     (serve)        (running)
```

### Writing a Dockerfile

Here's a Dockerfile for the chat app's Express backend:

```dockerfile
# Start from a base image with Node.js installed
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first (for better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Tell Docker which port the app listens on
EXPOSE 3001

# The command to run when the container starts
CMD ["node", "src/index.js"]
```

Let's break down each instruction:

| Instruction | What it does |
|---|---|
| `FROM` | Base image to build on. `node:20-alpine` = Node.js 20 on Alpine Linux (tiny) |
| `WORKDIR` | Sets the working directory for subsequent instructions |
| `COPY` | Copies files from your machine into the image |
| `RUN` | Executes a command during the build (here: install dependencies) |
| `EXPOSE` | Documents which port the app uses (doesn't actually publish it) |
| `CMD` | The default command when a container starts from this image |

### Building an Image

```bash
docker build -t chat-backend:latest .
```

- `-t chat-backend:latest` — Tags the image with a name and version
- `.` — Build context (current directory, where the Dockerfile is)

### Running a Container

```bash
docker run -p 3001:3001 -e NODE_ENV=production chat-backend:latest
```

- `-p 3001:3001` — Map host port 3001 to container port 3001
- `-e NODE_ENV=production` — Set an environment variable
- `chat-backend:latest` — The image to run

Your app is now running inside a container, accessible at `localhost:3001`.

### Image Layers and Caching

Each Dockerfile instruction creates a **layer**. Docker caches layers and only rebuilds from the point where something changed. This is why we copy `package.json` before the application code:

```dockerfile
# These layers are cached if package.json hasn't changed
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Only this layer rebuilds when you change application code
COPY . .
```

If you only changed a source file, Docker reuses the cached `npm ci` layer — saving minutes on every build.

### The .dockerignore File

Like `.gitignore`, but for Docker builds. Keeps unnecessary files out of your image:

```
node_modules
.git
.env
*.md
.DS_Store
```

This matters because `COPY . .` copies everything in the build context. Without `.dockerignore`, you'd copy `node_modules` (then install them again), `.git` history, and other waste.

### Multi-Stage Builds

For the React frontend, you need to build static files but don't need the build tools in production:

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve
FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
EXPOSE 80
```

**Stage 1** installs all dependencies (including dev) and builds the app. **Stage 2** copies only the built files into a lightweight Caddy image. The final image is tiny — just Caddy and your static files, no Node.js, no source code, no `node_modules`.

Caddy needs a minimal config file (`Caddyfile`) for SPA routing:

```
:80 {
	root * /srv
	try_files {path} /index.html
	file_server
}
```

`try_files` ensures that client-side routes (like `/chat/room/1`) serve `index.html` instead of returning 404.

---

## Part 3: Docker Compose — Multi-Container Applications

Real applications aren't a single container. Your chat app needs at least a frontend and a backend. Add a database, a cache, a message queue — suddenly you're managing many containers that need to talk to each other.

### The Problem

Running containers individually:

```bash
# Create a network so containers can communicate
docker network create chat-app

# Start the database
docker run -d --name postgres --network chat-app \
  -e POSTGRES_PASSWORD=secret \
  postgres:16-alpine

# Start the backend
docker run -d --name backend --network chat-app \
  -e DATABASE_URL=postgresql://postgres:secret@postgres:5432/chat \
  -p 3001:3001 \
  chat-backend:latest

# Start the frontend
docker run -d --name frontend --network chat-app \
  -p 8080:80 \
  chat-frontend:latest
```

This is tedious, error-prone, and hard to reproduce. Docker Compose solves it.

### docker-compose.yml

```yaml
services:
  traefik:
    image: traefik:v3.2
    command:
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
    ports:
      - "8080:80"
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
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.backend.rule=PathPrefix(`/api`)"
      - "traefik.http.routers.backend.priority=2"
      - "traefik.http.services.backend.loadbalancer.server.port=3001"
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

Traefik acts as a reverse proxy, using Docker labels to discover services and route traffic. Requests to `/api/*` go to the backend (priority 2), everything else goes to the frontend (priority 1). The frontend uses `/api` as its API base URL — same origin, no CORS needed.

### Running the Full Stack

```bash
# Start everything
docker compose up

# Start in background
docker compose up -d

# View logs
docker compose logs -f backend

# Stop everything
docker compose down

# Stop and remove data volumes
docker compose down -v
```

One command. Every service starts, connects to the same network, and can find each other by service name (`backend` can reach `db` at hostname `db`).

### Key Compose Concepts

**Services**: Each entry under `services:` becomes a container. The name (`frontend`, `backend`, `db`) becomes the hostname on the internal network.

**build vs. image**: Use `build` to build from a local Dockerfile, `image` to pull a pre-built image from a registry.

**depends_on**: Controls startup order. `backend` waits for `db` to start (but not necessarily to be ready — that's an important distinction).

**volumes**: Persist data outside the container. Without `pgdata`, your database would lose all data when the container stops.

**ports**: Map `host:container` ports. `"5432:5432"` makes the database accessible from your host machine at `localhost:5432`.

**environment**: Set environment variables. For sensitive values, use a `.env` file:

```yaml
backend:
  env_file:
    - .env
```

### Compose for Development

Compose is particularly valuable for local development. You can override settings for dev:

```yaml
# docker-compose.override.yml (automatically loaded)
services:
  backend:
    volumes:
      - ./server/src:/app/src  # Mount source code for live changes
    environment:
      NODE_ENV: development
    command: ["npx", "nodemon", "src/index.js"]
```

Now changes to your source code are reflected immediately inside the container — no rebuild needed.

---

## Part 4: Volumes, Networks, and State

### Volumes: Persistent Data

Containers are **ephemeral** — when they stop, any data written inside them disappears. Volumes solve this.

```yaml
volumes:
  pgdata:  # Named volume — Docker manages the storage location

services:
  db:
    image: postgres:16-alpine
    volumes:
      - pgdata:/var/lib/postgresql/data  # Persist database files
```

Three types of mounts:

| Type | Syntax | Use Case |
|---|---|---|
| Named volume | `pgdata:/data` | Database storage, persistent data |
| Bind mount | `./src:/app/src` | Development (live code changes) |
| tmpfs | `tmpfs: /tmp` | Temporary data (never written to disk) |

### Networks: Container Communication

Docker Compose creates a default network for all services. Containers reach each other by service name:

```javascript
// Inside the backend container, "db" resolves to the database container
const pool = new Pool({
  connectionString: 'postgresql://postgres:secret@db:5432/chat'
  //                                                ^^ service name
});
```

You don't need to know IP addresses. Docker's internal DNS handles it.

### Managing State Across Restarts

```bash
# Data survives container restarts
docker compose down        # Containers removed, volumes kept
docker compose up -d       # New containers, same data

# Nuclear option — remove everything including data
docker compose down -v     # -v removes volumes too
```

---

## Part 5: Why Orchestration?

Docker Compose works well for development and simple deployments. But production systems have requirements that Compose alone can't meet.

### The Scaling Problem

```
docker compose up --scale backend=3
```

This starts 3 backend containers, but:
- How does traffic get distributed between them?
- What if one crashes? Who restarts it?
- How do you update without downtime?
- What if you need containers spread across multiple servers?

### What Orchestration Provides

An orchestrator manages containers across a cluster of machines. You declare what you want ("run 3 copies of my backend, always"), and the orchestrator makes it happen.

| Concern | Docker Compose | Orchestrator (K8s) |
|---|---|---|
| Scaling | Manual (`--scale`) | Automatic (CPU/memory rules) |
| Self-healing | None (container dies, stays dead) | Restarts automatically |
| Load balancing | Not built in | Built in |
| Rolling updates | Stop all, start all | Zero-downtime updates |
| Multi-server | Single host only | Cluster of machines |
| Service discovery | DNS by container name | DNS + advanced routing |

### Kubernetes: The Industry Standard

Kubernetes (often written K8s — K, 8 middle letters, s) is the dominant container orchestrator. Originally designed at Google, now open source and maintained by the Cloud Native Computing Foundation (CNCF).

You don't need to master Kubernetes right now. But as a developer working on containerized applications, you need to understand its vocabulary and mental model so you can:

- Read and modify deployment manifests
- Understand what your platform team is talking about
- Debug issues in staging and production environments
- Make informed architectural decisions

---

## Part 6: Kubernetes Primitives

Kubernetes has a lot of concepts, but the core ones you'll encounter daily are fewer than you think. Each solves a specific problem.

### The Mental Model

Kubernetes works on **declarative state**: you describe what you want, and Kubernetes continuously works to make reality match your description. If a container crashes, Kubernetes notices the mismatch and creates a new one.

```
You declare:        "I want 3 copies of my backend running"
Kubernetes sees:    2 running (one crashed)
Kubernetes acts:    Starts a new one
Result:             3 running again
```

### Pod

The smallest deployable unit. A Pod wraps one or more containers that share storage and network. In practice, most Pods contain a single container.

```yaml
# You rarely write Pod manifests directly — Deployments manage them
apiVersion: v1
kind: Pod
metadata:
  name: chat-backend
spec:
  containers:
    - name: backend
      image: chat-backend:latest
      ports:
        - containerPort: 3001
```

**Why it matters**: When someone says "the pod is crashing," they mean your container is failing to start or run. `kubectl logs <pod-name>` is how you see what went wrong.

### Deployment

Manages a set of identical Pods. Handles scaling, updates, and self-healing.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: chat-backend
spec:
  replicas: 3          # Run 3 copies
  selector:
    matchLabels:
      app: chat-backend
  template:             # Pod template
    metadata:
      labels:
        app: chat-backend
    spec:
      containers:
        - name: backend
          image: chat-backend:latest
          ports:
            - containerPort: 3001
          envFrom:
            - configMapRef:
                name: backend-config
```

**Key behavior**: If you update the image tag and apply the manifest, Kubernetes performs a **rolling update** — starting new Pods before stopping old ones, ensuring zero downtime.

### StatefulSet

Like a Deployment, but for workloads that need stable identity and persistent storage — primarily databases.

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: postgres
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: postgres:16-alpine
          volumeMounts:
            - name: pgdata
              mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
    - metadata:
        name: pgdata
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 1Gi
```

**Deployment vs. StatefulSet**: Use Deployments for stateless services (your API, frontend). Use StatefulSets for stateful workloads (databases, caches) that need stable network identities and persistent volumes.

### Service

Provides a stable network endpoint for a set of Pods. Since Pods are ephemeral (they come and go), you need something permanent to point to.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: chat-backend
spec:
  selector:
    app: chat-backend   # Routes to all Pods with this label
  ports:
    - port: 80          # Service port
      targetPort: 3001  # Container port
  type: ClusterIP       # Internal only (default)
```

Other Pods in the cluster can now reach the backend at `http://chat-backend:80`. The Service load-balances across all matching Pods automatically.

**Service types**:
- `ClusterIP` — Internal only (default, most common)
- `NodePort` — Exposes on each node's IP at a static port
- `LoadBalancer` — Provisions an external load balancer (cloud providers)

### Ingress

Routes external HTTP traffic to internal Services. This is how the outside world reaches your app.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: chat-ingress
spec:
  rules:
    - host: chat.example.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: chat-backend
                port:
                  number: 80
          - path: /
            pathType: Prefix
            backend:
              service:
                name: chat-frontend
                port:
                  number: 80
```

**How it works**: An Ingress Controller (like Traefik, which is built into k3s) reads these rules and configures routing. `chat.example.com/api/*` goes to your backend Service, everything else goes to your frontend Service.

### ConfigMap

Stores non-sensitive configuration as key-value pairs, decoupled from your container image.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: backend-config
data:
  NODE_ENV: "production"
  CORS_ORIGIN: "https://chat.example.com"
  LOG_LEVEL: "info"
```

Referenced by Pods via `envFrom` (load all keys as env vars) or `env` (load specific keys). Change the ConfigMap and restart the Pod — no image rebuild needed.

For **sensitive** values (passwords, API keys), use a `Secret` instead of a ConfigMap. Secrets are base64-encoded and can be encrypted at rest.

### Kustomize

A tool (built into `kubectl`) for managing Kubernetes manifests across environments without templating. Instead of one massive YAML file with `if/else` logic, you write a clean base and overlay environment-specific changes.

```
k8s/
├── base/
│   ├── kustomization.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   └── configmap.yaml
└── overlays/
    ├── development/
    │   └── kustomization.yaml   # Overrides for dev
    ├── staging/
    │   └── kustomization.yaml   # Overrides for staging
    └── production/
        └── kustomization.yaml   # Overrides for prod
```

Base `kustomization.yaml`:
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - deployment.yaml
  - service.yaml
  - configmap.yaml
```

Production overlay `kustomization.yaml`:
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - ../../base
patches:
  - patch: |-
      apiVersion: apps/v1
      kind: Deployment
      metadata:
        name: chat-backend
      spec:
        replicas: 3
```

Apply to a specific environment:
```bash
kubectl apply -k k8s/overlays/production
```

**Why Kustomize over Helm?** Helm uses templates (Go templating in YAML — hard to read, hard to debug). Kustomize uses plain YAML with strategic merge patches. For most applications, Kustomize is simpler and sufficient. Helm is better suited for packaging software you distribute to others.

### Putting It All Together

Here's how the primitives compose for the chat app:

```
Internet
  │
  ▼
Ingress (routes /api → backend, / → frontend)
  │
  ├─▶ Service: chat-frontend
  │     └─▶ Deployment (2 replicas)
  │           ├─▶ Pod: frontend-abc12
  │           └─▶ Pod: frontend-def34
  │
  ├─▶ Service: chat-backend
  │     └─▶ Deployment (3 replicas)
  │           ├─▶ Pod: backend-ghi56
  │           ├─▶ Pod: backend-jkl78
  │           └─▶ Pod: backend-mno90
  │
  └─▶ Service: postgres
        └─▶ StatefulSet (1 replica)
              └─▶ Pod: postgres-0
                    └─▶ PersistentVolume (1Gi)

ConfigMaps: backend-config, frontend-config
Secrets: db-credentials
```

---

## Part 7: The K8s-First Development Stack

Here's an opinionated take: for web-based software products, start with Kubernetes from day one. Not because you need the scale, but because the development workflow is better than you'd expect — and the production story is dramatically simpler when you get there.

### The Stack

| Tool | Role | Where |
|---|---|---|
| **kind** | Runs a K8s cluster inside Docker containers | Local development |
| **Tilt** | Watches your code, rebuilds and deploys to the cluster automatically | Local development |
| **k3s** | Lightweight, certified Kubernetes distribution | Production |
| **Kustomize** | Manages environment-specific configuration | Everywhere |

### kind: Kubernetes in Docker

[kind](https://kind.sigs.k8s.io/) runs a full Kubernetes cluster inside Docker containers. It's designed for testing Kubernetes itself, but it's an excellent local development tool.

```bash
# Create a cluster
kind create cluster --name chat-dev

# Your kubectl now points to the local cluster
kubectl cluster-info

# Delete when done
kind delete cluster --name chat-dev
```

**Why kind over minikube?** kind is faster to start, uses fewer resources, and creates clusters identically to CI environments. It runs inside Docker, which you already have installed.

### Tilt: The Developer Experience Layer

[Tilt](https://tilt.dev/) is the tool that makes K8s development feel like local development. Without Tilt, deploying to a local K8s cluster means manually rebuilding images and reapplying manifests on every code change. Tilt automates all of it.

You define a `Tiltfile` (written in Starlark, a Python-like language):

```python
# Tiltfile

# Build the backend image and deploy to K8s
docker_build('chat-backend', './server')
k8s_yaml('k8s/base/backend-deployment.yaml')

# Build the frontend image and deploy to K8s
docker_build('chat-frontend', './client')
k8s_yaml('k8s/base/frontend-deployment.yaml')

# Database — use the image directly, no build needed
k8s_yaml('k8s/base/postgres-statefulset.yaml')

# Services and ingress
k8s_yaml('k8s/base/services.yaml')
k8s_yaml('k8s/base/ingress.yaml')

# Port forwards for local access
k8s_resource('chat-backend', port_forwards='3001:3001')
k8s_resource('chat-frontend', port_forwards='8080:80')
```

Run `tilt up` and Tilt:
1. Builds your Docker images
2. Deploys everything to your kind cluster
3. Watches your source code for changes
4. Rebuilds and redeploys automatically on save
5. Streams logs from all containers
6. Provides a web dashboard showing the status of all services

**This is the key insight**: with Tilt, the development experience is comparable to `docker compose up` with live reload — but you're running real Kubernetes. Same manifests, same networking model, same configuration. The gap between dev and prod shrinks to nearly zero.

### k3s: Production Kubernetes Without the Complexity

[k3s](https://k3s.io/) is a lightweight Kubernetes distribution built for production. It's fully certified K8s packaged as a single binary under 100MB.

What makes k3s practical for smaller teams:
- **Single binary install**: `curl -sfL https://get.k3s.io | sh -`
- **Batteries included**: Built-in ingress controller (Traefik), load balancer, and storage
- **Low resource usage**: Runs on machines with 512MB RAM
- **Same API**: Anything that works on "full" Kubernetes works on k3s

k3s runs in production for thousands of organizations, from edge deployments to multi-node clusters. It's not a toy — it's Kubernetes without the operational overhead of managing etcd clusters and control plane components separately.

### The Argument for K8s-First

**"Isn't Kubernetes overkill for a small project?"**

The traditional thinking is: start simple (Heroku/Railway), outgrow it, then migrate to Kubernetes. This migration is expensive — you're rewriting deployment infrastructure at the same time your app is growing and your team is busy.

The K8s-first alternative:

1. **Local-production parity from day one.** Your `docker compose up` becomes `tilt up`. Same containers, same networking. But now your manifests *are* your production configuration.

2. **No migration tax.** You never have to rewrite deployment. The same K8s manifests that run on kind locally run on k3s in production. Add Kustomize overlays for environment differences.

3. **Tilt makes it developer-friendly.** The "Kubernetes is too complicated for development" argument assumed you were running `kubectl apply` manually. Tilt eliminates that friction.

4. **k3s makes it operations-friendly.** You don't need a dedicated platform team to run k3s. A single $10/month VPS can run your entire stack.

5. **Scales without architecture changes.** When you need 3 replicas instead of 1, change a number in a YAML file. When you need a second node, join it to the cluster. No re-platforming.

**When this approach is NOT the right call:**
- **Static sites and JAMstack** — Vercel/Netlify are purpose-built and better
- **Serverless workloads** — Functions that run infrequently don't need always-on containers
- **You're the only developer and want maximum simplicity** — Railway/Render have lower initial learning investment
- **Your team has zero container experience** — Get comfortable with Docker first, then consider K8s

The goal isn't dogma. It's recognizing that for **web applications with a backend, database, and foreseeable scaling needs**, the K8s-first stack (kind + Tilt + k3s + Kustomize) offers a better long-term trajectory than starting on a managed platform and migrating later.

---

## Exercise 1: Containerize the Chat App Backend

Write a Dockerfile for the chat app's Express backend.

**Requirements:**
1. Use `node:20-alpine` as the base image
2. Set the working directory to `/app`
3. Copy and install dependencies first (layer caching)
4. Copy application code
5. Expose port 3001
6. Set the default command

**Test it:**
```bash
docker build -t chat-backend:latest ./server
docker run -p 3001:3001 -e NODE_ENV=production chat-backend:latest
curl http://localhost:3001/api/health
```

<details>
<summary>Solution</summary>

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["node", "src/index.js"]
```

And `.dockerignore`:
```
node_modules
.git
.env
*.md
.DS_Store
```

</details>

---

## Exercise 2: Multi-Stage Frontend Build

Write a multi-stage Dockerfile for the React frontend.

**Requirements:**
1. Stage 1 (`build`): Install dependencies and run `npm run build`
2. Stage 2: Copy built files into a `caddy:2-alpine` image with a `Caddyfile` for SPA routing
3. The final image should contain only Caddy and the static files

**Test it:**
```bash
docker build -t chat-frontend:latest ./client
docker run -p 8080:80 chat-frontend:latest
# Visit http://localhost:8080
```

<details>
<summary>Solution</summary>

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve
FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
EXPOSE 80
```

And `Caddyfile`:
```
:80 {
	root * /srv
	try_files {path} /index.html
	file_server
}
```

</details>

---

## Exercise 3: Docker Compose

Write a `docker-compose.yml` that runs the frontend, backend, and a PostgreSQL database together.

**Requirements:**
1. Frontend served on port 8080
2. Backend on port 3001 with environment variables for the database
3. PostgreSQL with a named volume for persistence
4. Backend depends on the database; frontend depends on the backend

**Test it:**
```bash
docker compose up
# Frontend at http://localhost:8080
# Backend at http://localhost:3001/api/health
# Database at localhost:5432
```

<details>
<summary>Solution</summary>

See the [19-chat-docker-compose example](/docs/examples/chat-docker-compose) for the complete working setup.

</details>

---

## Exercise 4: Read a Kubernetes Manifest

Given this manifest, answer the questions below:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
spec:
  replicas: 2
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: myapp/api:v1.2.3
          ports:
            - containerPort: 8080
          envFrom:
            - configMapRef:
                name: api-config
---
apiVersion: v1
kind: Service
metadata:
  name: api-server
spec:
  selector:
    app: api
  ports:
    - port: 80
      targetPort: 8080
```

**Questions:**
1. How many copies of the API will be running?
2. What Docker image is being used?
3. How would another Pod in the cluster reach this service?
4. If a Pod crashes, what happens?
5. Where does the Pod get its environment variables?

<details>
<summary>Answers</summary>

1. **2 replicas** — specified by `replicas: 2`
2. **myapp/api:v1.2.3** — specified in the container spec
3. **http://api-server:80** — the Service name becomes a DNS entry, port 80 maps to container port 8080
4. **Kubernetes creates a replacement** — the Deployment controller notices the actual state (1 Pod) doesn't match desired state (2 Pods) and creates a new one
5. **From the ConfigMap named `api-config`** — `envFrom` with `configMapRef` loads all keys from the ConfigMap as environment variables

</details>

---

## Exercise 5: Design a Kustomize Overlay

Your chat app runs in development (1 replica, debug logging) and production (3 replicas, info logging). Using the Kustomize structure from Part 6, write the production overlay that changes the replica count.

<details>
<summary>Solution</summary>

`k8s/overlays/production/kustomization.yaml`:
```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - ../../base
patches:
  - patch: |-
      apiVersion: apps/v1
      kind: Deployment
      metadata:
        name: chat-backend
      spec:
        replicas: 3
  - patch: |-
      apiVersion: v1
      kind: ConfigMap
      metadata:
        name: backend-config
      data:
        LOG_LEVEL: "info"
```

Apply with: `kubectl apply -k k8s/overlays/production`

</details>

---

## Common Issues

### "Cannot connect to the Docker daemon"

```
Cannot connect to the Docker daemon at unix:///var/run/docker.sock
```

**Fix**: Docker Desktop (or Docker Engine) isn't running. Start it, then try again.

### Port Already in Use

```
Error: port is already allocated
```

**Fix**: Another process (or container) is using that port. Stop it, or map to a different host port: `-p 3002:3001`.

### Image Build Fails at npm ci

```
npm ERR! could not determine executable to run
```

**Fix**: Make sure `package-lock.json` is included in the `COPY` and isn't in `.dockerignore`.

### Container Starts Then Immediately Exits

**Fix**: Check logs with `docker logs <container-id>`. Common causes:
- Missing environment variables
- Database not reachable (if using `depends_on`, the database may not be *ready* yet — just started)
- Application crash on startup

### "Connection Refused" Between Containers

**Fix**: Use the **service name** (not `localhost`) as the hostname. Inside a Docker network, containers reach each other by name. `localhost` inside a container means that container itself.

---

## Key Takeaways

1. **Containers solve environment problems** — Package your app with its dependencies, and it runs the same everywhere.

2. **Images are recipes, containers are instances** — Build once, run many times. Each container is isolated.

3. **Layer caching is your friend** — Copy dependency files before source code. Structure your Dockerfile for fast rebuilds.

4. **Docker Compose is essential for local development** — One `docker compose up` replaces a page of setup instructions.

5. **Kubernetes manages containers at scale** — Declarative state, self-healing, rolling updates, service discovery. You describe what you want; K8s makes it happen.

6. **You don't need to master K8s to benefit from it** — Learn the primitives (Pod, Deployment, Service, Ingress, ConfigMap, Kustomize). Understand the vocabulary. Ask good questions.

7. **The K8s-first stack is worth evaluating** — kind + Tilt (dev) and k3s (prod) with Kustomize (config) offers local-prod parity without the traditional Kubernetes complexity tax.

---

## What's Next

This module gave you the foundation for containerized development and an awareness of Kubernetes. From here:

- **Practice**: Work through the [Docker Compose example](/docs/examples/chat-docker-compose) and the [Kubernetes example](/docs/examples/chat-kubernetes) to get hands-on experience
- **Go deeper on Docker**: Learn about health checks, resource limits, and security scanning
- **Explore K8s further**: Set up a kind cluster and deploy the chat app with Tilt
- **Module 20 (planned)**: Observability & Reliability — monitoring what your containers are doing in production
- **Module 21 (planned)**: Infrastructure as Code — managing the infrastructure itself declaratively

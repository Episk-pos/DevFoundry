---
sidebar_position: 9
title: Chat Kubernetes
description: Kubernetes deployment with kind, Tilt, and Traefik ingress
---

# Chat Kubernetes (Stage 7)

**Local Kubernetes deployment with kind and Tilt**

---

## Overview

This example deploys the same containerized chat application to a local Kubernetes cluster. You'll write Deployments, Services, and Ingress manifests — the same resources that run in production on k3s or any managed Kubernetes provider.

**Why this matters:**
- Understand Kubernetes primitives (Pods, Deployments, Services, Ingress)
- Learn the kind + Tilt development workflow
- See how Kustomize manages environment differences
- Same manifests work locally and in production

---

## What You'll Learn

- **Kubernetes Manifests**: Deployments, Services, ConfigMaps, Ingress
- **kind**: Local Kubernetes clusters inside Docker
- **Tilt**: Automated build-deploy-reload for K8s development
- **Kustomize**: Environment overlays without templating
- **Traefik Ingress**: Path-based routing in Kubernetes

---

## Prerequisites

- Completed [Chat Docker Compose](/docs/examples/chat-docker-compose)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed
- [kind](https://kind.sigs.k8s.io/docs/user/quick-start/#installation), [kubectl](https://kubernetes.io/docs/tasks/tools/), [Tilt](https://docs.tilt.dev/install.html), and [Helm](https://helm.sh/docs/intro/install/) installed

---

## Project Structure

```
20-chat-kubernetes/
├── client/                     # Same as Docker Compose example
├── server/                     # Same as Docker Compose example
├── k8s/
│   ├── base/
│   │   ├── kustomization.yaml
│   │   ├── backend-deployment.yaml
│   │   ├── frontend-deployment.yaml
│   │   ├── postgres-statefulset.yaml
│   │   ├── services.yaml
│   │   ├── configmap.yaml
│   │   └── ingress.yaml        # ingressClassName: traefik
│   └── overlays/
│       ├── development/        # Debug logging
│       └── production/         # 3 replicas, warn logging
├── Tiltfile                    # Build + deploy + watch
├── kind-config.yaml            # Cluster with port mappings
└── traefik-values.yaml         # Helm values for ingress
```

---

## Quick Start

```bash
cd examples/20-chat-kubernetes

# 1. Create cluster
kind create cluster --name chat-dev --config kind-config.yaml

# 2. Install Traefik ingress controller
helm repo add traefik https://traefik.github.io/charts
helm repo update
helm install traefik traefik/traefik -f traefik-values.yaml

# 3. Start Tilt (builds, deploys, watches for changes)
tilt up
```

- Tilt dashboard: `http://localhost:10350`
- Frontend: `http://localhost:8080`
- Backend API: `http://localhost:3001/api/health`

---

## Key Concepts

### 1. Declarative State

You describe what you want; Kubernetes makes it happen:

```yaml
spec:
  replicas: 3    # "I want 3 copies"
```

If a Pod crashes, Kubernetes creates a replacement automatically.

### 2. Kustomize Overlays

Same base manifests, different settings per environment:

```yaml
# k8s/overlays/production/kustomization.yaml
patches:
  - patch: |-
      apiVersion: apps/v1
      kind: Deployment
      metadata:
        name: chat-backend
      spec:
        replicas: 3
```

### 3. Ingress Routing

Traefik routes external traffic to internal Services:

```yaml
spec:
  ingressClassName: traefik
  rules:
    - http:
        paths:
          - path: /api    → chat-backend
          - path: /       → chat-frontend
```

---

## Curriculum Alignment

This example aligns with:
- **Module 19**: Containerization & Orchestration — Kubernetes fundamentals

---

## Source Code

View the complete source: [`examples/20-chat-kubernetes/`](https://github.com/devfoundry/devfoundry/tree/main/examples/20-chat-kubernetes)

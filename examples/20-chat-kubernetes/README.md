# Chat Kubernetes (Module 19)

The chat application deployed to a local Kubernetes cluster using kind and Tilt — the same manifests that would run in production on k3s.

## What You'll Learn

- **Kubernetes Manifests**: Writing Deployments, Services, ConfigMaps, and Ingress rules
- **kind**: Running a local Kubernetes cluster inside Docker
- **Tilt**: Automated build-deploy-reload workflow for Kubernetes development
- **Kustomize**: Managing environment-specific configuration with overlays
- **K8s Debugging**: Using `kubectl` to inspect pods, logs, and services

## Structure

```
20-chat-kubernetes/
├── client/
│   ├── Dockerfile
│   └── src/
├── server/
│   ├── Dockerfile
│   └── src/
├── k8s/
│   ├── base/
│   │   ├── kustomization.yaml
│   │   ├── backend-deployment.yaml
│   │   ├── frontend-deployment.yaml
│   │   ├── postgres-statefulset.yaml
│   │   ├── services.yaml
│   │   ├── configmap.yaml
│   │   └── ingress.yaml
│   └── overlays/
│       ├── development/
│       │   └── kustomization.yaml
│       └── production/
│           └── kustomization.yaml
├── Tiltfile
└── kind-config.yaml
```

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [kind](https://kind.sigs.k8s.io/docs/user/quick-start/#installation) installed
- [kubectl](https://kubernetes.io/docs/tasks/tools/) installed
- [Tilt](https://docs.tilt.dev/install.html) installed

## How to Run

### 1. Create a kind cluster

```bash
kind create cluster --name chat-dev --config kind-config.yaml
```

### 2. Start Tilt

```bash
tilt up
```

Tilt will:
- Build Docker images for the frontend and backend
- Deploy all Kubernetes resources (pods, services, configmaps)
- Set up port forwards so you can access the app locally
- Watch for code changes and automatically rebuild/redeploy

### 3. Access the app

- **Tilt dashboard**: http://localhost:10350
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3001/api/health

### 4. Clean up

```bash
tilt down
kind delete cluster --name chat-dev
```

## Key Files

### Tiltfile

```python
# Build images
docker_build('chat-backend', './server')
docker_build('chat-frontend', './client')

# Apply K8s manifests
k8s_yaml(kustomize('k8s/overlays/development'))

# Port forwards for local access
k8s_resource('chat-backend', port_forwards='3001:3001')
k8s_resource('chat-frontend', port_forwards='8080:80')
k8s_resource('postgres', port_forwards='5432:5432')
```

### k8s/base/backend-deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: chat-backend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: chat-backend
  template:
    metadata:
      labels:
        app: chat-backend
    spec:
      containers:
        - name: backend
          image: chat-backend
          ports:
            - containerPort: 3001
          envFrom:
            - configMapRef:
                name: backend-config
```

### k8s/base/services.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: chat-backend
spec:
  selector:
    app: chat-backend
  ports:
    - port: 80
      targetPort: 3001
---
apiVersion: v1
kind: Service
metadata:
  name: chat-frontend
spec:
  selector:
    app: chat-frontend
  ports:
    - port: 80
      targetPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: postgres
spec:
  selector:
    app: postgres
  ports:
    - port: 5432
      targetPort: 5432
```

## Useful kubectl Commands

```bash
# See all running pods
kubectl get pods

# See all services
kubectl get services

# View logs for a pod
kubectl logs -f deployment/chat-backend

# Describe a pod (useful for debugging startup failures)
kubectl describe pod <pod-name>

# Open a shell inside a pod
kubectl exec -it deployment/chat-backend -- sh

# Apply manifests manually (without Tilt)
kubectl apply -k k8s/overlays/development

# Delete all resources
kubectl delete -k k8s/overlays/development
```

## Exercises

### 1. Scale the Backend

Edit `k8s/overlays/development/kustomization.yaml` to run 2 replicas of the backend. Watch Tilt create the second pod. Verify with `kubectl get pods`.

### 2. Update a ConfigMap

Change a value in `k8s/base/configmap.yaml` and apply it. What happens to the running pods? (Hint: ConfigMap changes don't automatically restart pods — you need to trigger a rollout.)

### 3. Production Overlay

Create a production overlay that sets 3 backend replicas and changes `LOG_LEVEL` to `"warn"`. Apply it with `kubectl apply -k k8s/overlays/production`.

### 4. Inspect the Network

From inside the backend pod (`kubectl exec`), try to reach the postgres service by name: `wget -qO- postgres:5432`. Then try `wget -qO- chat-frontend:80`. Observe how Kubernetes DNS resolves service names.

---

**Corresponds to**: [Module 19: Containerization & Orchestration](https://dev.episkopos.community/docs/curriculum/part-5-infrastructure/containerization-and-orchestration)

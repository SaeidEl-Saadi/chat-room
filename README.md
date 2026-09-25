# Real-Time Chat Room

A real-time web chat application built with Node.js, Express, and Socket.IO. The application is containerized with Docker and designed to run across multiple instances using Redis for Socket.IO communication.

The project also includes Kubernetes deployment configuration, Terraform infrastructure as code, and a GitHub Actions CI pipeline.

## Tech Stack

- Node.js
- Express
- Socket.IO
- Redis
- Docker
- Docker Compose
- Nginx
- Kubernetes
- Terraform
- GitHub Actions
- GitHub Container Registry (GHCR)
- Argo CD

## Architecture

The application can run multiple chat server instances. Redis acts as the Socket.IO adapter, allowing messages to be broadcast between clients connected to different application instances.

```text
                    Client
                      |
                      v
                Chat Service
                      |
             +--------+--------+
             |        |        |
             v        v        v
          Chat 1   Chat 2   Chat 3
             |        |        |
             +--------+--------+
                      |
                      v
                Redis Service
                      |
                      v
                    Redis
```

Kubernetes manages the application instances and Redis deployment, while Terraform provides the infrastructure configuration.

## Running with Docker Compose

Build and start the application:

```bash
docker compose up --build
```

The application is available at:

```text
http://localhost
```

Stop the containers with:

```bash
docker compose down
```

## Running with Kubernetes

The Kubernetes configuration is located in the `kubernetes/` directory.

Apply the resources:

```bash
kubectl apply -f kubernetes/
```

Check the application:

```bash
kubectl get pods
kubectl get services
```

Forward the chat service to your local machine:

```bash
kubectl port-forward service/chat-service 3000:3000
```

Then open:

```text
http://localhost:3000
```

> [!NOTE]
> When using the Argo CD deployment, Kubernetes manifests are managed through  Git rather than manually applying changes with `kubectl`.

## Terraform

Terraform configuration is located in the `terraform/` directory.

Initialize Terraform:

```bash
terraform init
```

Preview infrastructure changes:

```bash
terraform plan
```

Apply the configuration:

```bash
terraform apply
```

The Terraform configuration manages a dedicated Kubernetes namespace containing the chat and Redis infrastructure.

## CI/CD

GitHub Actions runs automatically on pushes and pull requests.

The CI pipeline:

- Builds the Docker image
- Validates the Docker Compose configuration
- Checks Terraform formatting
- Initializes and validates the Terraform configuration
- Tags container images using the Git commit SHA
- Pushes container images to GitHub Container Registry (GHCR)

For deployments, GitHub Actions updates the Kubernetes manifest with the new SHA-versioned image. Argo CD detects the change and automatically synchronizes the desired state with the Kubernetes cluster.

This provides a GitOps-based continuous deployment workflow:

```text
Git Push
   ↓
GitHub Actions
   ↓
Build & Validate
   ↓
Push SHA-tagged image to GHCR
   ↓
Update Kubernetes manifest
   ↓
Argo CD
   ↓
Kubernetes Rolling Deployment
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

Check the running pods:

```bash
kubectl get pods
```

Forward the chat service to your local machine:

```bash
kubectl port-forward service/chat-service 3000:3000
```

Then open:

```text
http://localhost:3000
```

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

## CI

GitHub Actions runs automatically on pushes and pull requests.

The CI pipeline:

- Builds the Docker image
- Validates the Docker Compose configuration
- Checks Terraform formatting
- Initializes Terraform
- Validates the Terraform configuration


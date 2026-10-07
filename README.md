# Spring Angular DevOps Platform

A small full-stack application designed to become a DevOps portfolio project.

## Stack

- Java 21
- Spring Boot
- Angular
- PostgreSQL
- Docker / Docker Compose
- GitHub Actions

## Current DevOps features

- Multi-stage Docker builds for backend and frontend
- PostgreSQL health check
- Spring Boot Actuator health/readiness/liveness endpoints
- GitHub Actions CI for Maven, Angular and Docker image builds
- Nginx reverse proxy from `/api` to Spring Boot

## Run everything with Docker

```bash
docker compose up --build
```

Open:

- App: http://localhost:8088
- Health through Nginx: http://localhost:8088/actuator/health

Stop:

```bash
docker compose down
```

Delete the database volume too:

```bash
docker compose down -v
```

## API

- `GET /api/tasks`
- `GET /api/tasks/{id}`
- `POST /api/tasks`
- `PUT /api/tasks/{id}`
- `DELETE /api/tasks/{id}`

Example POST body:

```json
{
  "title": "Build the CI pipeline",
  "completed": false
}
```

## Roadmap

1. Push images to GHCR
2. Add Trivy scanning
3. Add Terraform
4. Deploy to k3s
5. Add Helm
6. Add Argo CD GitOps
7. Add Prometheus + Grafana
8. Add staging / production promotion

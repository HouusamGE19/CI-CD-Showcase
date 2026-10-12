# Monitoring

This directory contains the lightweight Prometheus and Grafana manifests used by the project.

## Components

- **Prometheus** scrapes the Spring Boot backend every 15 seconds from:
  `http://backend.devops-app.svc.cluster.local:8080/actuator/prometheus`
- **Grafana** uses Prometheus as its default data source.
- Both workloads use persistent volume claims and conservative CPU/memory limits for the single-node EC2/k3s lab environment.

## Prerequisites

Create the namespace:

```bash
sudo kubectl create namespace monitoring
```

Create the Grafana admin secret before applying `grafana.yaml`:

```bash
GRAFANA_PASSWORD=$(openssl rand -base64 24)

sudo kubectl -n monitoring create secret generic grafana-admin   --from-literal=admin-user=admin   --from-literal=admin-password="$GRAFANA_PASSWORD"

unset GRAFANA_PASSWORD
```

The password is intentionally **not committed to Git**.

## Deploy

```bash
sudo kubectl apply -f monitoring/prometheus.yaml
sudo kubectl apply -f monitoring/grafana.yaml
```

Check the pods:

```bash
sudo kubectl get pods -n monitoring
```

## Private access

Prometheus:

```bash
sudo kubectl port-forward svc/prometheus -n monitoring 9090:9090
```

Grafana:

```bash
sudo kubectl port-forward svc/grafana -n monitoring 3000:3000
```

The dashboards are kept private and are accessed through an SSH tunnel from the developer machine rather than exposing them directly to the internet.

# Grafana Loki Installation

Logging solution to persist kubenernetes pod logs irrespective of pod lifecycle

Install Grafana Loki with default values and promtail using helm chart and promtail-values.yaml


```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update
helm upgrade --install loki grafana/loki-distributed -n monitoring


helm upgrade --install --values promtail-values.yaml promtail grafana/promtail -n monitoring

```

To apply changes with updated values.yaml

```bash

helm upgrade --install --values promtail-values.yaml promtail grafana/promtail -n monitoring

```

Access dashboard using 

    1. login to https://grafana.dev.curieo.org/dashboard/
    2. select `Loki Kubernetes Logs`




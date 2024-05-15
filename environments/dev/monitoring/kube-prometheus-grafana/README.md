# Prometheus Grafana and Alertmanager Installation

Install kube-prometheus-stack using helm chart and values.yaml

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm upgrade --install kube-prometheus-stack prometheus-community/kube-prometheus-stack -n monitoring --create-namespace --values values.yaml

```

To apply changes with updated values.yaml

```bash
helm upgrade --install kube-prometheus-stack prometheus-community/kube-prometheus-stack -n monitoring --values values.yaml

```

Access dashboard using 

https://grafana.dev.curieo.org/dashboard


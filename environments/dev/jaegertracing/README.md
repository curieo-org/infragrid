# Jaeger Installation Tracing request and response latency and payload

Install Jaeger using helm chart and values.yaml

```bash
helm repo add jaegertracing https://jaegertracing.github.io/helm-charts
helm dependency update
helm install jaeger jaegertracing/jaeger -n jaegertracing --create-namespace --values values.yaml

```

To apply changes with updated values.yaml

```bash
helm dependency update
helm upgrade --install jaeger jaegertracing/jaeger -n jaegertracing --values values.yaml
```


## Admin
Access admin dashboard using 

https://jaegertracing-admin.dev.curieo.ai/


## Agent 

agent endpoint can be accessible within cluster with

- (zipkin-compact) jaegertracing-agent.jaegertracing.svc.cluster.local:5775
- (http) jaegertracing-agent.jaegertracing.svc.cluster.local:5778


## Collector

jaeger collector endpoint can be accessible within cluster with

- (oltp-grpc) jaegertracing-collector.jaegertracing.svc.cluster.local:4317
- (oltp-http) jaegertracing-collector.jaegertracing.svc.cluster.local:4318
- (grpc) jaegertracing-collector.jaegertracing.svc.cluster.local:14250
- (http) jaegertracing-collector.jaegertracing.svc.cluster.local:14268


Refer default/additional values for helm chart in 

https://www.jaegertracing.io/docs/next-release/getting-started/
https://github.com/jaegertracing/helm-charts/blob/main/charts/jaeger/values.yaml


For storage , we are using cassandraDB and persistent volume in gp3 storageclass

For enabling ingress , istio gateway and istio virtualservices are deployed and created route53 entry for `jaegertracing-admin.dev.curieo.ai` pointing to access jaeger admin


### Troubleshooting :

Jaeger is combined of multiple components in kubernetes , 

```bash
kubectl describe all -n jaegertracing

```

### Note:
As per Jaeger documentation, for large scale production deployment the Jaeger team recommends Elasticsearch backend over Cassandra.
# Redis Cache Installation 

Install Redis using helm chart and values.yaml

```bash
cd helm 
helm dependency build
helm install redis . -n redis --create-namespace --values values.yaml

```

To apply changes with updated values.yaml

```bash
helm dependency update
helm upgrade --install redis . -n redis --values values.yaml
```


## URL
Access redis cache url using 

https://redis.dev.curieo.ai/

- (headless) redis-headless.redis.svc.cluster.local:6379
- (replicas) redis-replicas.redis.svc.cluster.local:6379


Refer default/additional values for helm chart in 

https://github.com/bitnami/charts/blob/main/bitnami/redis/values.yaml


For enabling ingress , istio gateway and istio virtualservices are deployed and created route53 entry for `redis.dev.curieo.ai` pointing to access redis master


### Troubleshooting :

Redis cache is installed as cluster with replica in kubernetes , 

```bash
kubectl describe all -n redis

```

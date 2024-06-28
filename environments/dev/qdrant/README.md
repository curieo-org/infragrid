# Qdrant Installation

Install Qdrant using helm chart and values.yaml

```bash
helm repo add qdrant https://qdrant.to/helm
helm install qdrant qdrant/qdrant --values values.yaml -n qdrant --create-namespace

```

To apply changes with updated values.yaml

```bash
helm upgrade --install qdrant qdrant/qdrant --values values.yaml -n qdrant

```

Access dashboard using 

https://qdrant.dev.curieo.ai/dashboard


Refer additional values for helm chart in 

https://github.com/qdrant/qdrant-helm/blob/main/charts/qdrant/values.yaml 


For persistent storage , persistent volume claim is created beforehand using `efs-sc` storageclass

For enabling ingress , istio-gateway.yaml and istio-virtualservice.yaml is deployed and created route53 entry for `dqrant.dev.curieo.org` pointing to load balancer endpoint


### Troubleshooting :

qdrant is installed as statefulset in kubernetes , 

```bash
kubectl describe statefulset/qdrant -n qdrant

```
# KubeRay Installation 

Install kuberay using helm chart and values.yaml

```bash

helm repo add kuberay https://ray-project.github.io/kuberay-helm/
helm install kuberay-operator kuberay/kuberay-operator --version 1.1.0 --namespace kuberay --create-namespace

```

Validate the CRD's are installed 
```bash
kubectl get crd | grep kuberay

```




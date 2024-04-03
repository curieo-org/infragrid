<!-- BEGIN_TF_DOCS -->
# Kubeflow Installation 

For new environment creation , create new folder and add `kustomization.yaml` in it and update patch configuration as per environment
We are using v1.8.0 on AWS EKS 1.29

## To install Kubeflow and Kserve combined 

### Prerequisites

`kustomize` is required with version 5.0.3

Refer:- `https://github.com/kubeflow/manifests/tree/v1.8.0?tab=readme-ov-file#prerequisites`

Can be downloaded from here 
`https://github.com/kubernetes-sigs/kustomize/releases/tag/kustomize%2Fv5.0.3`


```shell
cd environments/kubeflow/kubeflow_manifest

while ! kustomize build . | kubectl apply -f -; do echo "Retrying to apply resources"; sleep 10; done

```


### To verify all the resources are created correctly

```shell
kubectl get pods -n cert-manager
kubectl get pods -n istio-system
kubectl get pods -n auth
kubectl get pods -n knative-eventing
kubectl get pods -n knative-serving
kubectl get pods -n kubeflow
kubectl get pods -n kubeflow-user-example-com
```

### To Create new domain

Note:- In Kubeflow , profile / Domain also called as namespace

```yaml
apiVersion: kubeflow.org/v1
kind: Profile
metadata:
  finalizers:
  - profile-finalizer
  generation: 1
  name: <name of profile>
spec:
  owner:
    kind: User
    name: <owner of domain>
  resourceQuotaSpec: {}

```

### To create new user in kubeflow  

```shell
python3 -c 'from passlib.hash import bcrypt; import getpass; print(bcrypt.using(rounds=12, ident="2y").hash(getpass.getpass()))'
password: <specify password which will be encrypted using above command>

```

Update configmap `dex` from `auth` namespace and restart `dex` deployment in `auth` namespace
Note :- same steps will be applicable for updating passwor for new user



```yaml

apiVersion: v1
data:
  config.yaml: |
    .
    .
    staticPasswords:
    - .
    - .
    - .
    - email: <email address of new user >
      hash: <paste the encrypted password>
      username: user
      userID: "15841185641784" # create unique id 
kind: ConfigMap
metadata:
  name: dex
  namespace: auth
```


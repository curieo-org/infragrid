# Karpenter Installation

Install Karpenter using helm chart and values.yaml


## Prerequisites 

    1. IAM Role with appropriate permissions

    steps:
        1. create IAM role with trust policy
        ```json

        ```
        2. attach existing policy to IAM role



    2. Instance profile 
       
       attach IAM role created in step 1 to instance profile
    ```bash
        aws iam create-instance-profile --instance-profile-name dev-KarpenterInstanceProfile
        aws iam add-role-to-instance-profile --instance-profile-name dev-KarpenterInstanceProfile --role-name dev-KarpenterControllerRole

    ```
    3. EKS cluster
    

## Installation

```bash
helm repo add karpenter https://charts.karpenter.sh
helm repo update

helm install karpenter karpenter/karpenter --namespace karpenter --values values.yaml

```

To apply changes with updated values.yaml

```bash
helm upgrade --install karpenter karpenter/karpenter --values values.yaml -n karpenter

```


## NodePool Configuration

```yaml
    apiVersion: karpenter.sh/v1alpha5
    kind: Provisioner
    metadata:
    name: m5-xlarge
    spec:
    requirements:
        # Include general purpose instance families
        - key: karpenter.k8s.aws/instance-family
        operator: In
        values: [m5]
    providerRef:
        name: default
    ---
    apiVersion: karpenter.k8s.aws/v1alpha1
    kind: AWSNodeTemplate
    metadata:
    name: default
    spec:
    subnetSelector:
        karpenter.sh/discovery: "<CLUSTER_NAME>"
    securityGroupSelector:
        karpenter.sh/discovery: "<CLUSTER_NAME>"
```


Refer additional values for helm chart in 

https://github.com/aws/karpenter-provider-aws/blob/main/charts/karpenter/values.yaml


Refer node pool configurations examples here 

https://github.com/aws/karpenter-provider-aws/tree/v0.36.2/examples/v1beta1

### Troubleshooting :

karpenter is installed as deployment in kubernetes , 

```bash
kubectl describe deploy/karpenter -n karpenter

```
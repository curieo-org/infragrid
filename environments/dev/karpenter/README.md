# Karpenter Installation

Install Karpenter using helm chart and values.yaml


## Prerequisites 

    1. IAM Role with appropriate permissions

    steps:
        1. create IAM role with trust policy
        ```json
            {
                "Version": "2012-10-17",
                "Statement": [
                    {
                        "Sid": "Statement1",
                        "Effect": "Allow",
                        "Principal": {
                            "Service": [
                                "eks.amazonaws.com",
                                "ec2.amazonaws.com"
                            ]
                        },
                        "Action": "sts:AssumeRole"
                    },
                    {
                        "Effect": "Allow",
                        "Principal": {
                            "Federated": "arn:aws:iam::<accountid>:oidc-provider/oidc.eks.eu-central-1.amazonaws.com/id/<cluster_oidc>"
                        },
                        "Action": "sts:AssumeRoleWithWebIdentity",
                        "Condition": {
                            "StringEquals": {
                                "oidc.eks.eu-central-1.amazonaws.com/id/<cluster_oidc>:sub": "system:serviceaccount:karpenter:karpenter"
                            }
                        }
                    }
                ]
            }
        ```
        2. attach existing policy to IAM role

        ```bash
            aws iam attach-role-policy --role-name KarpenterControllerRole --policy-arn arn:aws:iam::aws:policy/AmazonEKSClusterPolicy
            aws iam attach-role-policy --role-name KarpenterControllerRole --policy-arn arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy
            aws iam attach-role-policy --role-name KarpenterControllerRole --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly

        ```



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

helm install karpenter karpenter/karpenter --namespace kube-system --values values.yaml

```

To apply changes with updated values.yaml

```bash
helm upgrade --install karpenter karpenter/karpenter --values values.yaml -n kube-system

```


## NodePool Configuration

### m5 nodepool

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

### g5 nodepool

```yaml

apiVersion: karpenter.sh/v1beta1
kind: NodePool
metadata:
  name: g5-ondemamd
spec:
  template:
    metadata:
      labels:
        role: gpu
        eks.amazonaws.com/nodegroup: gpu-nodes
    spec:
      taints:
        - key: nvidia.com/gpu
          effect: NoSchedule
      requirements:
        - key: "node.kubernetes.io/instance-type"
          operator: In
          values: ["g5.2xlarge", "g5.4xlarge"]
        - key: "karpenter.sh/capacity-type"
          operator: In
          values: ["on-demand"]
      nodeClassRef:
        apiVersion: karpenter.k8s.aws/v1beta1
        kind: EC2NodeClass
        name: g5-ondemamd
  limits:
    cpu: 8 # update limit to increase the gpu instance capacity
---
apiVersion: karpenter.k8s.aws/v1beta1
kind: EC2NodeClass
metadata:
  name: g5-ondemamd
spec:
  amiFamily: AL2 # Amazon Linux 2
  role: "KarpenterNodeRole-dev-eks_cluster"
  subnetSelectorTerms:
    - tags:
        karpenter.sh/discovery: "dev-eks_cluster"
  securityGroupSelectorTerms:
    - tags:
        karpenter.sh/discovery: "dev-eks_cluster"



```


### i3 nodepool


```yaml
apiVersion: karpenter.sh/v1beta1
kind: NodePool
metadata:
  name: i3-ondemamd
spec:
  template:
    spec:
      taints:
        - key: type
          value: large-workloads
          effect: NoSchedule
      requirements:
        - key: "node.kubernetes.io/instance-type"
          operator: In
          values: ["i3.2xlarge", "i3.4xlarge"]
        - key: "karpenter.sh/capacity-type"
          operator: In
          values: ["on-demand"]
      nodeClassRef:
        apiVersion: karpenter.k8s.aws/v1beta1
        kind: EC2NodeClass
        name: i3-ondemamd
  limits:
    cpu: 40
---
apiVersion: karpenter.k8s.aws/v1beta1
kind: EC2NodeClass
metadata:
  name: i3-ondemamd
spec:
  amiFamily: AL2 # Amazon Linux 2
  role: "KarpenterNodeRole-dev-eks_cluster"
  subnetSelectorTerms:
    - tags:
        karpenter.sh/discovery: "dev-eks_cluster"
  securityGroupSelectorTerms:
    - tags:
        karpenter.sh/discovery: "dev-eks_cluster"
  tags:
    type: large-workloads

```


Refer additional values for helm chart in 

https://github.com/aws/karpenter-provider-aws/blob/main/charts/karpenter/values.yaml


Refer node pool configurations examples here 

https://github.com/aws/karpenter-provider-aws/tree/v0.36.2/examples/v1beta1

### Troubleshooting :

karpenter is installed as deployment in kubernetes , 

```bash
kubectl describe deploy/karpenter -n kube-system

```



## Note 

1. Default Nodegroup with min 2 instances are always required to deploy karpenter pods , otherwise scaling will not happen because of it .

2. Scale down cluster autoscaler deployment to 0

```bash
kubectl scale deploy/cluster-autoscaler -n kube-system --replicas 0
```
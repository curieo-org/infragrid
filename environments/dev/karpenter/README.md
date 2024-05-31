# Karpenter Installation

Install Karpenter using helm chart and values.yaml


## Prerequisites 

A. IAM Role with appropriate permissions

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



B. Instance profile 
       
  attach IAM role created in step 1 to instance profile
  ```bash
    aws iam create-instance-profile --instance-profile-name dev-KarpenterInstanceProfile
    aws iam add-role-to-instance-profile --instance-profile-name dev-KarpenterInstanceProfile --role-name dev-KarpenterControllerRole

  ```
C. existing EKS cluster

D. Update aws-auth configmap for cluster 

```bash
kubectl edit configmap aws-auth -n kube-system
```

and add these lines in roles section

```yaml
- groups:
  - system:bootstrappers
  - system:nodes
  rolearn: arn:${AWS_PARTITION}:iam::${AWS_ACCOUNT_ID}:role/KarpenterNodeRole-${CLUSTER_NAME}
  username: system:node:{{EC2PrivateDNSName}}
```

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
apiVersion: karpenter.sh/v1beta1
kind: NodePool
metadata:
  name: default
spec:
  template:
    spec:
      requirements:
        - key: "node.kubernetes.io/instance-type"
          operator: In
          values: ["m5.2xlarge", "m5.xlarge"]
        - key: "karpenter.sh/capacity-type"
          operator: In
          values: ["on-demand"]
      nodeClassRef:
        apiVersion: karpenter.k8s.aws/v1beta1
        kind: EC2NodeClass
        name: default
  limits:
    cpu: 100
---
apiVersion: karpenter.k8s.aws/v1beta1
kind: EC2NodeClass
metadata:
  name: default
spec:
  amiFamily: AL2 # Amazon Linux 2
  role: "KarpenterNodeRole-dev-eks_cluster"
  subnetSelectorTerms:
    - tags:
        karpenter.sh/discovery: "dev-eks_cluster" 
  securityGroupSelectorTerms:
    - tags:
        karpenter.sh/discovery: "dev-eks_cluster" 
  blockDeviceMappings:
    - deviceName: /dev/xvda
      ebs:
        encrypted: true
        volumeSize: 200Gi
        volumeType: gp3
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
  blockDeviceMappings:
    - deviceName: /dev/xvda
      ebs:
        encrypted: true
        volumeSize: 200Gi
        volumeType: gp3


```


### i3 nodepool


```yaml
apiVersion: karpenter.sh/v1beta1
kind: NodePool
metadata:
  name: i3-ondemamd
spec:
  limits:
    cpu: 40
  template:
    metadata:
      labels:
        role: large-workloads
    spec:
      nodeClassRef:
        apiVersion: karpenter.k8s.aws/v1beta1
        kind: EC2NodeClass
        name: i3-ondemand
      requirements:
      - key: node.kubernetes.io/instance-type
        operator: In
        values:
        - i3.2xlarge
        - i3.4xlarge
      - key: karpenter.sh/capacity-type
        operator: In
        values:
        - on-demand
      taints:
      - effect: NoSchedule
        key: type
        value: large-workloads
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
  blockDeviceMappings:
    - deviceName: /dev/xvda
      ebs:
        encrypted: true
        volumeSize: 200Gi
        volumeType: gp3    

```

### i3 non-qdrant nodepool


```yaml
apiVersion: karpenter.sh/v1beta1
kind: NodePool
metadata:
  name: i3-non-qdrant
spec:
  limits:
    cpu: 40
  template:
    metadata:
      labels:
        role: non-qdrant-workloads
    spec:
      nodeClassRef:
        apiVersion: karpenter.k8s.aws/v1beta1
        kind: EC2NodeClass
        name: i3-non-qdrant
      requirements:
      - key: node.kubernetes.io/instance-type
        operator: In
        values:
        - i3.2xlarge
        - i3.4xlarge
      - key: karpenter.sh/capacity-type
        operator: In
        values:
        - on-demand
      taints:
      - effect: NoSchedule
        key: type
        value: non-qdrant-workloads
---
apiVersion: karpenter.k8s.aws/v1beta1
kind: EC2NodeClass
metadata:
  name: i3-non-qdrant
spec:
  amiFamily: AL2 # Amazon Linux 2
  role: "KarpenterNodeRole-dev-eks_cluster"
  subnetSelectorTerms:
    - tags:
        karpenter.sh/discovery: "dev-eks_cluster"
  securityGroupSelectorTerms:
    - tags:
        karpenter.sh/discovery: "dev-eks_cluster"
  blockDeviceMappings:
    - deviceName: /dev/xvda
      ebs:
        encrypted: true
        volumeSize: 200Gi
        volumeType: gp3    

```


Refer additional values for helm chart in 

https://github.com/aws/karpenter-provider-aws/blob/main/charts/karpenter/values.yaml


Refer node pool configurations examples here 
https://karpenter.sh/docs/concepts/nodeclasses/

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

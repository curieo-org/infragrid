<!-- BEGIN_TF_DOCS -->
# EKS Cluster

This module creates eks cluster along with general worker nodes and gpu worker nodes. 
It also creates configures aws-ebs-csi-driver and kube-proxy addons.

## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_kubernetes"></a> [kubernetes](#requirement\_kubernetes) | ~> 2.0 |

## Providers

| Name | Version |
|------|---------|
| <a name="provider_aws"></a> [aws](#provider\_aws) | n/a |
| <a name="provider_tls"></a> [tls](#provider\_tls) | n/a |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| [aws_eks_addon.ebs_csi_driver](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eks_addon) | resource |
| [aws_eks_addon.kube_proxy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eks_addon) | resource |
| [aws_eks_cluster.eks_cluster](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eks_cluster) | resource |
| [aws_eks_node_group.general-nodes](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eks_node_group) | resource |
| [aws_eks_node_group.gpu-nodes](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eks_node_group) | resource |
| [aws_iam_openid_connect_provider.eks](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_openid_connect_provider) | resource |
| [aws_iam_policy.eks_cluster_autoscaler_policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_policy) | resource |
| [aws_iam_role.eks_cluster_autoscaler](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role) | resource |
| [aws_iam_role.eks_cluster_ebs_controller](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role) | resource |
| [aws_iam_role.eks_cluster_iam_role](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role) | resource |
| [aws_iam_role.nodes](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role) | resource |
| [aws_iam_role_policy_attachment.eks_AmazonEKSClusterPolicy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy_attachment) | resource |
| [aws_iam_role_policy_attachment.eks_cluster_autoscaler_attach](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy_attachment) | resource |
| [aws_iam_role_policy_attachment.eks_cluster_autoscaler_policy_attach](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy_attachment) | resource |
| [aws_iam_role_policy_attachment.eks_cluster_ebs_controller_attach](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy_attachment) | resource |
| [aws_iam_role_policy_attachment.nodes-AmazonEC2ContainerRegistryReadOnly](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy_attachment) | resource |
| [aws_iam_role_policy_attachment.nodes-AmazonEKSWorkerNodePolicy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy_attachment) | resource |
| [aws_iam_role_policy_attachment.nodes-AmazonEKS_CNI_Policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/iam_role_policy_attachment) | resource |
| [aws_iam_policy_document.eks_cluster_autoscaler_assume_role_policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/iam_policy_document) | data source |
| [aws_iam_policy_document.eks_ebs_controller_assume_role_policy](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/iam_policy_document) | data source |
| [tls_certificate.eks](https://registry.terraform.io/providers/hashicorp/tls/latest/docs/data-sources/certificate) | data source |

## Inputs

| Name                                                                                                                | Description | Type | Default | Required |
|---------------------------------------------------------------------------------------------------------------------|-------------|------|---------|:--------:|
| <a name="input_account_id"></a> [account\_id](#input\_account\_id)                                                  | n/a | `any` | n/a | yes |
| <a name="input_ebs_csi_driver_version"></a> [ebs\_csi\_driver\_version](#input\_ebs\_csi\_driver\_version)          | n/a | `any` | n/a | yes |
| <a name="input_eks_cluster_name"></a> [eks\_cluster\_name](#input\_eks\_cluster\_name)                              | n/a | `any` | n/a | yes |
| <a name="input_eks_general_instance_type"></a> [eks\_general\_instance\_type](#input\_eks\_general\_instance\_type) | n/a | `any` | n/a | yes |
| <a name="input_eks_version"></a> [eks\_version](#input\_eks\_version)                                               | n/a | `any` | n/a | yes |
| <a name="input_environment"></a> [environment](#input\_environment)                                                 | n/a | `any` | n/a | yes |
| <a name="input_gpu_instance_type"></a> [gpu\_instance\_type](#input\_gpu\_instance\_type)                           | n/a | `any` | n/a | yes |
| <a name="input_k8s_admin_users"></a> [k8s\_admin\_users](#input\_k8s\_admin\_users)                                 | n/a | `list(string)` | n/a | yes |
| <a name="input_kube_proxy_version"></a> [kube\_proxy\_version](#input\_kube\_proxy\_version)                        | n/a | `any` | n/a | yes |
| <a name="input_coredns_version"></a> [coredns\_version](#input\_coredns\_version)                                   | n/a | `any` | n/a | yes |
| <a name="input_aws_vpc_cni_version"></a> [aws\_vpc\_cni\_version](#input\_aws\_vpc\_cni\_version)                   | n/a | `any` | n/a | yes |
| <a name="input_max_eks_general_nodes"></a> [max\_eks\_general\_nodes](#input\_max\_eks\_general\_nodes)             | n/a | `any` | n/a | yes |
| <a name="input_max_eks_gpu_nodes"></a> [max\_eks\_gpu\_nodes](#input\_max\_eks\_gpu\_nodes)                         | n/a | `any` | n/a | yes |
| <a name="input_min_eks_general_nodes"></a> [min\_eks\_general\_nodes](#input\_min\_eks\_general\_nodes)             | n/a | `any` | n/a | yes |
| <a name="input_min_eks_gpu_nodes"></a> [min\_eks\_gpu\_nodes](#input\_min\_eks\_gpu\_nodes)                         | n/a | `any` | n/a | yes |
| <a name="input_private_subnets"></a> [private\_subnets](#input\_private\_subnets)                                   | n/a | `any` | n/a | yes |
| <a name="input_region"></a> [region](#input\_region)                                                                | n/a | `any` | n/a | yes |
| <a name="input_state_bucket_region"></a> [state\_bucket\_region](#input\_state\_bucket\_region)                     | n/a | `any` | n/a | yes |
| <a name="input_vpc_state_bucket"></a> [vpc\_state\_bucket](#input\_vpc\_state\_bucket)                              | n/a | `any` | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_eks_cluster_autoscaler_arn"></a> [eks\_cluster\_autoscaler\_arn](#output\_eks\_cluster\_autoscaler\_arn) | n/a |
| <a name="output_eks_cluster_ebs_controller_arn"></a> [eks\_cluster\_ebs\_controller\_arn](#output\_eks\_cluster\_ebs\_controller\_arn) | n/a |
| <a name="output_eks_cluster_name"></a> [eks\_cluster\_name](#output\_eks\_cluster\_name) | n/a |
| <a name="output_eks_endpoint"></a> [eks\_endpoint](#output\_eks\_endpoint) | n/a |
| <a name="output_eks_id"></a> [eks\_id](#output\_eks\_id) | n/a |
| <a name="output_kubeconfig-certificate-authority-data"></a> [kubeconfig-certificate-authority-data](#output\_kubeconfig-certificate-authority-data) | n/a |
<!-- END_TF_DOCS -->
<!-- BEGIN_TF_DOCS -->
# Kubernetes Cluster 

This Creates kubernerets cluster based on environment variables specified in variables.tf

run below command to apply changes

```shell
terraform init 
terraform plan
terraform apply
```

## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_terraform"></a> [terraform](#requirement\_terraform) | =1.5 |
| <a name="requirement_aws"></a> [aws](#requirement\_aws) | ~> 5.0 |
| <a name="requirement_helm"></a> [helm](#requirement\_helm) | ~> 2.0 |

## Providers

| Name | Version |
|------|---------|
| <a name="provider_aws"></a> [aws](#provider\_aws) | 5.42.0 |
| <a name="provider_terraform"></a> [terraform](#provider\_terraform) | n/a |

## Modules

| Name | Source | Version |
|------|--------|---------|
| <a name="module_eks"></a> [eks](#module\_eks) | ../../../modules/eks | n/a |

## Resources

| Name | Type |
|------|------|
| [aws_eks_cluster.cluster](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/eks_cluster) | data source |
| [aws_eks_cluster_auth.cluster_auth](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/data-sources/eks_cluster_auth) | data source |
| [terraform_remote_state.vpc](https://registry.terraform.io/providers/hashicorp/terraform/latest/docs/data-sources/remote_state) | data source |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_account_id"></a> [account\_id](#input\_account\_id) | n/a | `string` | `"698471419283"` | no |
| <a name="input_ebs_csi_driver_version"></a> [ebs\_csi\_driver\_version](#input\_ebs\_csi\_driver\_version) | n/a | `string` | `"v1.28.0-eksbuild.1"` | no |
| <a name="input_eks_cluster_name"></a> [eks\_cluster\_name](#input\_eks\_cluster\_name) | n/a | `string` | `"dev-eks_cluster"` | no |
| <a name="input_eks_general_instance_type"></a> [eks\_general\_instance\_type](#input\_eks\_general\_instance\_type) | n/a | `string` | `"m5.2xlarge"` | no |
| <a name="input_eks_version"></a> [eks\_version](#input\_eks\_version) | n/a | `string` | `"1.29"` | no |
| <a name="input_environment"></a> [environment](#input\_environment) | n/a | `string` | `"dev"` | no |
| <a name="input_gpu_instance_type"></a> [gpu\_instance\_type](#input\_gpu\_instance\_type) | n/a | `string` | `"g5.2xlarge"` | no |
| <a name="input_k8s_admin_users"></a> [k8s\_admin\_users](#input\_k8s\_admin\_users) | n/a | `list` | <pre>[<br>  "asmi@curieo.org",<br>  "raahul@curieo.org"<br>]</pre> | no |
| <a name="input_kube_proxy_version"></a> [kube\_proxy\_version](#input\_kube\_proxy\_version) | n/a | `string` | `"v1.29.0-eksbuild.1"` | no |
| <a name="input_max_eks_general_nodes"></a> [max\_eks\_general\_nodes](#input\_max\_eks\_general\_nodes) | n/a | `string` | `"5"` | no |
| <a name="input_max_eks_gpu_nodes"></a> [max\_eks\_gpu\_nodes](#input\_max\_eks\_gpu\_nodes) | n/a | `string` | `"4"` | no |
| <a name="input_min_eks_general_nodes"></a> [min\_eks\_general\_nodes](#input\_min\_eks\_general\_nodes) | n/a | `string` | `"2"` | no |
| <a name="input_min_eks_gpu_nodes"></a> [min\_eks\_gpu\_nodes](#input\_min\_eks\_gpu\_nodes) | n/a | `string` | `"0"` | no |
| <a name="input_private_subnets"></a> [private\_subnets](#input\_private\_subnets) | n/a | `list` | <pre>[<br>  "subnet-0e72dfe73416f9f1c",<br>  "subnet-0c20fe845c419f5ae"<br>]</pre> | no |
| <a name="input_region"></a> [region](#input\_region) | n/a | `string` | `"eu-central-1"` | no |
| <a name="input_state_bucket_region"></a> [state\_bucket\_region](#input\_state\_bucket\_region) | n/a | `string` | `"eu-central-1"` | no |
| <a name="input_vpc_state_bucket"></a> [vpc\_state\_bucket](#input\_vpc\_state\_bucket) | n/a | `string` | `"infragrid-terraform-state"` | no |

## Outputs

No outputs.
<!-- END_TF_DOCS -->
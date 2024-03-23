
variable "vpc_state_bucket" {}

variable "state_bucket_region" {}

variable "region" {}

variable "environment" {}

variable "eks_version" {}

variable "private_subnets" {}

variable "gpu_instance_type" {}

variable "eks_general_instance_type" {}

variable "min_eks_general_nodes" {}

variable "max_eks_general_nodes" {}

variable "min_eks_gpu_nodes" {}

variable "max_eks_gpu_nodes" {}

variable "ebs_csi_driver_version" {}

variable "kube_proxy_version" {}

variable "eks_cluster_name" {}

variable "account_id" {}

variable "k8s_admin_users" {
  type = list(string)
}

variable "aws_vpc_cni_version" {}

variable "coredns_version" {}

variable "environment" {
  default = "dev"
}

variable "account_id" {
  default = "698471419283"
}

#variable "vpc_cidr" {
#  default = "10.128.0.0/18"
#}

variable "region" {
  default = "eu-central-1"
}

variable "state_bucket_region" {
  default = "eu-central-1"
}
variable "vpc_state_bucket" {
  default = "infragrid-terraform-state"
}

variable "private_subnets" {
  default = ["subnet-0e72dfe73416f9f1c", "subnet-0c20fe845c419f5ae"]
}

variable "gpu_instance_type" {
  default = "g5.2xlarge"
}
variable "eks_general_instance_type" {
  default = "m5.2xlarge"
}

variable "min_eks_general_nodes" {
  default = "2"
}
variable "max_eks_general_nodes" {
  default = "5"
}

variable "min_eks_gpu_nodes" {
  default = "0"
}

variable "max_eks_gpu_nodes" {
  default = "4"
}

variable "ebs_csi_driver_version" {
  default = "v1.28.0-eksbuild.1"
}
variable "kube_proxy_version" {
  default = "v1.29.0-eksbuild.1"
}

variable "eks_version" {
  default = "1.29"
}

variable "eks_cluster_name" {
  default = "dev-eks_cluster"
}

variable "k8s_admin_users" {
  default = ["asmi@curieo.org", "raahul@curieo.org"]
}

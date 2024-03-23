data "terraform_remote_state" "vpc" {
  backend = "s3"
  config = {
    bucket = var.vpc_state_bucket
    region = var.state_bucket_region
    key    = "tfstate/${var.environment}-env-vpc.tfstate"
  }
}

#--------------------------------------------------------------
# data lookup for retrieving istio NodePorts
#--------------------------------------------------------------
data "aws_eks_cluster" "cluster" {
  name = module.eks.eks_cluster_name
}

data "aws_eks_cluster_auth" "cluster_auth" {
  name = module.eks.eks_id
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.cluster.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority.0.data)
  token                  = data.aws_eks_cluster_auth.cluster_auth.token
}
#--------------------------------------------------------------

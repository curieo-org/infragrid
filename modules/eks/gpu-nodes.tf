
resource "aws_eks_node_group" "gpu-nodes" {
  cluster_name    = aws_eks_cluster.eks_cluster.name
  node_group_name = "gpu-nodes"
  node_role_arn   = aws_iam_role.nodes.arn

  subnet_ids = var.private_subnets

  capacity_type  = "SPOT"
  instance_types = [var.gpu_instance_type]

  scaling_config {
    desired_size = 0
    max_size     = var.max_eks_gpu_nodes
    min_size     = var.min_eks_gpu_nodes
  }

  update_config {
    max_unavailable = 1
  }

  labels = {
    role = "gpu"
  }

  taint {
    key    = "nvidia.com/gpu"
    effect = "NO_SCHEDULE"
  }

  tags = {
    "k8s.io/cluster-autoscaler/${aws_eks_cluster.eks_cluster.name}" = "owned",
    "k8s.io/cluster-autoscaler/enabled"                             = "TRUE"

  }

  depends_on = [
    aws_iam_role_policy_attachment.nodes-AmazonEKSWorkerNodePolicy,
    aws_iam_role_policy_attachment.nodes-AmazonEKS_CNI_Policy,
    aws_iam_role_policy_attachment.nodes-AmazonEC2ContainerRegistryReadOnly,
  ]
}


#resource "helm_release" "nvidia" {
#  name       = "nvidia"
#  repository = "https://nvidia.github.io/k8s-device-plugin"
#  chart      = "nvidia-device-plugin"
#  version    = "0.14.5"
#  create_namespace = true
#
#
##  set {
##    name  = "tolerations"
##    value = jsonencode([
##      {
##        key      = "nvidia.com/gpu"
##        operator = "Exists"
##        effect   = "NoSchedule"
##      },
##      {
##        key : "dedicated",
##        operator : "Equal"
##        value : "nvidia-gpu"
##        effect : "NoSchedule"
##      }
##    ])
##  }
#  # You can set other values here as needed
#}

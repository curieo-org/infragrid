data "aws_iam_policy_document" "eks_ebs_controller_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]
    effect  = "Allow"

    condition {
      test     = "StringEquals"
      variable = "${replace(aws_iam_openid_connect_provider.eks.url, "https://", "")}:sub"
      values   = ["system:serviceaccount:kube-system:ebs-csi-controller-sa"]
    }

    principals {
      identifiers = [aws_iam_openid_connect_provider.eks.arn]
      type        = "Federated"
    }
  }
}

resource "aws_iam_role" "eks_cluster_ebs_controller" {
  assume_role_policy = data.aws_iam_policy_document.eks_ebs_controller_assume_role_policy.json
  name               = "eks-cluster-ebs-controller"
}

resource "aws_iam_role_policy_attachment" "eks_cluster_ebs_controller_attach" {
  role       = aws_iam_role.eks_cluster_ebs_controller.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy"
}


output "eks_cluster_ebs_controller_arn" {
  value = aws_iam_role.eks_cluster_ebs_controller.arn
}

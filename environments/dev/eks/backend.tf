terraform {
  ## terraform backend doesn't support parameterized values , hence no variable added here
  backend "s3" {
    bucket         = "infragrid-terraform-state"
    key            = "tfstate/dev-env-eks.tfstate"
    region         = "eu-central-1"
    encrypt        = false
    dynamodb_table = "infragrid-698471419283-tf-lockid"
  }
}


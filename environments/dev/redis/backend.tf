terraform {
  backend "s3" {
    bucket         = "infragrid-terraform-state"
    key            = "tfstate/dev-env-redis-cache.tfstate"
    region         = "eu-central-1"
    encrypt        = false
    dynamodb_table = "infragrid-698471419283-tf-lockid"
  }
}

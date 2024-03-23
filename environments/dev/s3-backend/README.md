<!-- BEGIN_TF_DOCS -->
# Terraform S3 Backend configuration

For new environment s3 backend creation , comment all the content form backend.tf and add below line 

```terraform

terraform {
  backend "local" {}
}

```

and run 
```shell
terraform init 
terraform plan
terraform apply
```

after s3 bucket and dynamoDB creation , revert the change in backend.tf 
```shell
terraform init -migrate-state
```

Above process will create s3 backend configuration and store its state in terraform


### --------------------------
# Terraform resources and Details 
## Providers

| Name | Version |
|------|---------|
| <a name="provider_aws"></a> [aws](#provider\_aws) | 5.42.0 |


## Resources

| Name | Type |
|------|------|
| [aws_dynamodb_table.terraform-lock](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/dynamodb_table) | resource |
| [aws_s3_bucket.tfstate](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket) | resource |
| [aws_s3_bucket_acl.tfstate](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/s3_bucket_acl) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_dynamodb_table_name"></a> [dynamodb\_table\_name](#input\_dynamodb\_table\_name) | n/a | `string` | `"infragrid-698471419283-tf-lockid"` | no |

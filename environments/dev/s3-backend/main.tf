resource "aws_s3_bucket" "tfstate" {
  bucket = "infragrid-terraform-state"
}
resource "aws_s3_bucket_acl" "tfstate" {
  bucket = aws_s3_bucket.tfstate.id
  acl    = "private"
}


resource "aws_dynamodb_table" "terraform-lock" {
  name     = var.dynamodb_table_name
  hash_key = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }
  tags = {
    "Name" = "DynamoDB Terraform State Lock Table"
  }
}


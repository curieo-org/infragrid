
variable "environment" {
  default = "dev"
}

variable "vpc_id" {
  default = "vpc-090f7df614bb6ecaa"
}

variable "region" {
  default = "eu-central-1"
}

variable "security_group_ids" {
  default = ["sg-0e632bb0e530fe359"]
}

variable "private_subnets" {
  default = ["subnet-0e72dfe73416f9f1c", "subnet-0c20fe845c419f5ae"]
}

variable "redis_engine_version" {
  default = "7"
}

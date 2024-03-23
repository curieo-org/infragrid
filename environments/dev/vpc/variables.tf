
variable "environment" {
  default = "dev"
}

variable "vpc_cidr" {
  default = "10.128.0.0/18"
}

variable "region" {
  default = "eu-central-1"
}

variable "public_subnets_cidr" {
  default = ["10.128.0.0/23", "10.128.2.0/23"]
}

variable "private_subnets_cidr" {
  default = ["10.128.16.0/21", "10.128.40.0/21"]
}

variable "availability_zones" {
  default = ["eu-central-1a", "eu-central-1b"]
}


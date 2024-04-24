# variables.tf


variable "redis_engine_version" {
  description = "The Redis engine version"
}

variable "environment" {
  description = "The environment for tagging purposes"
}

variable "subnet_ids" {
  type = list(string)
}

variable "security_group_ids" {
  type = list(string)
}

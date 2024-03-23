output "vpc_id" {
  value = "${module.networking.vpc_id}"
}

output "private_subnets" {
  value = "${module.networking.private_subnets}"
}

output "public_subnets" {
  value = "${module.networking.public_subnets}"
}

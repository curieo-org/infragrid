output "vpc_id" {
  value = "${aws_vpc.vpc.id}"
}

output "private_subnets" {
  value = "${aws_subnet.private_subnet}"
}

output "public_subnets" {
  value = "${aws_subnet.public_subnet}"
}

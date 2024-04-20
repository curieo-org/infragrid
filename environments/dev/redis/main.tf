module "redis-cache" {
  source               = "../../../modules/redis"
  redis_engine_version = var.redis_engine_version
  environment          = var.environment
  subnet_ids           = var.private_subnets
  security_group_ids   = var.security_group_ids
}

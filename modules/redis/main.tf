
resource "aws_elasticache_serverless_cache" "redis_cache" {
  engine               = "redis"
  name                 = format("%s-curieo-redis", var.environment)
  major_engine_version = var.redis_engine_version
  security_group_ids   = var.security_group_ids
  subnet_ids           = var.subnet_ids
  tags = {
    Environment = var.environment
  }
}
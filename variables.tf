variable "aws_region" {
  description = "Região para criação de recursos"
  type        = string
  default     = "us-east-1"
}

variable "vpc_name" {
  description = "Rede do projeto"
  type        = string
  default     = "vpc-projeto-devops"
}

variable "private_key_path" {
  default = "~/.ssh/projeto-aws-key"
}
resource "aws_security_group" "allow_web" {
  name        = "permitir_web_e_ssh"
  description = "Permitir trafego HTTP e SSH"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "SSH de qualquer lugar (Para estudo)"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Liberacao Full para testes
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "sg-projeto-devops"
  }
}
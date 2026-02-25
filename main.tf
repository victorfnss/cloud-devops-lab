data "aws_ami" "linux_x86" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-2023*-x86_64"]
  }
}

locals {
  private_key = file(var.private_key_path)
}

resource "aws_instance" "app_server" {

  ami                         = data.aws_ami.linux_x86.id
  instance_type               = "t3.micro"
  key_name                    = aws_key_pair.minha_chave.key_name
  subnet_id                   = aws_subnet.public_sub.id
  vpc_security_group_ids      = [aws_security_group.allow_web.id]
  associate_public_ip_address = true

  user_data = file("./user_data/yum_padrao_projeto.sh")

  connection {
    type        = "ssh"
    user        = "ec2-user"
    private_key = local.private_key
    host        = self.public_ip
  }


  provisioner "file" {
    source      = "app"
    destination = "/tmp/app"
  }

  tags = {
    Name = "servidor-docker-arm-victor"
  }
}

output "url_da_app" {
  value = "http://${aws_instance.app_server.public_ip}"
}

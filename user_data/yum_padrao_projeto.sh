#!/bin/bash
yum update -y
yum install -y docker
systemctl start docker
systemctl enable docker
usermod -aG docker ec2-user
curl -L "https://github.com/docker/compose/releases/download/v2.32.4/docker-compose-linux-x86_64" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
sudo mkdir -p /opt/app
sudo cp -r /tmp/app/* /opt/app/
sudo cp -r /tmp/app/.env /opt/app/
sudo chown -R ec2-user:ec2-user /opt/app
cd /opt/app
sudo docker-compose up -d
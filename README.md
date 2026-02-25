🚀 **AWS Infrastructure as Code: Deploy Automatizado com Docker Compose**

Este projeto demonstra a orquestração de uma infraestrutura escalável na AWS utilizando Terraform, com o deploy automatizado de uma aplicação multi-container (Frontend Web e Backend Tomcat) via Docker Compose.


🛠️ **Tecnologias Utilizadas**

- Terraform: Provisionamento de infraestrutura (IaC).
- AWS (EC2, VPC, Security Groups): Provedor de nuvem.
- Docker & Docker Compose: Containerização e orquestração local.
- Amazon Linux 2023: Sistema operacional base.


🏗️ **Arquitetura e Diferenciais Técnicos**

1. Gestão de Segredos e Variáveis

Este projeto utiliza abstração de variáveis de ambiente:
- As credenciais sensíveis são gerenciadas via arquivos .env, que não são versionados, seguindo as melhores práticas de segurança.
- Uso de Terraform Variables com o atributo sensitive = true para manipular chaves privadas SSH.

2. Infraestrutura Imutável e Provisionamento

O projeto utiliza provisioners do Terraform para garantir o estado da aplicação:
- User Data: Automação da instalação do runtime (Docker e Docker-Compose).
- "File" e "Connection": Conexão na instância para envio de arquivos necessários para funcionamento da aplicação.


🧠 **Desafios de Engenharia e Troubleshooting**

Durante o desenvolvimento, enfrentei e resolvi desafios reais de arquitetura que demonstram domínio sobre o ambiente:
- Arquitetura de CPU (ARM64 vs x86_64): Realizei a migração estratégica de instâncias Graviton (ARM) para instâncias T3 (x86) para garantir compatibilidade imediata com bibliotecas específicas do backend Tomcat e plugins de build do Docker.
- Permissões e SCP: Utilizei a estratégia de diretório temporário (/tmp) para contornar limitações de privilégio do protocolo SCP, garantindo uma entrega de arquivos limpa e segura em /opt/app.


🚀 **Como Executar**

1. Clone o repositório.
2. Crie seu arquivo terraform.tfvars com sua ssh_private_key.
3. Configure seu arquivo .env na pasta /app.
4. Adicione suas variáveis no compose e edite o nome do seu arquivo .war (opcional).
5. Execute os comandos:
  terraform init
  terraform apply

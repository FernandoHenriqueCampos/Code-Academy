# Site Estático com Apache no Docker 🚀

Este repositório contém a solução para a conteinerização de um site estático utilizando o servidor web Apache (HTTPd). O projeto foi desenvolvido para demonstrar o uso de Docker e Docker Compose para isolamento de ambientes e facilidade de deploy.

## Requisitos do Projeto
- Criar um arquivo `index.html` personalizado.
- Criar um `Dockerfile` baseado na imagem oficial `httpd:alpine`.
- Criar um `compose.yaml` para orquestração.
- Mapeamento de portas: `8080` (Host) -> `80` (Container).

## Estrutura de Pastas
```text
-- Docker/
   |-- Dockerfile
   |-- compose.yaml
   |-- index.html

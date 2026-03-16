# 👤 User Management Frontend

Este repositório contém o frontend para o sistema de gerenciamento de usuários do **Projeto 4 - Code Academy**. A aplicação foi construída com tecnologias web nativas e está totalmente preparada para rodar em containers Docker, atendendo aos requisitos de comunicação com a API via CORS.

## 🚀 Tecnologias Utilizadas

- **HTML5 & CSS3**: Interface responsiva e estilização personalizada.
- **JavaScript (ES6+)**: Consumo de API assíncrona (`async/await`) e organização em módulos.
- **Nginx**: Servidor web de alta performance para arquivos estáticos.
- **Docker & Docker Compose**: Para containerização e orquestração do ambiente.

## 🛠️ Funcionalidades

- **Listagem Dinâmica**: Renderização automática de usuários via método `GET`.
- **Criação de Usuário**: Cadastro rápido através de formulário integrado com o método `POST`.
- **Edição (PUT/PATCH)**: Lógica de troca de contexto na UI para edição de dados existentes.
- **Remoção (DELETE)**: Deleção de registros com atualização de estado em tempo real.

---

## 📦 Como Executar com Docker

Certifique-se de estar na raiz do projeto onde se encontram o `dockerfile` e o `docker-compose.yml`.

### 1. Subir o Container

Execute o comando abaixo para construir a imagem e iniciar o serviço:

```bash
docker compose up -d
```

### 🎯 Objetivos do Projeto

Este projeto foi desenvolvido com o propósito de consolidar conceitos fundamentais de **CRUD** e integração de **APIs** utilizando JavaScript moderno. O foco principal foi a aplicação prática de:

- **Requisições Assíncronas:** Implementação de fluxos de dados eficientes utilizando `async/await`.
- **Modularização:** Organização do código em módulos (`import/export`), garantindo maior manutenibilidade e separação de responsabilidades.
- **Fetch API vs. Axios:** Um marco importante nesta etapa foi a transição do uso do _Axios_ (biblioteca externa) para a **Fetch API** (nativa do browser). Essa experiência permitiu um entendimento mais profundo de como o protocolo HTTP é manipulado nativamente no JavaScript, ampliando meu leque de ferramentas para o desenvolvimento de aplicações robustas sem dependências externas desnecessárias.

---

# 👤 User Management Frontend — Axios Edition

Este projeto é uma evolução direta do [**User Management Frontend**] Proje05-Crud _(projeto anterior)_, desenvolvido originalmente com **Fetch API** nativa. O objetivo inicial era simples: reescrever as mesmas funcionalidades de CRUD utilizando **Axios** como cliente HTTP, consolidando o aprendizado sobre bibliotecas externas de requisição.

No entanto, ao longo do desenvolvimento, o projeto ganhou identidade própria — um novo design foi criado do zero para diferenciar os dois repositórios, e uma funcionalidade extra foi adicionada: um **console de requisições em tempo real**, inspirado em terminais Linux/macOS, que exibe cada chamada HTTP com método, URL, body, status e resposta da API diretamente na interface.

---

## 🚀 Tecnologias Utilizadas

- **HTML5 & CSS3**: Interface responsiva com design editorial — tema claro, tipografia com **Geist** + **JetBrains Mono**.
- **JavaScript (ES6+)**: Módulos nativos (`import/export`), `async/await` e separação por camadas (`api/`, `dom/`, `console/`).
- **Axios**: Cliente HTTP externo importado via CDN (ESM), substituindo a Fetch API do projeto anterior.
- **Nginx**: Servidor web para servir os arquivos estáticos.
- **Docker & Docker Compose**: Containerização e orquestração do ambiente.

---

## 🛠️ Funcionalidades

- **Listagem Dinâmica**: Renderização automática de usuários via `GET`.
- **Criação de Usuário**: Cadastro via formulário integrado com `POST`.
- **Edição Inteligente (PUT/PATCH)**: A lógica detecta automaticamente quantos campos foram alterados — se todos os 3 campos mudaram, dispara um `PUT`; se menos, um `PATCH`.
- **Remoção (DELETE)**: Deleção com atualização de estado em tempo real.
- **Console de Requisições**: Painel estilo terminal que loga cada requisição em tempo real, exibindo:
  - Método HTTP com cor por tipo (`GET` azul, `POST` verde, `PUT`/`PATCH` amarelo, `DELETE` vermelho)
  - URL chamada e body enviado
  - Status de resposta e payload retornado pela API
  - Mensagens de erro personalizadas vindas da API (via `data.message`, `data.error`, etc.)
  - Botão `clear` para limpar o histórico
  - Toggle no header para mostrar/ocultar o painel

---

## 🗂️ Estrutura do Projeto

```
src/
├── index.html
├── script.js
├── styles/
│   ├── reset.css
│   └── style.css
└── scripts/
    ├── api/
    │   ├── read.js
    │   ├── create.js
    │   ├── update.js
    │   └── delete.js
    ├── dom/
    │   └── render.js
    └── console/
        └── logger.js
```

---

## 📦 Como Executar com Docker

Certifique-se de estar na raiz do projeto onde se encontram o `dockerfile` e o `docker-compose.yml`.

### 1. Subir o Container

```bash
docker compose up -d
```

---

## 🎯 Objetivos do Projeto

Este projeto nasceu como um exercício de reescrita — pegar o CRUD do projeto anterior e trocar a **Fetch API** pelo **Axios**. Mas virou algo maior.

A decisão de mudar o design foi intencional: manter dois repositórios com a mesma aparência tornaria um deles redundante. Então um novo sistema visual foi construído do zero — paleta editorial clara, fontes diferentes, cards com borda lateral e painéis com acento superior.

A adição do **console de requisições** surgiu da vontade de tornar o projeto mais didático e observável. Em vez de abrir o DevTools para inspecionar cada chamada, a própria interface expõe o que está acontecendo por baixo — método, URL, body, resposta e erros da API. Uma camada de transparência que reforça o entendimento do ciclo completo de uma requisição HTTP.

Os aprendizados consolidados nessa etapa foram:

- **Axios vs. Fetch**: Diferenças práticas de uso, tratamento de erros e configuração de headers.
- **Modularização em camadas**: Separação clara entre `api/` (requisições), `dom/` (renderização) e `console/` (observabilidade).
- **Lógica de PATCH vs. PUT**: Detecção automática de campos alterados para escolha do método correto.
- **Interceptação e log de requisições**: Como construir uma camada de observabilidade sem modificar a lógica de negócio principal.

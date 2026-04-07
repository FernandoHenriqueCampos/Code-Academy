# Proj08-CardapioVue - Cardapio Digital

Este projeto e uma aplicacao de cardapio digital desenvolvida com **Vue 3 + Vite**, com foco em organizacao por componentes, reatividade e experiencia visual moderna.

A proposta central e permitir o gerenciamento de itens de cardapio (cadastro, listagem, filtro e remocao), exibindo estatisticas em tempo real e mantendo os dados no navegador com `localStorage`.

Ao longo do desenvolvimento, o projeto evoluiu com melhorias de interface e UX, incluindo:

- layout em duas colunas com formulario + cards;
- filtro por categoria sincronizado com a barra de status;
- ajustes de alinhamento e responsividade;
- footer profissional com links de redes.

## Tecnologias Utilizadas

- **Vue 3 (Composition API)**: `ref`, `computed`, `watch`, hooks de ciclo de vida e comunicacao por props/emits.
- **Vite**: ambiente de desenvolvimento e build.
- **JavaScript (ES Modules)**: estrutura modular com componentes Vue.
- **CSS3 (scoped styles)**: estilizacao por componente, tema visual e responsividade.
- **Nginx**: servidor para publicar os arquivos estaticos de producao.
- **Docker e Docker Compose**: containerizacao e execucao padronizada.

## Funcionalidades

- **Listagem dinamica de itens**: renderizacao reativa dos cards de cardapio.
- **Cadastro de item**: formulario com validacao basica.
- **Remocao de item**: exclusao direta no card com atualizacao imediata.
- **Filtro por categoria**: `Todas`, `Lanche`, `Bebida`, `Sobremesa`.
- **Status sincronizados com filtro**: total, disponiveis, estoque e preco medio acompanham a categoria selecionada.
- **Persistencia local**: itens salvos no `localStorage`.
- **Layout responsivo**: adaptacao para desktop, tablet e mobile.
- **Footer com redes**: links para GitHub e LinkedIn no rodape.

## Estrutura do Projeto

```text
.
├── public/
├── src/
│   ├── main.js
│   ├── style.css
│   ├── App.vue
│   └── components/
│       ├── ItemForm.vue
│       ├── FilterBar.vue
│       ├── StatsBar.vue
│       └── MenuCard.vue
├── Dockerfile
├── docker-compose.yml
├── package.json
└── vite.config.js
```

## Como Executar Localmente

Pre-requisitos:

- Node.js 20+
- npm

1. Instalar dependencias

```bash
npm install
```

2. Rodar ambiente de desenvolvimento

```bash
npm run dev
```

3. Acessar no navegador (porta padrao do Vite)

```text
http://localhost:5173
```

## Como Executar com Docker

Certifique-se de estar na raiz do projeto (onde estao `Dockerfile` e `docker-compose.yml`).

1. Subir os containers

```bash
docker compose up --build -d
```

2. Acessar a aplicacao

```text
http://localhost:8080
```

3. Parar os containers

```bash
docker compose down
```

## Conceitos do Modulo Aplicados (componente + linha aproximada)

1. **Reatividade com `ref`**

- `src/App.vue` (linhas ~9-18): estados globais (`items`, `activeCategory`, refs de layout).
- `src/components/ItemForm.vue` (linhas ~6-9): estado dos campos do formulario.

2. **Propriedades computadas com `computed`**

- `src/App.vue` (linhas ~56-94): `filteredItems`, resumo textual e `stats` sincronizados ao filtro.
- `src/components/MenuCard.vue` (linhas ~19-45): preco formatado, disponibilidade e metadados de categoria.
- `src/components/StatsBar.vue` (linhas ~38-41): exibicao formatada dos indicadores.

3. **Persistencia e reacao a mudancas com `watch`**

- `src/App.vue` (linhas ~38-40): salva itens no `localStorage`.
- `src/App.vue` (linhas ~139-142): reseta expansao/recalcula layout ao mudar filtro.

4. **Ciclo de vida (`onMounted`, `onBeforeUnmount`)**

- `src/App.vue` (linhas ~22-35): carga inicial de dados.
- `src/App.vue` (linhas ~119-137): `ResizeObserver` para ajustes de layout e limpeza de recursos.

5. **Comunicacao entre componentes (`props` / `emits`)**

- `src/components/ItemForm.vue` (linha ~4): `defineEmits(['add-item'])`.
- `src/components/FilterBar.vue` (linha ~3): `defineEmits(['update-category'])`.
- `src/components/MenuCard.vue` (linha ~5): `defineEmits(['remove-item'])`.
- `src/components/StatsBar.vue` (linha ~4): recebe `props` de estatisticas.

6. **Diretivas e bindings dinamicos (`v-for`, `v-if`, `v-model`, `:class`, `:style`)**

- `src/App.vue` (linhas ~191-231): renderizacao condicional e listas de cards.
- `src/components/ItemForm.vue` (linhas ~33-60): formulario com `v-model`.
- `src/components/FilterBar.vue` (linhas ~24-27): filtros dinamicos e estado ativo.

7. **Responsividade e UX**

- `src/App.vue` e componentes (blocos `<style scoped>`): breakpoints, grid adaptativo e estados de interacao.

#### 🔹 Proj06-Crud-Axios

> **Gerenciador de Usuários — Axios & Observabilidade**
> Evolução direta do Proj05, reescrito para consolidar o uso do **Axios** como cliente HTTP em substituição à Fetch API nativa. Além da reescrita das requisições, o projeto ganhou identidade própria com um novo sistema visual e uma funcionalidade extra: um **console de requisições em tempo real** embutido na interface, inspirado em terminais Linux/macOS. O console exibe método, URL, body, status e mensagens de erro personalizadas da API a cada chamada — tornando o ciclo HTTP completamente observável sem abrir o DevTools. O código foi organizado em camadas separadas: `api/` para requisições, `dom/` para renderização e `console/` para o sistema de log.

#### 🔹 Proj07-ReatividadeVue

> **Exploração de Reatividade — Vue 3 Composition API**
> Projeto focado no domínio do sistema de reatividade do Vue 3, utilizando a sintaxe `<script setup>`. A aplicação demonstra de forma prática a gestão de estados complexos com `ref` e `reactive`, além de transformações de dados em tempo real com `computed`. O diferencial do projeto é um **Monitor de Lifecycle**, que permite observar visualmente o disparo dos hooks (`onMounted`, `onUpdated`, etc.) conforme o usuário interage com os componentes. A estrutura foi modularizada em seções independentes para exemplificar a comunicação entre componentes via `props` e `emits`, consolidando padrões de arquitetura para interfaces modernas e performáticas.

## Objetivos do Projeto

Este projeto consolida os conceitos principais do modulo Vue aplicados em um caso real:

- modelagem de estado reativo;
- composicao por componentes;
- fluxo de dados pai-filho;
- persistencia local;
- interface responsiva e evolutiva.

A evolucao do layout e dos comportamentos (filtros, estatisticas sincronizadas e ajustes de alinhamento) foi feita para tornar o projeto mais consistente visualmente e mais didatico tecnicamente.

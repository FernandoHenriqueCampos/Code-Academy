# 🟢 Reactivity in Vue 3 — Composition API

Este repositório contém o projeto de exploração de reatividade do **Vue 3**. A aplicação foi construída para demonstrar os pilares da **Composition API**, focando em como o estado é gerenciado, transformado e transmitido entre componentes em uma interface reativa e moderna.

## 🚀 Tecnologias Utilizadas

- **Vue 3**: Framework progressivo utilizando a sintaxe <script setup>.
- **Vite**: Ferramenta de build de próxima geração para um desenvolvimento rápido.
- **JavaScript (ES6+)**: Uso de reatividade nativa (ref, reactive, computed) e hooks de ciclo de vida.
- **Bootstrap 5**: Framework de CSS para garantir uma interface limpa, responsiva e organizada com componentes de card e formulários.

## 🛠️ Funcionalidades

- **Estado Reativo**: Uso de ref() para valores primitivos e reactive() para objetos complexos e listas.
- **Lógica Computada**: Implementação de computed() para transformações de dados em tempo real (dobro do valor e paridade).
- **Comunicação entre Componentes**: Fluxo de dados estruturado utilizando defineProps() para entrada e defineEmits() para saída de eventos entre componentes pai e filho.
- **Monitoramento de Ciclo de Vida**: Um sistema de log visual que rastreia os hooks (onMounted, onUpdated, onUnmounted) conforme o usuário interage com os componentes.

---

## 📦 Como Executar

Certifique-se de ter o Node.js instalado em sua máquina para gerenciar as dependências.

### 1. Instalar Dependências

```
  npm install
```

### 2. Rodar o Projeto em Desenvolvimento

```
  npm run dev
```

---

## 🎯 Objetivos do Projeto

Este projeto foi desenvolvido com o propósito de consolidar conceitos fundamentais do ecossistema **Vue 3**. O foco principal foi a aplicação prática de:

- **Composition API**: Transição da Options API para um modelo mais flexível e reutilizável de organização de código através do <script setup>.
- **Sincronização de Estado**: Uso de v-model para criar bindings bidirecionais eficientes, permitindo que a interface reaja instantaneamente aos inputs do usuário em objetos reativos.
- **Observabilidade do Lifecycle**: A criação de um componente de log dedicado permitiu entender visualmente a ordem de execução do Vue, desde a montagem até a destruição de um elemento no DOM.
- **Modularização de Componentes**: Divisão da interface em seções independentes (Counter, User, Communication, Lifecycle), garantindo que cada parte da aplicação tenha uma responsabilidade única e clara, facilitando a manutenção e a escalabilidade do código.

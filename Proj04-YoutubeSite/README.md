# 🎥 YouTube Clone

Este projeto consiste na **reconstrução da interface do YouTube**, desenvolvida com o objetivo de aprofundar conhecimentos em **HTML5 semântico, CSS3 moderno (Flexbox/Grid)** e **JavaScript Vanilla**.

O foco principal foi a **fidelidade visual e a experiência do usuário**, replicando comportamentos complexos da plataforma original.

---

# 🚀 Tecnologias Utilizadas

- **HTML5**  
  Estruturação semântica para melhor acessibilidade e SEO.

- **CSS3**  
  Uso de variáveis nativas (`:root`), animações complexas com `cubic-bezier` e arquitetura baseada em componentes.

- **JavaScript (ES6+)**  
  Manipulação dinâmica do DOM, controle de estados do menu e lógica de renderização de vídeo.

- **Docker**  
  Conteinerização da aplicação utilizando **Nginx** para servir os arquivos estáticos.

---

# 🛠️ Desafios Técnicos e Soluções

## 📂 Menu Lateral Responsivo

O maior desafio deste projeto foi a implementação do **menu lateral (Sidebar)**.

Diferente de menus simples, o YouTube exige que a barra lateral **altere o fluxo de toda a página (main content)**, o que dificultava a manutenção das proporções dos elementos internos.

### ✅ Solução

Implementação de um sistema de **margens dinâmicas sincronizadas via JavaScript e CSS Transitions**.

Utilizamos **cálculos em tempo real** para garantir que o conteúdo principal e o menu se movessem como **uma peça única**, evitando quebras de layout.

---

## 🖼️ Proporção de Imagem e Texto

Manter a **descrição do vídeo em destaque sempre alinhada à altura da thumbnail**, independentemente do redimensionamento da janela.

### ✅ Solução

- Aplicação de `aspect-ratio: 16/9` nas imagens
- Cálculo dinâmico via **JavaScript** para limitar o `max-height` do container de texto
- Utilização de **`line-clamp`** para um corte elegante da descrição

---

# 📱 Abordagem Mobile-First

O projeto foi desenvolvido seguindo a filosofia **Mobile-First**, garantindo uma interface otimizada para dispositivos móveis antes da expansão para desktops.

A transição entre as visualizações é feita através de **Media Queries estratégicas**, adaptando a **grade de vídeos de 1 até 6 colunas** conforme a largura da tela.

---

# 🐳 Como Executar com Docker

Certifique-se de ter **Docker** e **Docker Compose** instalados em sua máquina.

## 1️⃣ Clone o repositório

```bash
git clone https://github.com/seu-usuario/youtube-clone.git
```

## 2️⃣ Execute o projeto

```bash
docker compose up --build
```

Acesse `http://localhost:8080` no seu navegador para ver a melhor cópia do YouTube!

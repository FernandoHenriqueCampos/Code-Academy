# 🎵 Music Player - Vanilla JavaScript

Um player de música elegante, funcional e responsivo, desenvolvido com tecnologias web puras. Este projeto simula as principais funcionalidades de serviços de streaming, como controle de reprodução, sistema de "curtir" com persistência de dados e modo aleatório.

## ✨ Funcionalidades

- **Controle de Reprodução:** Play, pause, próxima música e música anterior.
- **Barra de Progresso Interativa:** Visualize o andamento da música e clique na barra para saltar para um trecho específico.
- **Timer Dinâmico:** Exibição em tempo real do tempo atual e da duração total da faixa.
- **Modo Shuffle (Aleatório):** Algoritmo para embaralhar a playlist sem repetir músicas até que o ciclo termine.
- **Modo Repeat:** Opção para repetir a faixa atual em loop.
- **Sistema de Likes:** Marque suas músicas favoritas. O estado de "curtido" é salvo no navegador e não se perde ao atualizar a página.
- **Design Responsivo:** Adaptado para telas de desktop, tablets e dispositivos móveis.

## 🚀 Tecnologias Utilizadas

- **HTML5:** Estrutura semântica e API de Áudio.
- **CSS3:** Estilização com variáveis CSS, Flexbox e animações.
- **JavaScript (ES6+):** Lógica de manipulação de DOM, eventos e persistência.
- **Bootstrap Icons:** Biblioteca de ícones vetoriais.
- **Local Storage:** Para salvar as preferências do usuário (músicas curtidas).

## 📂 Estrutura de Arquivos

- `index.html`: Estrutura principal e elementos de áudio.
- `style.css`: Estilização e media queries para responsividade.
- `script.js`: Toda a lógica de funcionamento, incluindo o algoritmo de shuffle e formatação de tempo.
- `/assets`: Pasta contendo os arquivos `.mp3` e as imagens de capa.

## 📝 Notas Técnicas

O projeto utiliza o algoritmo de **Fisher-Yates** para o embaralhamento da playlist, garantindo uma distribuição verdadeiramente aleatória. A formatação do tempo é feita via código para converter segundos brutos da propriedade `currentTime` em um formato amigável `MM:SS`.

---

Desenvolvido por **Fernando Henrique** 🎧

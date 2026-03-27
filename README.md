# Snake Game

Aqui vai um jogo simples inspirado no Snake Game clássico desenvolvido utilizando **HTML, CSS e JavaScript puro**. A lógica é a cobra ser uma lista de posições que vai aumentando gradativamente conforme vai colidindo com com objetos específicos no Canvas.

---

## Lógica do Jogo

### Movimento

A cobra se move continuamente em uma direção definida pelas teclas:

* ⬅️ Esquerda
* ➡️ Direita
* ⬆️ Cima
* ⬇️ Baixo

---

### Comida Padrão

* Aparece em posições aleatórias no canvas
* Ao ser consumida:

  * A cobra cresce;
  * Pontuação +10;
  * Nova comida é gerada em outra posição aleátória (manos na cabeça da cobra);

---

### Comida Especial

* Surge após um tempo aleatório após atingir 30 pontos;
* Fica ativa por alguns segundos;
* Possuí uma coloração dinâmica aleatória para diferenciar da comida normal;
* Ao ser consumida:
  * Pontuação +100;
  * Cobra cresce mais 5 "posições";

---

### Colisões

O jogo só termina quando:
* A cobra colide com ela mesma (padrão)
* A cobra bate na parede do canvas;

---

### Game Over

* Tela de Game Over exibida quando colição detectada;
* Canvas desfocado (blur)
* Opção de reiniciar o jogo

---

## Linguagens utilizadas

* **HTML5** → estrutura da aplicação;
* **CSS3** → estilização e layout;
* **JavaScript** → lógica do jogo;

---

## Estrutura do Projeto

```bash
📦 snake-game
 ┣ 📜 index.html
 ┣ 📜 style.css
 ┣ 📜 game.js
 ┗ 📁 assets
    ┣ 🎵 eat song.mp3
    ┣ 🎵 gameOver song.wav
    ┗ 🎵 special eat song.wav
```

---

## ▶️ Como executar

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/snake-game.git
```

2. Abra o arquivo `index.html` no navegador:

```bash
double click em index.html
```

ou use extensão como **Live Server** no VSCode.

---

## Controles

| Tecla | Ação                |
| ----- | ------------------- |
| ↑     | Mover para cima     |
| ↓     | Mover para baixo    |
| ←     | Mover para esquerda |
| →     | Mover para direita  |

---

## Observações

* O jogo utiliza um **grid baseado em múltiplos de 14px**
* A posição dos elementos é sempre alinhada ao grid
* A velocidade do jogo é controlada por `setTimeout`

---

## Possíveis melhorias

*  Sistema de níveis/Fases (pontuação máxima para cada fase);
*  IA para bot-player;
*  Salvar high score (LocalStorage);
*  Possível versão mobile (touch);

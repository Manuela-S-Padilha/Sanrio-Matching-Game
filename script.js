const personagens = [
  "hello-kitty", "cinnamoroll", "my-melody", "kuromi", "pompourin",
  "bad-badtz-maru", "chococat", "keroppi", "mimmy", "pochacco"
];

let cartas = [...personagens, ...personagens]; // Duplicar para pares
cartas = cartas.sort(() => Math.random() - 0.5); // Embaralhar

const board = document.getElementById("game-board");

let cartaVirada = false;
let primeiraCarta, segundaCarta;
let trava = false;

function criarCarta(personagem) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <img src="imagens/${personagem}.png" alt="${personagem}" width="100" height="100">
      </div>
      <div class="card-back">🎀</div>
    </div>
  `;

  card.addEventListener("click", () => {
    if (trava || card.classList.contains("flipped")) return;

    card.classList.add("flipped");

    if (!cartaVirada) {
      cartaVirada = true;
      primeiraCarta = card;
      return;
    }

    segundaCarta = card;
    cartaVirada = false;

    verificarPar();
  });

  board.appendChild(card);
}

function verificarPar() {
  let personagem1 = primeiraCarta.querySelector("img").alt;
  let personagem2 = segundaCarta.querySelector("img").alt;

  if (personagem1 === personagem2) {
    primeiraCarta = null;
    segundaCarta = null;
  } else {
    trava = true;
    setTimeout(() => {
      primeiraCarta.classList.remove("flipped");
      segundaCarta.classList.remove("flipped");
      primeiraCarta = null;
      segundaCarta = null;
      trava = false;
    }, 1000);
  }
}

cartas.forEach(personagem => criarCarta(personagem));

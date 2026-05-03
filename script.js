//TYPEWRITER
const frases = [
  "D' AVILLAS FEST",
  "UM ESPAÇO PENSADO PARA VOCÊ",
  "AGENDE AGORA",
];

const elemento = document.getElementById("typing");

let fraseIndex = 0;
let charIndex = 0;
let apagando = false;

function typeEffect() {
  const fraseAtual = frases[fraseIndex];

  if (!apagando) {
    elemento.textContent = fraseAtual.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === fraseAtual.length) {
      apagando = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    elemento.textContent = fraseAtual.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      apagando = false;
      fraseIndex = (fraseIndex + 1) % frases.length;
    }
  }

  setTimeout(typeEffect, apagando ? 50 : 100);
}

typeEffect();

//CARROSSEL
const carouselTrack = document.querySelector(".carousel-track");
const carouselContainer = document.querySelector(".carousel-container");
let images = [...document.querySelectorAll(".carousel-image")];

images.forEach((img) => {
  const clone = img.cloneNode(true);
  clone.classList.add("clone");
  carouselTrack.insertBefore(clone, carouselTrack.firstChild);
});

images = [...carouselTrack.querySelectorAll(".carousel-image")];

function waitImagesLoaded(imgEls) {
  return Promise.all(
    imgEls.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((res) => {
        img.addEventListener("load", res, { once: true });
        img.addEventListener("error", res, { once: true });
      });
    }),
  );
}

const allImgs = [...carouselTrack.querySelectorAll(".carousel-image")];

waitImagesLoaded(allImgs).then(() => {
  carouselTrack.style.animationPlayState = "running";
});

const modalOverlay = document.querySelector(".modal-overlay");
const modalImage = document.querySelector(".modal-image");
const closeButton = document.querySelector(".close-button");

let isZoomed = false;

function pauseCarousel() {
  carouselTrack.style.animationPlayState = "paused";
}

function playCarousel() {
  if (!isZoomed) carouselTrack.style.animationPlayState = "running";
}

carouselContainer.addEventListener("mouseenter", pauseCarousel);
carouselContainer.addEventListener("mouseleave", playCarousel);

function openModal(src) {
  pauseCarousel();
  isZoomed = true;
  modalImage.src = src;
  modalOverlay.style.display = "flex";
  modalOverlay.offsetHeight;
  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "";

  setTimeout(() => {
    modalOverlay.style.display = "none";
    modalImage.src = "";
    isZoomed = false;
    playCarousel();
  }, 400);
}

images.forEach((img) => {
  img.addEventListener("click", () => openModal(img.src));
});

closeButton.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

const stars = document.querySelectorAll(".star");
const ratingText = document.getElementById("selected-rating");

let estrelasSelecionadas = 0;
let lastClickedIndex = 0;

stars.forEach((star) => {
  star.addEventListener("click", () => {
    const index = Number(star.dataset.index);

    if (index === lastClickedIndex) {
      stars.forEach((s) => s.classList.remove("active"));
      estrelasSelecionadas = 0;
      lastClickedIndex = 0;
      ratingText.textContent = "0 de 5";
      return;
    }

    stars.forEach((s) => s.classList.remove("active"));
    for (let i = 0; i < index; i++) stars[i].classList.add("active");

    estrelasSelecionadas = index;
    lastClickedIndex = index;
    ratingText.textContent = `${index} de 5`;
  });
});

//FILTROS
const BANNED_WORDS = [
  "porra",
  "caralho",
  "cacete",
  "merda",
  "bosta",
  "buceta",
  "pau",
  "pinto",
  "rola",
  "cu",
  "cú",
  "desgraça",
  "desgraçada",
  "desgraçado",
  "gay",
  "gayzinho",
  "viado",
  "viadinho",
  "homossexual",
  "tchola",
  "bixa",
  "bixinha",
  "vadia",
  "cachorra",
  "foda",
  "foder",
  "fodase",
  "foda-se",
  "fode",
  "fodi",
  "fudido",
  "fudida",
  "fuder",
  "fudendo",
  "idiota",
  "imbecil",
  "babaca",
  "otario",
  "otário",
  "burro",
  "burra",
  "retardado",
  "retardada",
  "inutil",
  "inútil",
  "lixo",
  "nojento",
  "nojenta",
  "verme",
  "desgraçado",
  "desgraçada",
  "maldito",
  "maldita",
  "miseravel",
  "miserável",
  "infeliz",
  "escroto",
  "escrota",
  "trouxa",
  "palhaço",
  "palhaça",
  "ridiculo",
  "ridícula",
  "ridículo",
  "patetico",
  "patético",
  "puta",
  "puto",
  "piranha",
  "vagabunda",
  "vagabundo",
  "vadio",
  "vadia",
  "piriguete",
  "safado",
  "safada",
  "corno",
  "cornão",
  "cornuda",
  "chifrudo",
  "chifruda",
  "arrombado",
  "arrombada",
  "fdp",
  "sirigaita",
  "prostituta",
  "negro",
  "negra",
  "preta",
  "preto",
  "macaco",
  "imundo",
  "demonio",
  "diabo",
  "capeta",
  "autista",
  "cachorro",
];

const BANNED_PHRASES = [
  "vai tomar no cu",
  "vai tomar no cú",
  "tomar no cu",
  "tomar no cú",
  "vai se foder",
  "vai se ferrar",
  "vai pra merda",
  "filho da puta",
  "filha da puta",
  "pau no cu",
  "pau-no-cu",
];

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function censorDangerChars(text) {
  const dangerCharsRegex = /[<>"'`&{}[\]()#^*+=|\\/~-]/g;
  return text.replace(dangerCharsRegex, "***");
}

function censorBadWords(text) {
  let result = text;

  for (const phrase of BANNED_PHRASES) {
    const re = new RegExp(escapeRegex(phrase), "gi");
    result = result.replace(re, "***");
  }

  for (const word of BANNED_WORDS) {
    const re = new RegExp(`\\b${escapeRegex(word)}\\b`, "gi");
    result = result.replace(re, "***");
  }

  return result;
}

function aplicarFiltros(text) {
  let t = (text ?? "").toString().trim();
  t = censorDangerChars(t);
  t = censorBadWords(t);
  return t;
}

//AVALIAÇÕES
let paginaAtual = 1;
const porPagina = 8;

const form = document.getElementById("formAvaliacao");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let nome = document.getElementById("nomeAvaliador").value.trim();
  let texto = document.getElementById("textoAvaliacao").value.trim();

  if (!nome || !texto || estrelasSelecionadas === 0) {
    alert("Preencha o nome, selecione as estrelas e escreva a avaliação.");
    return;
  }

  nome = aplicarFiltros(nome);
  texto = aplicarFiltros(texto);

  const novaAvaliacao = {
    nome,
    texto,
    estrelas: estrelasSelecionadas,
    data: Date.now(),
  };

  const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
  avaliacoes.push(novaAvaliacao);
  localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));

  form.reset();
  estrelasSelecionadas = 0;
  lastClickedIndex = 0;
  ratingText.textContent = "0 de 5";
  stars.forEach((s) => s.classList.remove("active"));

  paginaAtual = 1;
  renderizarAvaliacoes();
  mostrarToast();
});

function renderizarAvaliacoes() {
  const grid = document.getElementById("reviewsGrid");
  const totalSpan = document.getElementById("currentPage");

  let avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];

  avaliacoes.sort((a, b) => {
    if (b.estrelas !== a.estrelas) return b.estrelas - a.estrelas;
    return b.data - a.data;
  });

  const totalPaginas = Math.ceil(avaliacoes.length / porPagina);
  paginaAtual = Math.min(paginaAtual, totalPaginas || 1);

  const inicio = (paginaAtual - 1) * porPagina;
  const fim = inicio + porPagina;

  const avaliacoesPagina = avaliacoes.slice(inicio, fim);

  grid.innerHTML = "";
  grid.className = "reviews-grid";

  if (avaliacoesPagina.length === 1) grid.classList.add("grid-1");
  if (avaliacoesPagina.length === 2) grid.classList.add("grid-2");
  if (avaliacoesPagina.length === 3) grid.classList.add("grid-3");

  avaliacoesPagina.forEach((av) => {
    const card = document.createElement("div");
    card.className = "review-card";

    card.innerHTML = `
      <div class="review-header">
        <div class="review-avatar"></div>
        <div class="review-name">${av.nome}</div>
      </div>

      <div class="review-stars">
        ${"⭐".repeat(av.estrelas)}${"☆".repeat(5 - av.estrelas)}
      </div>

      <div class="review-text">${av.texto}</div>
    `;

    grid.appendChild(card);
  });

  totalSpan.textContent = paginaAtual;
  document.getElementById("prevPage").disabled = paginaAtual === 1;
  document.getElementById("nextPage").disabled =
    paginaAtual === totalPaginas || totalPaginas === 0;
}

document.getElementById("prevPage").addEventListener("click", () => {
  if (paginaAtual > 1) {
    paginaAtual--;
    renderizarAvaliacoes();
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  paginaAtual++;
  renderizarAvaliacoes();
});

function mostrarToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

document.addEventListener("DOMContentLoaded", renderizarAvaliacoes);

const imagensGaleria = document.querySelectorAll(".galeria-img");

imagensGaleria.forEach((img) => {
  img.addEventListener("click", () => {
    openModal(img.src);
  });
});

document.querySelectorAll(".footer-link").forEach((link) => {
  link.addEventListener("click", () => {
    link.setAttribute("target", "_blank");
  });
});

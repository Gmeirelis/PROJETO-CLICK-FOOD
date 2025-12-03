

/** carrosel **/


let index = 0;
const slides = document.querySelectorAll(".slide");

function trocarSlide() {
  index++;
  if (index >= slides.length) index = 0;

  document.querySelector(".slides").style.transform =
    `translateX(${-index * 100}%)`;
}

setInterval(trocarSlide, 4000);




/*busca por restaurante */

  const filtro = document.getElementById("filtro");
const restaurantes = document.querySelectorAll(".restaurante");

filtro.addEventListener("input", function () {
  const texto = filtro.value.toLowerCase();

  restaurantes.forEach(restaurante => {
    const nome = restaurante.querySelector("h3").textContent.toLowerCase();

    // Se o nome inclui o texto digitado → mostra
    if (nome.includes(texto)) {
      restaurante.style.display = "block";
    } else {
      restaurante.style.display = "none";
    }
  });
});

/***************filtros******** */
const btnDistancia = document.getElementById("distancia-btn");
const menuDistancia = document.getElementById("menu-distancia");

const tempobtn = document.getElementById("tempo-btn");
const menuFiltro = document.getElementById("menu-filtro");

// Abrir/fechar DISTÂNCIA
btnDistancia.addEventListener("click", () => {
  menuDistancia.style.display =
    menuDistancia.style.display === "block" ? "none" : "block";

  menuFiltro.style.display = "none"; // fecha o outro menu
});

// Abrir/fechar TEMPO
tempobtn.addEventListener("click", () => {
  menuFiltro.style.display =
    menuFiltro.style.display === "block" ? "none" : "block";

  menuDistancia.style.display = "none"; // fecha o outro menu
});



// abrir/fechar avaliaçao 
s





// Clique nas opções
document.querySelectorAll(".dropdown-menu input, .tempo-filtro input")
  .forEach(caixa => {
    caixa.addEventListener("change", () => {
      console.log("Marcado:", caixa.value);
    });
  });

// Fechar menus ao clicar fora
document.addEventListener("click", (e) => {

  const clicouDistancia = e.target.closest("#distancia-btn") || e.target.closest("#menu-distancia");
  const clicouTempo = e.target.closest("#tempo-btn") || e.target.closest("#menu-filtro");

  if (!clicouDistancia) menuDistancia.style.display = "none";
  if (!clicouTempo) menuFiltro.style.display = "none";

});


 
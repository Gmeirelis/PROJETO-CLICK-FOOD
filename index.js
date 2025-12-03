

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

// abrir / fechar o menu
btnDistancia.addEventListener("click", () => {
  menuDistancia.style.display =
    menuDistancia.style.display === "block" ? "none" : "block";
});

// clicar em uma opção
menuDistancia.querySelectorAll("input").forEach(caixa => {
  caixa.addEventListener("change", () => {
    console.log("Marcado:", caixa.value);
  });
});

// fechar ao clicar fora
document.addEventListener("click", (e) => {
  if (!e.target.closest("#distancia-btn") && !e.target.closest("#menu-distancia")) {
    menuDistancia.style.display = "none";
  }
});





 
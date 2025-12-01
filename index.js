

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



 
const slides = document.querySelectorAll(".slide");
let currentIndex = 0;

function nextSlide() {
  slides[currentIndex].removeAttribute("data-active");
  currentIndex = (currentIndex + 1) % slides.length;
  slides[currentIndex].setAttribute("data-active", "");
}

setInterval(nextSlide, 3000);


/* filtro busca*/

const campoFiltro = document.getElementById('filtro');
  const restaurantes = document.querySelectorAll('.restaurante');

  campoFiltro.addEventListener('keyup', () => {
    const texto = campoFiltro.value.toLowerCase();

    restaurantes.forEach(restaurante => {
      const nome = restaurante.querySelector('h3').textContent.toLowerCase();

     if (nome.includes(texto)) {
  restaurante.style.removeProperty("display");
} else {
  restaurante.style.display = "none";
}
    });
  });

  


 
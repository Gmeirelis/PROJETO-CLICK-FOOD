

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


 

  /*********filtro resturante API **********************************/
 let restaurantes = []

 fetch('./restaurante.json').then(Response => Response.json()).then(dados =>{

    restaurantes = dados 
    renderizarRestaurantes(restaurantes);
 })

 /* Função para renderizar restaurantes*/

 function renderizarRestaurantes(lista) {
  const container = document.getElementById("lista-restaurantes"); // ele faza busca do elemento if
  container.innerHTML = ""; // limpa o conatiner,se a função for chamada de novo, ela não duplique a lista inteira, mas sim substitua pela nova.

  lista.forEach(restaurante => { // vai percorrer para cada item dentro da array
    const card = document.createElement("div");//cria um novo elemento div
    card.classList.add("restaurante");//Adiciona a classe CSS "restaurante", permitindo que estilize esse cartão depois.

     //define o que vai aparecer dentro da div.
    card.innerHTML = `                                            
      ${restaurante.link ? `<a href="${restaurante.link}">` : ""}
        <img src="${restaurante.imagem}" alt="${restaurante.nome}">
        <h3>${restaurante.nome}</h3>
        <p>⭐ ${restaurante.nota} • ${restaurante.categoria} • ${restaurante.tempo}</p>
      ${restaurante.link ? `</a>` : ""}
    `;//Ele puxa as informações dinâmicas: ${restaurante.imagem}, ${restaurante.nome}, ${restaurante.nota}, etc

    container.appendChild(card);//o comando appendChild pega aquela div que foi montada na memória e a coloca fisicamente dentro do container no seu site.
  });
}


/* função para limpar a barra de pesquisa*/
const campoBusca = document.getElementById("campo-busca"); //O código localiza o campo de digitação (o <input>) no seu HTML através do ID dele.

campoBusca.addEventListener("input", () => { //O evento input é disparado toda vez que você pressiona uma tecla ou apaga uma letra.
  const termo = campoBusca.value.toLowerCase();//permite que a busca seja instantânea, sem precisar clicar em um botão de "procurar".
//transforma tudo em letras minúsculas.

  const filtrados = restaurantes.filter(restaurante =>
    restaurante.nome.toLowerCase().includes(termo) //Ele percorre o array original restaurantes e cria uma nova lista apenas 
    // com os itens que passarem no teste.
    //.includes(termo): Ele verifica se o nome do restaurante contém o pedaço de texto que você digitou. 
    // Por exemplo, se você digitar "Mc", o filtro manterá o "McDonald's".
  );

  renderizarRestaurantes(filtrados); //chama filtrados
});
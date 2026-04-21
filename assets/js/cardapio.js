const params = new URLSearchParams(window.location.search);
const idRestaurante = params.get("id");

console.log("ID recebido:", idRestaurante);


let restaurante = null;
let categoriaAtiva = "todos";

async function buscarDados() {
  try {
    const response = await fetch("../restaurante.json");
    
    // É importante verificar se a requisição foi bem sucedida (status 200-299)
    if (!response.ok) {
      throw new Error(`Erro ao carregar o JSON: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na busca de dados:", error);
  }
}


async function init() {
  const dados = await buscarDados();
  restaurante = dados.find(d => d.id == idRestaurante);

  renderizarHome();
  renderizarFiltros();
  renderizarCardapio();
}



function renderizarHome() {
  const home = document.querySelector(".container-restaurante");

  home.innerHTML = `
    <img src="${restaurante.imagem}" alt="${restaurante.nome}">
    <div class="titulo">
      <h2>${restaurante.nome}</h2>
      <p>
        <i class="fa-solid fa-utensils"></i>
        ${restaurante.tipo}
      </p>
    </div>
  `;
}
function renderizarFiltros() {
  const filtros = document.querySelector('.container-categorias');
  const categorias = restaurante.cardapio || [];

  let html = `<a data-categoria="todos">Todos</a>`;

  categorias.forEach(cat => {
    html += `
      <a data-categoria="${cat.categoria}">
        ${cat.categoria}
      </a>
    `;
  });

  filtros.innerHTML = html;

  adicionarEventosFiltros(); 
}

function adicionarEventosFiltros() {
  const botoes = document.querySelectorAll('.container-categorias a');

  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      categoriaAtiva = botao.dataset.categoria;

      renderizarCardapio(); 
    });
  });
}

function renderizarCardapio() {
  const container = document.querySelector('.cardapio-container');

  let html = "";

  restaurante.cardapio.forEach(categoria => {

    if (categoriaAtiva !== "todos" && categoria.categoria !== categoriaAtiva) {
      return;
    }

    html += `
      <div class="categoria" id="${categoria.categoria}">
        <h1>${categoria.categoria}</h1>
    `;

    categoria.itens.forEach(item => {
      html += `
      <section class="cardapio">
        <div class="cardapio-item">
          <img src="${item.imagem || ''}">
          <div class="cardapio-info">
            <h2>${item.nome}</h2>
            <p>${item.descricao || ''}</p>
            <h3> ${Number(item.valor).toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL'
}) || ''}</h3>
             <button onclick="adicionarAoCarrinho(${item.id})">Adicionar</button>
          </div>
        </div>
        </section>
      `;
    });

    html += `</div>`;
  });

  container.innerHTML = html;
}

init();

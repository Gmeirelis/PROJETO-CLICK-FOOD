

let restaurantes = [];

async function carregarDados() {
  try {
    const resposta = await fetch("../restaurante.json");
    if (!resposta.ok) {
      throw new Error(`Erro HTTP! status: ${resposta.status}`);
    }
    const data = await resposta.json();

    restaurantes = data;
    console.log("Restaurantes carregados ", restaurantes);
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
}

carregarDados();

function adicionarAoCarrinho(id) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let itemSelecionado = null;

  restaurantes.forEach((restaurante) => {
    if (!restaurante.cardapio) return;

    restaurante.cardapio.forEach((categoria) => {
      categoria.itens.forEach((item) => {
        if (item.id === id) {
          itemSelecionado = {
            ...item,
            restaurante: restaurante.nome,
          };
        }
      });
    });
  });

  if (!itemSelecionado) {
    console.log("Item não encontrado no JSON carregado.");
    return;
  }

  carrinho.push(itemSelecionado);

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  window.location.href = "../pages/pedido.html";
}

if (window.location.pathname.includes("../pages/pedido.html")) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const lista = document.getElementById("lista");
  const totalEl = document.getElementById("total");

  let total = 0;

  carrinho.forEach((item) => {
    total += item.valor;

    lista.innerHTML += `
  <div class="item-pedido">

  <div class = img-pedidos>
   <img src="${item.imagem}">
   </div>
   
   <div class = detalhes-pedidos>
    <h4>${item.nome}</h4>
    <p class="nome-res">${item.restaurante}</p>
    <p>${item.descricao}</p>
    <p class="valor">
      ${item.valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}
    </p>
   
  </div>
  </div>
`;
  });

  if (totalEl) {
    totalEl.innerText = total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
}

/****apagar todos os pedidos pedidos */

const botao = document.querySelector("#btn-apagar");
const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function limparCarrinho() {
  localStorage.removeItem("carrinho");
  location.reload();
}

if (carrinho.length === 0 && botao) {
  botao.classList.add("none");
}

/* texto qunado o item e add ou quando nao tem item */

const texto = document.querySelector(".titulos");
const containerTexto = document.querySelector(".status");

if (carrinho.length === 0) {
  texto.innerHTML = "Nenhum item adicionado";
  containerTexto.classList.remove("none");
} else {
  containerTexto.classList.add("none");
}

const resumo = document.querySelector(".container-resumo");

function sumirResumo() {
  if (carrinho.length === 0) {
    resumo.classList.add("none");
  }
}

sumirResumo();

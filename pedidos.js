let restaurantes = [];

async function carregarDados() {
  try {
   
    const resposta = await fetch("./restaurante.json"); 
    if (!resposta.ok) throw new Error(`Erro HTTP! status: ${resposta.status}`);
    restaurantes = await resposta.json();
    console.log("Restaurantes carregados", restaurantes);
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
}

carregarDados();

//--- FUNÇÃO ADICIONAR ---
function adicionarAoCarrinho(id) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  let itemSelecionado = null;

  restaurantes.forEach((restaurante) => {
    if (!restaurante.cardapio) return;
    restaurante.cardapio.forEach((categoria) => {
      categoria.itens.forEach((item) => {
        if (item.id === id) {
          itemSelecionado = { ...item, restaurante: restaurante.nome };
        }
      });
    });
  });

  if (!itemSelecionado) return;

  carrinho.push(itemSelecionado);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  window.location.href = ".pedido.html"; // Caminho simplificado
}

// --- LÓGICA DA PÁGINA DE PEDIDOS ---
// Mudança aqui: verificamos se o elemento 'lista' existe na página em vez de olhar a URL
const lista = document.getElementById("lista");
const totalEl = document.getElementById("total");
const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

if (lista) {
  let total = 0;
  lista.innerHTML = ""; // Limpa a lista antes de preencher

  carrinho.forEach((item) => {
    total += item.valor;
    lista.innerHTML += `
      <div class="item-pedido">
        <div class="img-pedidos"><img src="${item.imagem}"></div>
        <div class="detalhes-pedidos">
          <h4>${item.nome}</h4>
          <p class="nome-res">${item.restaurante}</p>
          <p>${item.descricao}</p>
          <p class="valor">${item.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
        </div>
      </div>`;
  });

  if (totalEl) {
    totalEl.innerText = total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }
}

// --- BOTÃO APAGAR ---
const botaoApagar = document.querySelector("#btn-apagar");
if (botaoApagar && carrinho.length === 0) {
  botaoApagar.style.display = "none";
}

function limparCarrinho() {
  localStorage.removeItem("carrinho");
  location.reload();
}

// --- STATUS DO CARRINHO (Texto vazio) ---
const textoStatus = document.querySelector(".titulos");
const containerStatus = document.querySelector(".status");

if (textoStatus && containerStatus) {
  if (carrinho.length === 0) {
    textoStatus.innerHTML = "Nenhum item adicionado";
    containerStatus.classList.remove("none");
  } else {
    containerStatus.classList.add("none");
  }
}

// --- RESUMO ---
const resumo = document.querySelector(".container-resumo");
if (resumo && carrinho.length === 0) {
  resumo.classList.add("none");
}

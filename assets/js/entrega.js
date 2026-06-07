const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

console.log(carrinho);

function detalhes() {
  const renderizar = document.querySelector(".renderizar");

  let inical = 0;
  carrinho.forEach((carrinhos) => {
    inical += carrinhos.valor;
  });

  const itens = carrinho
    .map((item) => {
      return `<p>${item.nome} - ${item.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>`;
    })
    .join(" ");

  renderizar.innerHTML = `
  
<div>
<h3>Numero do pedido:</h3>
<p>#20250</p>
</div>
<div>
<h3>Estimativa de entrega:</h3>
<p>1h-3h</p>
</div>

<div class="item">
<h3>Itens:</h3>
  ${itens}
</div>

<div>
<h3> Valor total:</h3>
<p>${inical.toFixed(2)}R$</P>
</div>


`;
}

detalhes();

/*load*/

function atualizarStatus(passo) {
  const etapas = document.querySelectorAll(".etapa");
  const linha = document.querySelector(".linha");

  etapas.forEach((etapa, index) => {
    if (index <= passo) {
      etapa.classList.add("ativa");
    } else {
      etapa.classList.remove("ativa");
    }
  });

  const progresso = (passo / (etapas.length - 1)) * 100;
  linha.style.setProperty("--progresso", progresso + "%");
}
// fluxo automático
function iniciarFluxo() {
  atualizarStatus(0); // Confirmado

  setTimeout(() => {
    atualizarStatus(1); // Preparando

    setTimeout(() => {
      atualizarStatus(2); // Saiu para entrega
    }, 4000);
  }, 4000);
}

iniciarFluxo();


const btn = document.querySelector(".btn-voltar");



btn.addEventListener("click", apagar);

function apagar() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const total = carrinho.reduce(
    (acc, item) => acc + (item.valor * (item.qtd || 1)),
    0
  );

  const dados = {
    id: Date.now(),
    valor: total,
    data: new Date().toLocaleString(),
    status: "entregue",
    itens: carrinho.map((item) => ({
      restaurante: item.restaurante,
      imagem:item.imagem,
      nome: item.nome,
      valor: item.valor,
      qtd: item.qtd || 1,
    })),
  };

  const historico = JSON.parse(localStorage.getItem("historico")) || [];

  historico.push(dados);

  localStorage.setItem("historico", JSON.stringify(historico));

  localStorage.removeItem("carrinho");

  window.location.href = "../index.html";
}
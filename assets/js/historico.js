
const historico = JSON.parse(localStorage.getItem("historico")) || [];
 
function renderizarRestaurante() {
  const renderizar = document.querySelector(".renderizar");
 
  const dadosHistorico = historico.carrinho;
 
  if (!dadosHistorico || dadosHistorico.length === 0) {
    renderizar.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-bag-shopping"></i>
        <p>Nenhum pedido realizado ainda</p>
      </div>
    `;
    return;
  }
 
  dadosHistorico.forEach((item) => {
    console.log(item);
    
    const nomeItem = item.nome;
    const quantidade = item.quantidade || 1;
    const restaurante = item.restaurante;
    const valor = item.valor;
    
    const manipulacaoValor = valor.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
 
    const data = new Date().toLocaleDateString("pt-BR");
    
    // Gerar cor de badge baseada no restaurante (consistente)
    const badgeColor = gerarCorBadge(restaurante);
 
    renderizar.innerHTML += `
      <div class="card-pedidos">
        <div class="card-header">
          <div class="card-info">
            <h4 class="card-titulo">${nomeItem} ${quantidade}x</h4>
            <span class="badge" style="background-color: ${badgeColor.bg}; color: ${badgeColor.text};">
              ${restaurante}
            </span>
          </div>
          <div class="card-preco">
            <p class="valor">R$ ${manipulacaoValor}</p>
            <p class="data">Hoje</p>
          </div>
        </div>
        
        <div class="card-detalhes">
          <p class="data-completa">Realizado em ${data}</p>
        </div>
 
        <div class="card-acoes">
          <button class="btn-acao btn-recomprar" onclick="recomprar('${nomeItem}', ${quantidade}, '${restaurante}', ${valor})">
            <i class="fa-solid fa-arrow-rotate-left"></i>
            Recomprar
          </button>
          <button class="btn-acao btn-avaliar" onclick="avaliar('${nomeItem}')">
            <i class="fa-solid fa-star"></i>
            Avaliar
          </button>
        </div>
      </div>
    `;
  });
}
 
// Função para gerar cores de badge consistentes por restaurante
function gerarCorBadge(restaurante) {
  const cores = [
    { bg: "#FFE4CC", text: "#A65100" }, // Laranja
    { bg: "#CCE5FF", text: "#004DA6" }, // Azul
    { bg: "#D4EDDA", text: "#155724" }, // Verde
    { bg: "#FCE4EC", text: "#C2185B" }, // Rosa
    { bg: "#FFF3E0", text: "#E65100" }, // Laranja claro
  ];
 
  // Gerar hash do restaurante para determinar cor consistentemente
  let hash = 0;
  for (let i = 0; i < restaurante.length; i++) {
    hash = restaurante.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % cores.length;
  return cores[colorIndex];
}
 
// Função para recomprar um item
function recomprar(nome, quantidade, restaurante, valor) {
  alert(`Adicionando ${quantidade}x ${nome} do ${restaurante} ao carrinho!`);
  // Aqui você pode implementar a lógica de adicionar ao carrinho
}
 
// Função para avaliar um item
function avaliar(nome) {
  alert(`Avaliando ${nome}...`);
  // Aqui você pode implementar a lógica de avaliação
}
 
renderizarRestaurante();
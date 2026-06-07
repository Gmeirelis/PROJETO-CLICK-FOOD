const historico = JSON.parse(localStorage.getItem("historico")) || [];

function renderizarRestaurante() {
  const renderizar = document.querySelector(".renderizar");

  const dadosHistorico = historico;

  dadosHistorico.forEach((item) => {
    const itens = item.itens;

    itens.forEach((historico) => {
      renderizar.innerHTML += `
       <div class="card-pedidos">
       
     <h4> ${historico.nome} ${historico.qtd}x</h4>
     <p style='font-siez:5px'>${historico.restaurante}</p>
     <p>${historico.valor}R$</p>
     <p>${item.status}</p>
     <p>${item.data}</p>
     </div>
     
     `;
    });
  });
}

renderizarRestaurante();

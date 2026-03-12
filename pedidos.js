let restaurantes = []

fetch("restaurante.json")
  .then(res => res.json())
  .then(data => {
    restaurantes = data
    
  })
  

function adicionarAoCarrinho(id) {

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || []


let itemSelecionado = null

  restaurantes.forEach(restaurante =>{

   if(!restaurante.cardapio) return  
  
   restaurante.cardapio.forEach(categoria =>{
     
    categoria.itens.forEach(item =>{
      
      if(item.id === id){
   itemSelecionado = {
      ...item,
      restaurante: restaurante.nome
   }
}
    })
   })
  })

  if (!itemSelecionado) return

  carrinho.push(itemSelecionado)

  localStorage.setItem("carrinho", JSON.stringify(carrinho))

  window.location.href = "pedido.html"
}

if (window.location.pathname.includes("pedido.html")) {

  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || []

  const lista = document.getElementById("lista")
  const totalEl = document.getElementById("total")

  let total = 0

  carrinho.forEach(item => {
    total += item.valor

    lista.innerHTML +=  `
  <div class="item-pedido">
  <img href=${item.imagem}>
    <h4>${item.nome}</h4>
    <p class="nome-res">${item.restaurante}</p>
    <p>${item.descricao}</p>
    <p class="valor">
      ${item.valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      })}
    </p>
  </div>
`
  })

  if (totalEl) {
    totalEl.innerText = total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })
  }
}


/****apagar todos os pedidos pedidos */


const botao = document.querySelector("#btn-apagar");
const carrinho = JSON.parse(localStorage.getItem("carrinho"))||[]


function limparCarrinho(){
  localStorage.removeItem('carrinho')
 location.reload()
}


if(carrinho.length === 0 && botao){
  botao.classList.add("none")
}


/* texto qunado o item e add ou quando nao tem item */

const texto = document.querySelector('.titulos');
const containerTexto=document.querySelector('.status')


if (carrinho.length === 0) {
  texto.innerHTML = "Nenhum item adicionado";
  containerTexto.classList.remove('none');
} else {
  containerTexto.classList.add('none');
}
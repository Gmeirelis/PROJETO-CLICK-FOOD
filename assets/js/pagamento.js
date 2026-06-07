
const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
const dadosUsuario = JSON.parse(localStorage.getItem("usuarioLogado")) || []


console.log(carrinho)
console.log(dadosUsuario)




function renderizarEndereco(){
  
const rua = dadosUsuario.endereco[0].rua|| "Rua não informada";
const numero = dadosUsuario.endereco[0].numero || "S/N";
const bairro = dadosUsuario.endereco[0].bairro || "Bairro não informado";

const container = document.querySelector('.renerizar-endereco')

container.innerHTML=`
<section class="endereco">

<h1>Entregar no endereço</h1>
 <div class="container-endereco">
   
 <div class="localizacao">
    <i class="fas fa-map-marker-alt"></i>
 </div>

 <div class="descricao">
   
    <h2>${rua},${numero}</h2>
    <P>${bairro}</P>
 </div>
  
 </div>

</section>

`
}

renderizarEndereco()

function selecionarPagamento(tipo,elemento) {
  // Remove a classe 'ativo' de todos e adiciona no selecionado
  document.querySelectorAll('.metodo-card').forEach(card => card.classList.remove('ativo'));
  
 elemento.classList.add('ativo');

  const trocoDiv = document.getElementById('campo-troco');
  
  if (tipo === 'dinheiro') {
    trocoDiv.style.display = 'block';
  } else {
    trocoDiv.style.display = 'none';
  }
  
  console.log("Usuário escolheu: " + tipo);
}
  
/* deixa o card selecionado */


function renderizarResumo() {
  // Verifique se o carrinho é um array e se tem itens
  if (!Array.isArray(carrinho) || carrinho.length === 0) {
    console.warn("O carrinho está vazio.");
    return;
  }

  const container = document.querySelector('.container-resumo');

  if (container) {
    let htmlGerado = `
      <section class="resumo">
        <h2>Meu resumo</h2>
        <div class="container-resumo">
    `;

    
    carrinho.forEach(item => {
      htmlGerado += `<p>1x ${item.nome}</p>`;
    });

    htmlGerado += `
        </div>
      </section>
    `;

    container.innerHTML = htmlGerado;
  }
}

renderizarResumo()


/*redirecionar*/

  const btn = document.querySelector('#btnEntrar');

btn.addEventListener('click', () => {
  btn.classList.add('loading');

  // simulação de requisição (ex: login)
  setTimeout(() => {
    btn.classList.remove('loading');
    window.location.href="entrega.html"
  }, 4000);
});


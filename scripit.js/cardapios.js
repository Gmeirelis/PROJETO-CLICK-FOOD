


let cardapio = [ 
]

fetch("cardapio.json").then(response => response.json()).then(data=>{
cardapio = data
renderizarcardapio(cardapio)
})


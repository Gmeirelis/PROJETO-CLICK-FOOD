let restaurante = [];

 async function dados(){
    
    try{

 const resposta = await fetch('/restaurante.json')

 if(!resposta.ok){
    throw new Error(`Error HTTP: ${resposta.status}`);
 }

const data = await resposta.json()
restaurante = data

    }catch(error){
        console.error('erro na busca das informação',error)
    }
}

dados()
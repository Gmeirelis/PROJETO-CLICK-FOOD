
import { db, collection, addDoc } from "./firebase.js";



async function criarUsuario(e) {
  e.preventDefault();
  
  const form = e.currentTarget;
  const btn = document.querySelector('#btnEntrar');

  // Feedback visual de carregamento
  btn.classList.add('loading');
  btn.disabled = true;

  const usuario = {
    nome: form.nome.value,
    sobrenome: form.sobrenome.value,
    email: form.email.value,
    senha: form.senha.value,
    endereco: {
      rua: form.rua.value,
      numero: form.numero.value,
      cep: form.cep.value,
      bairro: form.bairro.value,
    }
  };


  

 try {
    console.log("1. Enviando dados...");
      await addDoc(collection(db, "usuarios"), usuario);

      console.log("2. Cadastro Sucesso! Redirecionando...");
    window.location.href = "login.html";
  
  } catch (error) {
    console.error("ERRO NO CADASTRO:", error.message);
    alert("Falha no cadastro: " + error.message);
  } finally {
    // Reativa o botão independente de sucesso ou erro
    btn.classList.remove("loading");
    btn.disabled = false;
  }
}

// Event Listener simplificado
const form = document.querySelector("#cadastro");
form.addEventListener("submit", criarUsuario)
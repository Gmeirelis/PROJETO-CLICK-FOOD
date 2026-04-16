import { autenticar } from "./authService.js";

const form = document.querySelector('.formularios'); 
const emailInput = document.querySelector('.email'); 
const senhaInput = document.querySelector('.password');


form.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    try {
        
        const dados = await autenticar(emailInput.value, senhaInput.value);

        
        localStorage.setItem("usuario", JSON.stringify(dados));
        
        alert("Login realizado com sucesso!");

        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1000);

    } catch (error) {
  
        alert(error.message); 
        console.error("Erro no login:", error.message);
    }
});
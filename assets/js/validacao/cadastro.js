// Validar cadastro
import { senhasIguais,senhaValida,validar } from "./password.js";
import { verificarInputs, inputsCorretos } from "./inputs.js";
import { atualizarIcone } from "./ui.js";

const formulario = document.querySelector("#cadastro");

const input = {
  nome: formulario.nome,
  sobrenome: formulario.sobrenome,
  email: formulario.email,
  cep: formulario.cep,
  rua: formulario.rua,
  numero: formulario.numero,
  bairro: formulario.bairro,
  senha: formulario.senha,
  senha2: formulario.senha2,
};

const icone = {
  senhaTamanho: document.querySelector("#senhaTamanho"),
  senhaIgual: document.querySelector("#senhaIgual"),
  preenchido: document.querySelector("#preenchido"),
};

function verificaGeral() {
  /* senha*/

  const senha = input.senha.value;
  const senha2 = input.senha2.value;

  const iguaisOk = senhasIguais(senha, senha2);
  const tamanhoOk = senhaValida(senha);
  const camposOk = verificarInputs(input);
  atualizarIcone(icone.senhaTamanho, tamanhoOk);
  atualizarIcone(icone.senhaIgual, iguaisOk);
  atualizarIcone(icone.preenchido, camposOk);
  inputsCorretos(input);

  const valido = validar(senha, senha2);

  if (!valido) {
    console.log("senha invalida");
    return;
  }

  return camposOk && tamanhoOk && iguaisOk;
}

formulario.addEventListener("input", verificaGeral);

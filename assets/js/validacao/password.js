
export function senhaValida(senha) {
  return senha.length > 5;
}

export function senhasIguais(senha, senha2) {
  return senha === senha2 && senha.length > 0;
}

export function validar(senha,senha2){
if(!senhaValida(senha)){
  return false
}
if(!senhasIguais(senha,senha2)){
  return false
}
return true
}
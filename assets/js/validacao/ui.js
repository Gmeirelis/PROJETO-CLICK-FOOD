

export function atualizarIcone(icone, valido) {
  if (valido) {
    icone.classList.remove('fa-xmark', 'erro');
    icone.classList.add('fa-check', 'correto');
    
    
  } else {
    icone.classList.remove('fa-check', 'correto');
    icone.classList.add('fa-xmark', 'erro');
  }
}
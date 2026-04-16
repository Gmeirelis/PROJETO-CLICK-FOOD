
export function botaoLoading(){
const btn = document.querySelector('#btnEntrar');

btn.addEventListener('click', () => {
  btn.classList.add('loading');

  // simulação de requisição (ex: login)
  setTimeout(() => {
    btn.classList.remove('loading');
  }, 4000);
});
}

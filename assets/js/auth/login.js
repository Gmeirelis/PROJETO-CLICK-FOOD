async function buscarUsuarios() {
  try {
    const api = await fetch("../data/usuarios.json");
    const data = await api.json();

    validar(data);
  } catch (erro) {
    console.error("Erro ao buscar usuários:", erro);
  }
}
function validar(data) {
  const form = document.querySelector(".formularios");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const btnEntrar = document.querySelector("#btnEntrar");

    btnEntrar.classList.add("loading");

    const senhaDigitada = document.querySelector(".password");
    const emailDigitada = document.querySelector(".email");

    const usuarioEncontrado = data.find((usuario) => {
      return (
        usuario.email === emailDigitada.value &&
        usuario.senha === senhaDigitada.value
      );
    });

    if (usuarioEncontrado) {
      console.log("logado");
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
      senhaDigitada.style.border = "2px solid green";
      emailDigitada.style.border="2px solid green";

      setTimeout(() => {
        btnEntrar.classList.remove("loading");
        window.location.href = "../index.html";
      }, 4000);

    } else {
      btnEntrar.classList.remove("loading");
      senhaDigitada.style.border = "2px solid red";
        emailDigitada.style.border="2px solid red";
      console.log("nao logado");
    }
  });
}

/* criar persistencia de dados */

buscarUsuarios();

/*efeito suavização na pagina*/
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
});

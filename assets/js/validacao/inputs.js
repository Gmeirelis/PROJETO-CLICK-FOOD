
export function verificarInputs(inputs) {
  return Object.values(inputs).every(i => i.value.trim() !== "");
}

export function inputsCorretos(inputs) {
  const todosPreenchidos = Object.values(inputs).every(i => i.value.trim() !== "");

  Object.values(inputs).forEach(i => {
    if (i.value.trim() !== "") {
      i.classList.add('inputCorreto');
    } else {
      i.classList.remove('inputCorreto');
    }
  });

  return todosPreenchidos;
}
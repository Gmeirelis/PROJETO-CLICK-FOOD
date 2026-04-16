import { db } from "../usuarios/firebase.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function autenticar(email, senha) {
  try {
    const q = query(
      collection(db, "usuarios"),
      where("email", "==", email)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Usuário não encontrado");
    }

    let usuario;

    querySnapshot.forEach((doc) => {
      usuario = { id: doc.id, ...doc.data() };
    });

    if (usuario.senha !== senha) {
      throw new Error("Senha incorreta");
    }

    return usuario;

  } catch (error) {
    throw new Error(error.message);
  }
}
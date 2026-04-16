import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG7PdtfatK58yl7-AWSNR43QHciIN03HY",
  authDomain: "meu-app-732da.firebaseapp.com",
  projectId: "meu-app-732da",
  storageBucket: "meu-app-732da.firebasestorage.app",
  messagingSenderId: "923941685802",
  appId: "1:923941685802:web:ffb90dc90e2b5126f19153"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
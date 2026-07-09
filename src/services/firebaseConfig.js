// Importa os blocos necessários do SDK do Firebase para inicializar o app e usar a autenticação e o banco de dados
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Objeto contendo as chaves de configuração do seu projeto Firebase (Substitua pelos seus dados do console)
const firebaseConfig = {
  apiKey: "AIzaSyBjSLQeKO-2cukHmSSRLsoM2AfL0qoA9gQ",
  authDomain: "miniblog-rapha.firebaseapp.com",
  projectId: "miniblog-rapha",
  storageBucket: "miniblog-rapha.appspot.com", // <--- ALTERADO AQUI!
  messagingSenderId: "791398996253",
  appId: "1:791398996253:web:1deea44da15b5effb4a9f4",
};

// Inicializa o Firebase passando as configurações do seu projeto para a função da biblioteca
const app = initializeApp(firebaseConfig);

// Inicializa os serviços específicos que vamos usar e os exporta para que possam ser importados em outras páginas
export const auth = getAuth(app); // Serviço de autenticação (Login/Cadastro)
export const db = getFirestore(app); // Banco de dados Firestore (Salvar os posts)
export const storage = getStorage(app); // Armazenamento do Firebase (Fazer upload das fotos do blog)

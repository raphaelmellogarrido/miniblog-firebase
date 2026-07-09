// Importa os blocos necessários do SDK do Firebase para inicializar o app e usar a autenticação e o banco de dados
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Objeto contendo as chaves de configuração do seu projeto Firebase (Substitua pelos seus dados do console)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializa o Firebase passando as configurações do seu projeto para a função da biblioteca
const app = initializeApp(firebaseConfig);

// Inicializa os serviços específicos que vamos usar e os exporta para que possam ser importados em outras páginas
export const auth = getAuth(app); // Serviço de autenticação (Login/Cadastro)
export const db = getFirestore(app); // Banco de dados Firestore (Salvar os posts)
export const storage = getStorage(app); // Armazenamento do Firebase (Fazer upload das fotos do blog)

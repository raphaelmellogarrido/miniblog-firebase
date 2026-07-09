// 1. Importa os hooks do React. O useEffect serve para executar um código assim que a página carrega
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// 2. Importa a conexão do Firebase e a função de monitoramento
import { auth } from "./services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

import "./App.css";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreatePost from "./pages/CreatePost/CreatePost";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  // Cria um estado inteligente para guardar os dados do usuário logado.
  // Ele começa como 'undefined' porque no primeiro milissegundo o React ainda não sabe se tem alguém logado.
  const [user, setUser] = useState(undefined);

  // Cria uma variável para checar se o Firebase terminou de carregar as informações de login
  const loadingUser = user === undefined;

  // O useEffect roda esse código uma única vez assim que o App é montado na tela
  useEffect(() => {
    // Essa função do Firebase fica escutando o status de login do usuário
    onAuthStateChanged(auth, (currentUser) => {
      // Se tiver alguém logado, 'currentUser' terá os dados do usuário. Se não, será 'null'.
      // Joga esse resultado direto no estado 'user'
      setUser(currentUser);
    });
  }, []); // Esse array vazio [] garante que o monitor só seja ativado UMA vez

  // Se o Firebase ainda estiver descobrindo se o usuário está logado, mostra uma tela de carregamento limpa
  if (loadingUser) {
    return (
      <div className="loading_screen">
        <p>Loading application...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <BrowserRouter>
        {/* Passa o estado 'user' como uma propriedade (Prop) para dentro da Navbar */}
        {/* Agora a Navbar vai saber exatamente quem está logado para sumir ou aparecer com os botões! */}
        <Navbar user={user} />

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            {/* Regra de Mercado (Bloqueio de Rotas): Se o usuário JÁ está logado, ele não deve conseguir acessar a página de Login ou Registro. Ele é redirecionado para a Home ("/") */}
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

            {/* Proteção de Rota Privada: Se o usuário NÃO está logado, ele não pode criar posts. Ele é jogado para a página de login */}
            <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/login" />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

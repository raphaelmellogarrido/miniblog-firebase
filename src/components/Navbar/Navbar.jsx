// 1. NavLink para os links internos do Router
import { NavLink } from "react-router-dom";

// 2. Função de logout direto da biblioteca do Firebase
import { signOut } from "firebase/auth";

// 3. Instância de autenticação para dizer ao Firebase quem está a sair
import { auth } from "../../services/firebaseConfig";

import "./Navbar.css";

// 4. Propriedade 'user' que foi enviada pelo App.jsx dentro dos parênteses da função
function Navbar({ user }) {
  // Função que será chamada quando o utilizador clicar no botão de Logout
  const handleLogout = () => {
    signOut(auth); // O Firebase limpa o token do navegador e o App.jsx deteta isso automaticamente mudando o estado do user para null
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="brand">
        Mini <span>Blog</span>
      </NavLink>

      <ul className="links_list">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        {/* Bloco Condicional 1: Se o utilizador NÃO estiver logado, exibe os links de autenticação */}
        {!user && (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        )}

        {/* Bloco Condicional 2: Se o utilizador ESTIVER logado, exibe o link de criar post */}
        {user && (
          <li>
            <NavLink to="/posts/create">New Post</NavLink>
          </li>
        )}

        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        {user && (
          <li className="user_greeting">
            Olá, <strong>{user.displayName || user.email.split("@")[0]}</strong>
          </li>
        )}

        {/* Bloco Condicional 3: Se o utilizador ESTIVER logado, exibe também o botão de Logout */}
        {user && (
          <li>
            <button onClick={handleLogout} className="btn_logout">
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

// 1. Importa os hooks necessários do React e o useNavigate para redirecionar o usuário após o login
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// 2. Importa o serviço de autenticação do nosso arquivo de configuração
import { auth } from "../../services/firebaseConfig";

// 3. Importa a função específica do Firebase para fazer login com email e senha
import { signInWithEmailAndPassword } from "firebase/auth";

// 4. Importa o estilo CSS correspondente
import "./Login.css";

function Login() {
  // Cria os estados para capturar os dados digitados nos inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estados para controle de feedback visual (Erros e carregamento)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Inicializa a função de navegação do React Router
  const navigate = useNavigate();

  // Função disparada no envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento do HTML
    setError(""); // Limpa erros anteriores
    setLoading(true); // Ativa o estado de carregamento

    try {
      // Envia os dados para o Firebase autenticar
      await signInWithEmailAndPassword(auth, email, password);

      console.log("User logged in successfully!");

      // Se der certo, redireciona o usuário imediatamente para a página Home ("/")
      navigate("/");
    } catch (firebaseError) {
      // Tratamento de erros comuns de autenticação para o usuário
      if (firebaseError.code === "auth/invalid-credential" || firebaseError.code === "auth/user-not-found" || firebaseError.code === "auth/wrong-password") {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("An error occurred during login. Please try again.");
      }
    }

    setLoading(false); // Desativa o loading
  };

  return (
    <div className="login_container">
      <h2>Welcome Back</h2>
      <p>Log in to your account to manage your posts and share new content!</p>

      <form onSubmit={handleSubmit}>
        {/* Input de Email */}
        <label>
          <span>Email:</span>
          <input type="email" name="email" required placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        {/* Input de Senha */}
        <label>
          <span>Password:</span>
          <input type="password" name="password" required placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        {/* Subclasse ou bloco onde está o botão atual */}
        <div className="login_actions_container">
          {/* Botão de envio padrão do formulário */}
          {!loading && (
            <button type="submit" className="btn btn_login">
              Log In
            </button>
          )}
          {loading && (
            <button className="btn btn_login" disabled>
              Loading...
            </button>
          )}

          {/* Botão de registo que redireciona para a página de Cadastro */}
          <Link to="/register" className="btn btn_register">
            Register
          </Link>
        </div>

        {/* Renderização condicional da mensagem de erro */}
        {error && <p className="error_message">{error}</p>}
      </form>
    </div>
  );
}

// 5. Exporta o componente para que o App.jsx consiga utilizá-lo
export default Login;

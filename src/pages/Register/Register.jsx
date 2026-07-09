// 1. Importa o hook useState para gerenciar o que o usuário digita nos inputs
import { useState } from "react";

// 2. Importa o serviço de autenticação que configuramos lá no firebaseConfig
import { auth } from "../../services/firebaseConfig";

// 3. Importa a função nativa do Firebase que cria um usuário com email e senha
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

// 4. Importa o estilo CSS da página
import "./Register.css";

function Register() {
  // Cria os estados para armazenar os dados do formulário
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Estados para controle de fluxo da interface (Mensagem de erro e estado de carregamento)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Esta função é disparada quando o usuário clica no botão de cadastrar
  const handleSubmit = async (e) => {
    // Impede o comportamento padrão do HTML de recarregar a página inteira ao enviar o formulário
    e.preventDefault();

    // Resetamos o estado de erro a cada nova tentativa de envio
    setError("");

    // Validação inicial antes de mandar pro Firebase: as senhas precisam ser iguais
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return; // O 'return' para a execução da função aqui mesmo
    }

    // Ativa o estado de carregamento (bom para desabilitar o botão e evitar múltiplos cliques)
    setLoading(true);

    try {
      // Cria o usuário no Authentication do Firebase usando o email e senha fornecidos
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // O Firebase cria o usuário sem o "Nome", então usamos o updateProfile para salvar o displayName logo em seguida
      const user = res.user;
      await updateProfile(user, {
        displayName: displayName,
      });

      console.log("User registered successfully:", user);
    } catch (firebaseError) {
      // Tratamento de erros amigável baseado nos códigos de erro que o Firebase nos devolve
      if (firebaseError.code === "auth/weak-password") {
        setError("The password must be at least 6 characters long.");
      } else if (firebaseError.code === "auth/email-already-in-use") {
        setError("This email is already registered.");
      } else {
        setError("An error occurred during registration. Please try again.");
      }
    }

    // Desativa o loading independentemente se deu certo ou errado
    setLoading(false);
  };

  return (
    <div className="register_container">
      <h2>Sign up to post</h2>
      <p>Create your account and share your stories with the world!</p>

      {/* Formulário com o evento onSubmit atrelado à nossa função handleSubmit */}
      <form onSubmit={handleSubmit}>
        {/* Input de Nome */}
        <label>
          <span>Name:</span>
          <input
            type="text"
            name="displayName"
            required
            placeholder="Your name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)} // Atualiza o estado a cada tecla digitada
          />
        </label>

        {/* Input de Email */}
        <label>
          <span>Email:</span>
          <input type="email" name="email" required placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        {/* Input de Senha */}
        <label>
          <span>Password:</span>
          <input type="password" name="password" required placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        {/* Input de Confirmação de Senha */}
        <label>
          <span>Confirm Password:</span>
          <input type="password" name="confirmPassword" required placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>

        {/* Botão condicional: Se estiver carregando, mostra o botão desabilitado */}
        {!loading && <button className="btn">Register</button>}
        {loading && (
          <button className="btn" disabled>
            Loading...
          </button>
        )}

        {/* Se a variável 'error' tiver algum texto dentro, exibe esse parágrafo na tela */}
        {error && <p className="error_message">{error}</p>}
      </form>
    </div>
  );
}

// 5. Exporta o componente para ser usado nas rotas do App.jsx
export default Register;

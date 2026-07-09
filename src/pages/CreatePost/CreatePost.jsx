import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../services/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "./CreatePost.css";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // 1. Agora o estado da imagem guarda uma string (o link da imagem) em vez de um ficheiro bruto
  const [imageUrl, setImageUrl] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validação básica para garantir que o link parece uma URL de imagem
    if (!imageUrl.startsWith("http://") && !imageUrl.startsWith("https://")) {
      setError("Please, enter a valid image URL (starting with http:// or https://).");
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;

      // 2. Gravar os dados direto no Firestore, sem passar pelo Storage chato do CORS!
      await addDoc(collection(db, "posts"), {
        title,
        content,
        imageUrl, // Link direto da internet
        userId: user.uid,
        createdBy: user.displayName || user.email.split("@")[0], // Garante um nome caso o display esteja vazio
        createdAt: new Date().toISOString(),
      });

      navigate("/");
    } catch (firebaseError) {
      console.error(firebaseError);
      setError("An error occurred while creating the post. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="create_post_container">
      <h2>Create a new post</h2>
      <p>Share your ideas, stories, or knowledge with our community!</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input type="text" required placeholder="Think of a catchy title..." value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label>
          <span>Content:</span>
          <textarea required placeholder="Write your story here..." value={content} onChange={(e) => setContent(e.target.value)} />
        </label>

        <label>
          <span>Post Image URL:</span>
          <input type="text" required placeholder="Paste your image URL here (e.g., https://images.unsplash.com/...)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </label>

        {!loading && <button className="btn">Publish Post</button>}
        {loading && (
          <button className="btn" disabled>
            Publishing...
          </button>
        )}

        {error && <p className="error_message">{error}</p>}
      </form>
    </div>
  );
}

export default CreatePost;

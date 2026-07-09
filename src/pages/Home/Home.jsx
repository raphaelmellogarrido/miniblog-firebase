// 1. Importar os hooks necessários para controle de estado e ciclo de vida do componente
import { useState, useEffect } from "react";

// 2. Importar a conexão com o banco de dados do Firebase
import { db } from "../../services/firebaseConfig";

// 3. Importar as funções do Firestore necessárias para consultar, ordenar e ouvir coleções de dados
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

import "./Home.css";

function Home() {
  // Cria um estado para guardar o array (lista) de posts que virá do banco
  const [posts, setPosts] = useState([]);

  // Estado para saber se os posts ainda estão sendo carregados da internet
  const [loading, setLoading] = useState(true);

  // O useEffect roda este bloco de código uma única vez assim que a Home entra na tela
  useEffect(() => {
    // Cria uma referência para a coleção "posts"
    const postsRef = collection(db, "posts");

    // Cria uma consulta (query) estruturada que pede os posts ordenados pela data de criação ('createdAt') de forma decrescente ('desc')
    const q = query(postsRef, orderBy("createdAt", "desc"));

    // O onSnapshot escuta o banco em tempo real. Sempre que alguém criar um post novo, ele atualiza a nossa tela na hora
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsArray = [];

      // Passa por cada documento que o Firebase retornou e monta um objeto amigável
      querySnapshot.forEach((doc) => {
        postsArray.push({
          id: doc.id, // O ID único gerado automaticamente pelo Firestore
          ...doc.data(), // Espalha os dados do documento (title, content, imageUrl, createdBy...)
        });
      });

      // Salva o array completo dentro do nosso estado inteligente 'posts'
      setPosts(postsArray);
      // Desativa o loading, pois os dados já chegaram
      setLoading(false);
    });

    // Função de limpeza (cleanup): desativa o "escutador" em tempo real caso o usuário mude de página, evitando vazamento de memória (Memory Leak)
    return () => unsubscribe();
  }, []); // Array vazio [] garante que a busca só seja configurada uma única vez

  // Se estiver buscando os dados no Firebase, exibe uma mensagem amigável de carregamento na tela
  if (loading) {
    return (
      <div className="loading_container">
        <p>Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="home_container">
      <h1>Recent Posts</h1>
      <p>Check out what the community is talking about</p>

      {/* Caixa que agrupa todos os posts da lista */}
      <div className="posts_list">
        {/* Validação de Mercado: Se a lista estiver vazia (posts.length === 0), mostra uma mensagem indicando que não há posts */}
        {posts.length === 0 ? (
          <div className="no_posts">
            <p>No posts found. Be the first to write something!</p>
          </div>
        ) : (
          // Se houver posts, usa o método .map() para percorrer o array e transformar cada post em HTML
          posts.map((post) => (
            // Todo item renderizado através de um loop .map() no React precisa OBRIGATORIAMENTE de uma propriedade 'key' única no seu elemento pai
            <article key={post.id} className="post_card">
              {/* Exibe a imagem do post que está salva lá no Storage */}
              <img src={post.imageUrl} alt={post.title} className="post_image" />

              {/* Cabeçalho interno do post com título e autor */}
              <div className="post_content">
                <h2>{post.title}</h2>
                <p className="post_author">
                  Published by: <span>{post.createdBy}</span>
                </p>

                {/* O conteúdo/texto do post */}
                <p className="post_text">{post.content}</p>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;

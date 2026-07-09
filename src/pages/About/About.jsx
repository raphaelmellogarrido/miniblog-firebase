import { Link } from "react-router-dom";
import "./About.css";

function About() {
  return (
    <div className="about_container">
      <h2>
        About the Mini <span>Blog</span>
      </h2>
      <p>This project consists of a dynamic blog developed with React on the front-end and Firebase on the back-end. It was built to study advanced concepts of state management, real-time data synchronization, user authentication, and responsive layout structure.</p>

      <div className="tech_section">
        <h3>Technologies & Tools Used:</h3>
        <ul>
          <li>
            <strong>Vite</strong> — Next-generation frontend tooling for an ultra-fast development environment
          </li>
          <li>
            <strong>React</strong> — Component-based architecture, hooks (useState, useEffect), and global state handling
          </li>
          <li>
            <strong>React Router</strong> — Dynamic single-page routing (SPA) for seamless transitions
          </li>
          <li>
            <strong>Firebase Auth/Form</strong> — Secure user session management, login, and registration
          </li>
          <li>
            <strong>Cloud Firestore</strong> — NoSQL database with real-time listeners (onSnapshot) for instant updates
          </li>
          <li>
            <strong>CSS3 & Flexbox</strong> — Advanced layout positioning, box-sizing alignment, and sticky footer structure
          </li>
        </ul>
      </div>

      <p>Want to share your own stories?</p>
      <Link to="/posts/create" className="btn">
        Create a Post
      </Link>
    </div>
  );
}

export default About;

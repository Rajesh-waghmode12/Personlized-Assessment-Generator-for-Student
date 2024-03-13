import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';
import EducationImage from '../../Images/Illustration.png'; // Update the path as per your project structure

function HomePage() {
  return (
    <div className="homepage">
      <nav className="top-nav">
        <div className="logo">DYP</div>
        <div className="nav-links">
          <Link to="/login" className="nav-button login-button">Login</Link>
          <Link to="/register" className="nav-button register-button">Register</Link>
        </div>
      </nav>
      <main className="content">
        <div className="image-container">
          <img src={EducationImage} alt="Education" className="education-image" />
        </div>
        <div className="quotes-container">
          <blockquote className="education-quote">
            “Education is the most powerful weapon which you can use to change the world.” — Nelson Mandela
          </blockquote>
          {/* Add more quotes as needed */}
        </div>
      </main>
    </div>
  );
}

export default HomePage;

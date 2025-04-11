import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h2>Stream-Go</h2>
          <p>Experience the best of movies & TV shows.</p>
        </div>
        
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/tvshows">TV Shows</Link></li>
          </ul>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
          <a href="https://www.linkedin.com/in/viraj-parekh23/" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; 2025 Stream-Go. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

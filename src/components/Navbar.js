import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthModal from "./AuthModal";
import SubscriptionModal from "./SubscriptionModal";
import "../styles/Navbar.css";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isSubOpen, setSubOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link to="/">Stream-Go</Link>
        </div>
        
        <div className="nav-content">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/tvshows">TV Shows</Link></li>
          </ul>
          

          <div className="nav-buttons">
          <DarkModeToggle/>
            <button onClick={() => setAuthOpen(true)} className="login-btn">Login</button>
            <button onClick={() => setSubOpen(true)} className="subscribe-btn">Subscribe</button>
          </div>

        </div>
      </nav>

      <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} />
      <SubscriptionModal isOpen={isSubOpen} onClose={() => setSubOpen(false)} />
    </>
  );
};

export default Navbar;
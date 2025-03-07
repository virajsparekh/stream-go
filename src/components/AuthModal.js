import React, { useState } from "react";
import "../styles/AuthModal.css";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          
          {!isLogin && <input type="password" placeholder="Confirm Password" required />}
          
          <button className="auth-btn">{isLogin ? "Login" : "Sign Up"}</button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;

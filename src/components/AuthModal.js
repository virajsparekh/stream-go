import React, { useState } from 'react';
import api from '../api/api';
import '../styles/AuthModal.css';

const AuthModal = ({ isOpen, onClose, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isLogin) {
        response = await api.auth.login({
          email: formData.email,
          password: formData.password
        });
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
        response = await api.auth.register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
      }
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || 'Authentication failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required
            />
          )}
          <button type="submit" className="auth-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="toggle-text">
          {isLogin ? "New user? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import SubscriptionModal from './SubscriptionModal';
import DarkModeToggle from './DarkModeToggle';
import SearchBar from './SearchBar';
import '../styles/Navbar.css';
import { FaSearch, FaBell, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, login, logout } = useAuth();
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isSubOpen, setSubOpen] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState("Premium Plan (4K Ultra HD)");
  const navigate = useNavigate();

  const subscriptionPlans = [
    "Premium Plan (4K Ultra HD)"
  ];

  const handleSearchResults = (results) => {
    navigate('/search', { 
      state: { 
        movies: results.movies,
        tvShows: results.tvShows
      } 
    });
  };

  const changeSubscription = () => {
    const randomIndex = Math.floor(Math.random() * subscriptionPlans.length);
    const newPlan = subscriptionPlans[randomIndex];
    setCurrentSubscription(newPlan);
    return newPlan;
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <div className="logo">
              <Link to="/">STREAMGO</Link>
            </div>
            <ul className="nav-links">
              <li><Link to="/movies">Movies</Link></li>
              <li><Link to="/tvshows">TV Shows</Link></li>
            </ul>
          </div>

          <div className="navbar-center">
            <SearchBar onSearch={handleSearchResults} />
          </div>

          <div className="navbar-right">
            <DarkModeToggle />
            {user && (
              <button className="notification-button">
                <FaBell />
              </button>
            )}
            <div className="user-controls">
              {user ? (
                <div className="user-dropdown">
                  <button className="user-button">
                    <div className="user-icon-circle">
                      <FaUserCircle className="user-icon"/>
                    </div>
                    <span className="username">{user.name}</span>
                  </button>
                  <div className="dropdown-content">
                    <div className="user-profile">
                      <div className="profile-icon">
                        <FaUserCircle className="user-icon-large"/>
                      </div>
                      <div className="profile-info">
                        <div className="profile-name">{user.name}</div>
                        <div className="profile-email">{user.email}</div>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <button 
                      className="dropdown-item"
                      onClick={() => alert(`Subscription Plan: ${changeSubscription()}`)}
                    >
                      My Subscription
                    </button>
                    <div className="dropdown-divider"></div>
                    <button 
                      className="dropdown-item logout"
                      onClick={logout}
                    >
                      <FaSignOutAlt className="logout-icon"/> Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => setAuthOpen(true)} 
                    className="login-button"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => setSubOpen(true)} 
                    className="subscribe-button"
                  >
                    Subscribe
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setAuthOpen(false)}
        setUser={login}
      />
      <SubscriptionModal 
        isOpen={isSubOpen} 
        onClose={() => setSubOpen(false)}
      />
    </>
  );
};

export default Navbar;
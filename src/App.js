import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import DarkModeToggle from "./components/DarkModeToggle";
import Home from './pages/Home';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import MovieDetails from './pages/MovieDetails';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchResults from './pages/SearchResults';
import Collection from "./pages/Collection";
import './App.css';
import "./styles/DarkMode.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tvshows" element={<TVShows />} />
            <Route path="/:type/:id" element={<MovieDetails />} />
            <Route path="/dashboard" element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/collection" element={<Collection />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

function RequireAuth({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" replace />;
}

export default App;
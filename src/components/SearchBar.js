import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../styles/SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const [moviesRes, tvShowsRes] = await Promise.all([
        api.movies.search(query),
        api.tvshows.search(query)
      ]);
      
      navigate('/search', {
        state: {
          movies: moviesRes.data,
          tvShows: tvShowsRes.data,
          searchTerm: query
        }
      });
      setQuery('');
    } catch (error) {
      console.error('Search failed:', error);
      navigate('/search', { state: { error: 'Search failed. Please try again.' } });
    }
  };

  return (
    <form className="search-container" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search movies, TV shows..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search"
        className="search-input"
      />
      <button type="submit" className="search-button">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
};

export default SearchBar;
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "../styles/Collection.css";

const Collection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, items, type = "movie" } = location.state || {};

  if (!location.state || !items) {
    return (
      <div className="collection-page">
        <div className="error-message">
          <h2>Collection Not Found</h2>
          <p>
            The {type === 'movie' ? 'movie' : 'TV show'} collection you're looking for 
            doesn't exist or may have been removed.
          </p>
          <button 
            className="back-button" 
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="collection-page">
        <div className="error-message">
          <h2>Empty Collection</h2>
          <p>
            This {type === 'movie' ? 'movie' : 'TV show'} collection is currently empty.
          </p>
          <button 
            className="back-button" 
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="collection-page">
      <h1>{title || `${type === 'movie' ? 'Movie' : 'TV Show'} Collection`}</h1>
      <div className="movies-grid">
        {items.map(item => (
          <MovieCard
            key={item.id}
            id={item.id}
            poster={item.largePoster || item.smallPoster}
            type={type}
          />
        ))}
      </div>
    </div>
  );
};

export default Collection;
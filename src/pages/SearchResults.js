import React from 'react';
import { useLocation } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import '../styles/SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const { movies = [], tvShows = [], searchTerm = '', error } = location.state || {};

  return (
    <div className="search-results-page">
      <h1 className="search-title">
        {error ? 'Search Error' : `Results for "${searchTerm}"`}
      </h1>

      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <section className="results-section">
            <h2>Movies ({movies.length})</h2>
            <div className="results-container">
              {movies.length > 0 ? (
                <div className="results-grid">
                  {movies.map(movie => (
                    <MovieCard
                      key={movie.id}
                      id={movie.id}
                      poster={movie.smallPoster || movie.largePoster}
                      title={movie.title}
                      type="movie"
                    />
                  ))}
                </div>
              ) : (
                <p className="no-results">No movies found</p>
              )}
            </div>
          </section>

          <section className="results-section">
            <h2>TV Shows ({tvShows.length})</h2>
            <div className="results-container">
              {tvShows.length > 0 ? (
                <div className="results-grid">
                  {tvShows.map(show => (
                    <MovieCard
                      key={show.id}
                      id={show.id}
                      poster={show.smallPoster || show.largePoster}
                      title={show.title}
                      type="tvshow"
                    />
                  ))}
                </div>
              ) : (
                <p className="no-results">No TV shows found</p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default SearchResults;
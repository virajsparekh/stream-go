import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import "../styles/Movies.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const allMoviesRef = useRef(null); 
  const languageRefs = useRef({});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5004/movies");
        setMovies(res.data || []);
      } catch (err) {
        setError("Failed to fetch movies.");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const groupByLanguage = (items) => {
    return items.reduce((acc, item) => {
      const language = item.language || "Unknown";
      if (!acc[language]) {
        acc[language] = [];
      }
      acc[language].push(item);
      return acc;
    }, {});
  };

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -500 : 500;
      ref.current.scrollLeft += scrollAmount;
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  const moviesByLanguage = groupByLanguage(movies);

  return (
    <div className="movies-page">
      <h2>All Movies</h2>
      <div className="movies-container">
        <button
          className="scroll-arrow scroll-arrow-left"
          onClick={() => scroll(allMoviesRef, "left")}
        >
          &lt;
        </button>
        <div className="movies-grid" ref={allMoviesRef}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              poster={movie.poster}
              type="movie"
            />
          ))}
        </div>
        <button
          className="scroll-arrow scroll-arrow-right"
          onClick={() => scroll(allMoviesRef, "right")}
        >
          &gt;
        </button>
      </div>

      {Object.keys(moviesByLanguage).map((language) => {
        
        if (!languageRefs.current[language]) {
          languageRefs.current[language] = React.createRef();
        }

        return (
          <section key={language}>
            <h3>{language} Movies</h3>
            <div className="movies-container">
              <button
                className="scroll-arrow scroll-arrow-left"
                onClick={() => scroll(languageRefs.current[language], "left")}
              >
                &lt;
              </button>
              <div className="movies-grid" ref={languageRefs.current[language]}>
                {moviesByLanguage[language].map((movie) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    poster={movie.poster}
                    type="movie"
                  />
                ))}
              </div>
              <button
                className="scroll-arrow scroll-arrow-right"
                onClick={() => scroll(languageRefs.current[language], "right")}
              >
                &gt;
              </button>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Movies;
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import DarkModeToggle from "../components/DarkModeToggle";
import Hero from "../components/HeroSection";
import ContentSection from "../components/ContentSection";
import CinemaSpotlight from "../components/CinemaSpotlight";
import "../styles/Home.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Refs for scroll containers
  const moviesRef = useRef(null);
  const tvShowsRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [moviesRes, tvShowsRes] = await Promise.all([
          axios.get("http://localhost:5004/movies"),
          axios.get("http://localhost:5004/tvShows"),
        ]);
        setMovies(moviesRes.data || []);
        setTvShows(tvShowsRes.data || []);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //group movies and series by language
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

  //10 random movies and TV shows combined
  const getRandomMoviesAndShows = (movies, tvShows, count = 10) => {
    const combined = [...movies, ...tvShows];
    return combined
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
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
  const tvShowsByLanguage = groupByLanguage(tvShows);

  return (
    <div className="home">
      <Hero />
      
      <CinemaSpotlight 
      title="Weekly Cinema Spotlight"
      movies={getRandomMoviesAndShows(movies, tvShows, 10)} />
      
      <ContentSection
        title="Exclusive Hollywood Access"
        description="Get behind the scenes access to your favorite movies and TV shows with premium content unavailable anywhere else."
        image="/images/ach.jpg"
      />

      <section>
        <h3>All Movies</h3>
        <div className="movies-container">
          <button
            className="scroll-arrow scroll-arrow-left"
            onClick={() => scroll(moviesRef, "left")}
          >
            &lt;
          </button>
          <div className="movies-grid" ref={moviesRef}>
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
            onClick={() => scroll(moviesRef, "right")}
          >
            &gt;
          </button>
        </div>
      </section>

      <section>
        <h3>All TV Shows</h3>
        <div className="movies-container">
          <button
            className="scroll-arrow scroll-arrow-left"
            onClick={() => scroll(tvShowsRef, "left")}
          >
            &lt;
          </button>
          <div className="movies-grid" ref={tvShowsRef}>
            {tvShows.map((show) => (
              <MovieCard
                key={show.id}
                id={show.id}
                poster={show.poster}
                type="tvshow"
              />
            ))}
          </div>
          <button
            className="scroll-arrow scroll-arrow-right"
            onClick={() => scroll(tvShowsRef, "right")}
          >
            &gt;
          </button>
        </div>
      </section>

      <CinemaSpotlight 
      title="My List"
      movies={getRandomMoviesAndShows(movies, tvShows, 10)} 
      style={{ fontSize: "1.5em", textAlign: "left" }} />

    </div>
  );
};

export default Home;
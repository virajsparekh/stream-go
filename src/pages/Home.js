import React, { useEffect, useState, useRef } from "react";
import MovieCard from "../components/MovieCard";
import Hero from "../components/HeroSection";
import ContentSection from "../components/ContentSection";
import CinemaSpotlight from "../components/CinemaSpotlight";
import "../styles/Home.css";
import "../styles/Navbar.css";
import api from "../api/api";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [featuredShows, setFeaturedShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const moviesRef = useRef(null);
  const tvShowsRef = useRef(null);
  const featuredMoviesRef = useRef(null);
  const featuredShowsRef = useRef(null);
  const spotlightRef = useRef(null);
  const myListRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [moviesRes, showsRes, featuredMoviesRes, featuredShowsRes] = await Promise.all([
          api.movies.getAll(),
          api.tvshows.getAll(),
          api.movies.getFeatured(),
          api.tvshows.getFeatured()
        ]);

        setMovies(moviesRes.data || []);
        setTvShows(showsRes.data || []);
        setFeaturedMovies(featuredMoviesRes.data || []);
        setFeaturedShows(featuredShowsRes.data || []);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getRandomMoviesAndShows = (movies, tvShows, count = 10) => {
    const moviesWithType = movies.map(movie => ({ ...movie, type: 'movie' }));
    const tvShowsWithType = tvShows.map(show => ({ ...show, type: 'tvshow' }));
    const combined = [...moviesWithType, ...tvShowsWithType];
    return combined
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  };

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -800 : 800;
      ref.current.scrollLeft += scrollAmount;
    }
  };

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="home">
      <Hero />
      
      {/* Featured Movies */}
      <section className="featured-section">
        <h2 className="section-title">Featured Movies</h2>
        <div className="carousel-container">
          <button
            className="scroll-arrow left"
            onClick={() => scroll(featuredMoviesRef, "left")}
          >
            &lt;
          </button>
          <div className="carousel-items" ref={featuredMoviesRef}>
            {featuredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                poster={movie.largePoster || movie.smallPoster}
                type="movie"
                featured
              />
            ))}
          </div>
          <button
            className="scroll-arrow right"
            onClick={() => scroll(featuredMoviesRef, "right")}
          >
            &gt;
          </button>
        </div>
      </section>

      {/* Featured TV Shows */}
      <section className="featured-section">
        <h2 className="section-title">Featured TV Shows</h2>
        <div className="carousel-container">
          <button
            className="scroll-arrow left"
            onClick={() => scroll(featuredShowsRef, "left")}
          >
            &lt;
          </button>
          <div className="carousel-items" ref={featuredShowsRef}>
            {featuredShows.map((show) => (
              <MovieCard
                key={show.id}
                id={show.id}
                poster={show.largePoster || show.smallPoster}
                type="tvshow"
                featured
              />
            ))}
          </div>
          <button
            className="scroll-arrow right"
            onClick={() => scroll(featuredShowsRef, "right")}
          >
            &gt;
          </button>
        </div>
      </section>

      <ContentSection
        title="Exclusive Hollywood Access"
        description="Get behind the scenes access to your favorite movies and TV shows with premium content unavailable anywhere else."
        image="/images/ach.jpg"
      />

      {/* All Movies */}
      <section className="featured-section">
        <h2 className="section-title">All Movies</h2>
        <div className="carousel-container">
          <button
            className="scroll-arrow left"
            onClick={() => scroll(moviesRef, "left")}
          >
            &lt;
          </button>
          <div className="carousel-items" ref={moviesRef}>
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                poster={movie.smallPoster}
                type="movie"
              />
            ))}
          </div>
          <button
            className="scroll-arrow right"
            onClick={() => scroll(moviesRef, "right")}
          >
            &gt;
          </button>
        </div>
      </section>

      {/* All TV Shows */}
      <section className="featured-section">
        <h2 className="section-title">All TV Shows</h2>
        <div className="carousel-container">
          <button
            className="scroll-arrow left"
            onClick={() => scroll(tvShowsRef, "left")}
          >
            &lt;
          </button>
          <div className="carousel-items" ref={tvShowsRef}>
            {tvShows.map((show) => (
              <MovieCard
                key={show.id}
                id={show.id}
                poster={show.smallPoster}
                type="tvshow"
              />
            ))}
          </div>
          <button
            className="scroll-arrow right"
            onClick={() => scroll(tvShowsRef, "right")}
          >
            &gt;
          </button>
        </div>
      </section>

      {/* Weekly Cinema Spotlight */}
      <section className="featured-section">
        <h2 className="section-title">Weekly Cinema Spotlight</h2>
        <div className="carousel-container">
          <button
            className="scroll-arrow left"
            onClick={() => scroll(spotlightRef, "left")}
          >
            &lt;
          </button>
          <div className="carousel-items" ref={spotlightRef}>
            {getRandomMoviesAndShows(movies, tvShows, 10).map((item) => (
              <MovieCard
                key={item.id}
                id={item.id}
                poster={item.smallPoster}
                type={item.type}
              />
            ))}
          </div>
          <button
            className="scroll-arrow right"
            onClick={() => scroll(spotlightRef, "right")}
          >
            &gt;
          </button>
        </div>
      </section>

      {/* My List */}
      <section className="featured-section">
        <h2 className="section-title">My List</h2>
        <div className="carousel-container">
          <button
            className="scroll-arrow left"
            onClick={() => scroll(myListRef, "left")}
          >
            &lt;
          </button>
          <div className="carousel-items" ref={myListRef}>
            {getRandomMoviesAndShows(movies, tvShows, 10).map((item) => (
              <MovieCard
                key={item.id}
                id={item.id}
                poster={item.smallPoster}
                type={item.type}
              />
            ))}
          </div>
          <button
            className="scroll-arrow right"
            onClick={() => scroll(myListRef, "right")}
          >
            &gt;
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";
import "../styles/Movies.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [heroCarousels, setHeroCarousels] = useState([]);
  const [indianMovies, setIndianMovies] = useState([]);
  const [featuredIndianMovies, setFeaturedIndianMovies] = useState([]);
  const heroRefs = useRef([]);
  const categoryRefs = useRef({});
  const allMoviesRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        
        const [
          allMovies,
          featured,
          indian,
          featuredIndian
        ] = await Promise.all([
          axios.get("http://localhost:8080/api/movies"),
          axios.get("http://localhost:8080/api/movies/featured"),
          axios.get("http://localhost:8080/api/movies/indian"),
          axios.get("http://localhost:8080/api/movies/featuredIndian")
        ]);

        const allMoviesData = allMovies.data || [];
        const featuredData = featured.data || [];
        const indianData = indian.data || [];
        const featuredIndianData = featuredIndian.data || [];

        setMovies(allMoviesData);
        setIndianMovies(indianData);
        setFeaturedIndianMovies(featuredIndianData);

        setHeroCarousels([
          {
            title: "Featured Movies",
            subtitle: "Curated Selection of Premium Content",
            items: featuredData,
            cta: "Explore All",
            type: "featured"
          },
          {
            title: "Indian Cinema",
            subtitle: "Bollywood & Regional Masterpieces",
            items: featuredIndianData,
            cta: "View Indian Films",
            type: "indian"
          }
        ]);

        setFeaturedCategories([
          {
            title: "Trending Now",
            key: "trending",
            items: featuredData.slice(0, 9)
          },
          {
            title: "Staff Picks",
            key: "staffPicks",
            items: allMoviesData.sort(() => 0.5 - Math.random()).slice(0, 9)
          }
        ]);

      } catch (err) {
        setError("Failed to fetch movies. Please try again later.");
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const scroll = (ref, direction) => {
    if (ref && ref.current) {
      const scrollAmount = direction === "left" ? -800 : 800;
      ref.current.scrollLeft += scrollAmount;
    }
  };

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="movies-page">
      {heroCarousels.map((carousel, index) => (
        <section key={index} className="hero-carousel">
          <div className="carousel-header">
            <h2>{carousel.title}</h2>
            <p className="carousel-subtitle">{carousel.subtitle}</p>
            <Link 
              to="/collection"
              state={{ 
                title: carousel.title,
                items: carousel.items,
                type: "movie"
              }}
              className="cta-button"
            >
              {carousel.cta}
            </Link>
          </div>
          
          <div className="carousel-container">
            <button 
              className="scroll-arrow left" 
              onClick={() => scroll(heroRefs.current[index], "left")}
            >
              &lt;
            </button>
            
            <div 
              className="hero-carousel-items" 
              ref={el => heroRefs.current[index] = el}
            >
              {carousel.items.map(movie => (
                <Link 
                  to={`/movie/${movie.id}`} 
                  key={movie.id} 
                  className="hero-movie-card"
                >
                  <img 
                    src={movie.largePoster} 
                    alt={movie.title}
                    className="hero-poster"
                  />
                  <div className="hero-card-overlay">
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                  </div>
                </Link>
              ))}
            </div>
            
            <button 
              className="scroll-arrow right" 
              onClick={() => scroll(heroRefs.current[index], "right")}
            >
              &gt;
            </button>
          </div>
        </section>
      ))}

      {/* Featured Categories */}
      {featuredCategories.map((category) => {
        if (!categoryRefs.current[category.key]) {
          categoryRefs.current[category.key] = React.createRef();
        }

        return (
          <section key={category.key} className="featured-section">
            <div className="section-header">
              <h2>{category.title}</h2>
              <Link 
                to="/collection"
                state={{ 
                  title: `${category.title} Collection`,
                  items: category.items,
                  type: "movie"
                }}
                className="see-all"
              >
                See All
              </Link>
            </div>
            <div className="carousel-container">
              <button
                className="scroll-arrow left"
                onClick={() => scroll(categoryRefs.current[category.key], "left")}
              >
                &lt;
              </button>
              <div 
                className="category-carousel-items" 
                ref={categoryRefs.current[category.key]}
              >
                {category.items.map((movie) => (
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
                onClick={() => scroll(categoryRefs.current[category.key], "right")}
              >
                &gt;
              </button>
            </div>
          </section>
        );
      })}

      {/* Indian Movies Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Indian Cinema Collection</h2>
          <Link 
            to="/collection"
            state={{ 
              title: "Indian Cinema Collection",
              items: indianMovies,
              type: "movie"
            }}
            className="see-all"
          >
            See All
          </Link>
        </div>
        <div className="carousel-container">
          <button
            className="scroll-arrow left"
            onClick={() => scroll(categoryRefs.current.indian, "left")}
          >
            &lt;
          </button>
          <div className="category-carousel-items" ref={el => categoryRefs.current.indian = el}>
            {indianMovies.map(movie => (
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
            onClick={() => scroll(categoryRefs.current.indian, "right")}
          >
            &gt;
          </button>
        </div>
      </section>

      {/* All Movies Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>All Movies</h2>
          <Link 
            to="/collection"
            state={{ 
              title: "All Movies Collection",
              items: movies,
              type: "movie"
            }}
            className="see-all"
          >
            See All
          </Link>
        </div>
        <div className="carousel-container">
          <button
            className="scroll-arrow left"
            onClick={() => scroll(allMoviesRef, "left")}
          >
            &lt;
          </button>
          <div className="category-carousel-items" ref={allMoviesRef}>
            {movies.map(movie => (
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
            onClick={() => scroll(allMoviesRef, "right")}
          >
            &gt;
          </button>
        </div>
      </section>
    </div>
  );
};

export default Movies;
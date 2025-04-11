import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";
import "../styles/TVShows.css";

const TVShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [featuredTvShows, setFeaturedTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const allTvShowsRef = useRef(null);
  const featuredTvShowsRef = useRef(null);
  const languageRefs = useRef({});
  const popularRef = useRef(null);
  const acclaimedRef = useRef(null);
  const staffPicksRef = useRef(null);

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        setLoading(true);
        
        const [allShows, featuredShows] = await Promise.all([
          axios.get("https://stream-go-backend-c347838fb856.herokuapp.com/api/tvshows"),
          axios.get("https://stream-go-backend-c347838fb856.herokuapp.com/api/tvshows/featured")
        ]);

        setTvShows(allShows.data || []);
        setFeaturedTvShows(featuredShows.data || []);
      } catch (err) {
        setError("Failed to fetch TV Shows.");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTvShows();
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

  const getRandomShows = (count = 10) => {
    return [...tvShows]
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

  const tvShowsByLanguage = groupByLanguage(tvShows);
  const popularShows = getRandomShows(10);
  const acclaimedShows = getRandomShows(10);
  const staffPicks = getRandomShows(10);

  return (
    <div className="tvshows-page">
      {/* Featured TV Shows Hero Section */}
      <section className="hero-carousel">
        <div className="carousel-header">
          <h2>Featured TV Shows</h2>
          <p className="carousel-subtitle">Premium Selection of Top Shows</p>
          <Link 
            to="/collection"
            state={{ 
              title: "Featured TV Shows",
              items: featuredTvShows,
              type: "tvshow"
            }}
            className="cta-button"
          >
            Explore All
          </Link>
        </div>
        <div className="carousel-container">
          <button 
            className="scroll-arrow left" 
            onClick={() => scroll(featuredTvShowsRef, "left")}
          >
            &lt;
          </button>
          <div className="hero-carousel-items" ref={featuredTvShowsRef}>
            {featuredTvShows.map(show => (
              <Link 
                to={`/tvshow/${show.id}`} 
                key={show.id} 
                className="hero-movie-card"
              >
                <img 
                  src={show.largePoster} 
                  alt={show.title}
                  className="hero-poster"
                />
                <div className="hero-card-overlay">
                  <h3>{show.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          <button 
            className="scroll-arrow right" 
            onClick={() => scroll(featuredTvShowsRef, "right")}
          >
            &gt;
          </button>
        </div>
      </section>

      {/* Popular This Week Section */}
      <section className="hero-carousel">
        <div className="carousel-header">
          <h2>Popular This Week</h2>
          <p className="carousel-subtitle">Trending shows everyone's watching</p>
          <Link 
            to="/collection"
            state={{ 
              title: "Popular This Week TV Shows",
              items: popularShows,
              type: "tvshow"
            }}
            className="cta-button"
          >
            Explore All
          </Link>
        </div>
        <div className="carousel-container">
          <button 
            className="scroll-arrow left" 
            onClick={() => scroll(popularRef, "left")}
          >
            &lt;
          </button>
          <div className="hero-carousel-items" ref={popularRef}>
            {popularShows.map(show => (
              <Link 
                to={`/tvshow/${show.id}`} 
                key={show.id} 
                className="hero-movie-card"
              >
                <img 
                  src={show.largePoster || show.smallPoster} 
                  alt={show.title}
                  className="hero-poster"
                />
                <div className="hero-card-overlay">
                  <h3>{show.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          <button 
            className="scroll-arrow right" 
            onClick={() => scroll(popularRef, "right")}
          >
            &gt;
          </button>
        </div>
      </section>

      {/* Critically Acclaimed Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Critically Acclaimed</h2>
          <Link 
            to="/collection"
            state={{ 
              title: "Critically Acclaimed TV Shows",
              items: acclaimedShows,
              type: "tvshow"
            }}
            className="see-all"
          >
            See All
          </Link>
        </div>
        <div className="carousel-container">
          <button
            className="scroll-arrow left"
            onClick={() => scroll(acclaimedRef, "left")}
          >
            &lt;
          </button>
          <div className="carousel-items" ref={acclaimedRef}>
            {acclaimedShows.map((show) => (
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
            onClick={() => scroll(acclaimedRef, "right")}
          >
            &gt;
          </button>
        </div>
      </section>

      {/* Staff Picks Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Staff Picks</h2>
          <Link 
            to="/collection"
            state={{ 
              title: "Staff Picks TV Shows",
              items: staffPicks,
              type: "tvshow"
            }}
            className="see-all"
          >
            See All
          </Link>
        </div>
        <div className="carousel-container">
          <button
            className="scroll-arrow left"
            onClick={() => scroll(staffPicksRef, "left")}
          >
            &lt;
          </button>
          <div className="carousel-items" ref={staffPicksRef}>
            {staffPicks.map((show) => (
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
            onClick={() => scroll(staffPicksRef, "right")}
          >
            &gt;
          </button>
        </div>
      </section>

      {/* All TV Shows Section */}
      <section className="featured-section">
        <div className="section-header">
          <h2>All TV Shows</h2>
          <Link 
            to="/collection"
            state={{ 
              title: "All TV Shows",
              items: tvShows,
              type: "tvshow"
            }}
            className="see-all"
          >
            See All
          </Link>
        </div>
        <div className="carousel-container">
          <button
            className="scroll-arrow left"
            onClick={() => scroll(allTvShowsRef, "left")}
          >
            &lt;
          </button>
          <div className="carousel-items" ref={allTvShowsRef}>
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
            onClick={() => scroll(allTvShowsRef, "right")}
          >
            &gt;
          </button>
        </div>
      </section>
    </div>
  );
};

export default TVShows;
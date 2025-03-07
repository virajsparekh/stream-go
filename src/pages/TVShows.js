import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import "../styles/TVShows.css";

const TVShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const allTvShowsRef = useRef(null); 
  const languageRefs = useRef({}); 

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5004/tvShows");
        setTvShows(res.data || []);
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

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -500 : 500;
      ref.current.scrollLeft += scrollAmount;
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  const tvShowsByLanguage = groupByLanguage(tvShows);

  return (
    <div className="tvshows-page">
      <h2>All TV Shows</h2>
      <div className="movies-container">
        <button
          className="scroll-arrow scroll-arrow-left"
          onClick={() => scroll(allTvShowsRef, "left")}
        >
          &lt;
        </button>
        <div className="movies-grid" ref={allTvShowsRef}>
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
          onClick={() => scroll(allTvShowsRef, "right")}
        >
          &gt;
        </button>
      </div>

      {Object.keys(tvShowsByLanguage).map((language) => {
        if (!languageRefs.current[language]) {
          languageRefs.current[language] = React.createRef();
        }

        return (
          <section key={language}>
            <h3>{language} TV Shows</h3>
            <div className="movies-container">
              <button
                className="scroll-arrow scroll-arrow-left"
                onClick={() => scroll(languageRefs.current[language], "left")}
              >
                &lt;
              </button>
              <div className="movies-grid" ref={languageRefs.current[language]}>
                {tvShowsByLanguage[language].map((show) => (
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

export default TVShows;
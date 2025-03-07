import React from 'react';
import MovieCard from './MovieCard';
import '../styles/CinemaSpotlight.css';

const CinemaSpotlight = ({ title, movies }) => {
  const sectionRef = React.useRef(null);

  const scroll = (direction) => {
    if (sectionRef.current) {
      const scrollAmount = direction === 'left' ? -500 : 500;
      sectionRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <section className="cinema-spotlight">
      <h3>{title}</h3>
      <div className="movies-container">
        <button 
          className="scroll-arrow scroll-arrow-left" 
          onClick={() => scroll('left')}
        >
          &lt;
        </button>
        <div className="movies-grid" ref={sectionRef}>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              poster={movie.poster}
              type={movie.type}
            />
          ))}
        </div>
        <button 
          className="scroll-arrow scroll-arrow-right" 
          onClick={() => scroll('right')}
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default CinemaSpotlight;
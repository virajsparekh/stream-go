import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MovieCard.css";

const MovieCard = ({ id, poster, type }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${type}/${id}`);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img src={poster} alt="Poster" />
    </div>
  );
};

export default MovieCard;
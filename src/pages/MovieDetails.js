import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/MovieDetails.css";
import DarkModeToggle from "../components/DarkModeToggle";

const MovieDetails = () => {
  const { type, id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = type === 'movie' ? 'movies' : 'tvShows';
    axios.get(`http://localhost:5004/${endpoint}/${id}`)
      .then((res) => setItem(res.data))
      .catch((err) => {
        console.error(err);
        setError(`${type === 'movie' ? 'Movie' : 'TV Show'} not found!`);
      });
  }, [type, id]);

  if (error) return <h2 className="error-text">{error}</h2>;
  if (!item) return <h2 className="loading-text">Loading...</h2>;
  return (
    <div className="movie-details">
      <div className="details-container">
        <div className="poster-container">
          <img src={process.env.PUBLIC_URL + item.poster} alt={item.title} />
        </div>
        <div className="info-container">
          <h1>{item.title}</h1>
          <p className="synopsis">{item.synopsis}</p>
          <div className="pricing">
            <p className="rent-price">Rent: {item.rent_price}</p>
            <p className="purchase-price">Buy: {item.purchase_price}</p>
          </div>
          <div className="buttons">
            <button className="play-btn">▶ Play</button>
            <button className="rent-btn">💰 Rent</button>
            <button className="buy-btn">🛒 Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import '../styles/MovieDetails.css';
import { FaPlay, FaShoppingCart, FaTag, FaStar, FaChevronDown } from 'react-icons/fa';

const MovieDetails = () => {
    const { type, id } = useParams();
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showMoreInfo, setShowMoreInfo] = useState(false);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const endpoint = type === 'movie' ? 'movies' : 'tvshows';
                const response = await api[endpoint].getById(id);
                
                if (!response.data) {
                    throw new Error(`${type === 'movie' ? 'Movie' : 'TV Show'} not found!`);
                }
                
                setItem(response.data);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItem();
    }, [type, id]);

    if (loading) return <div className="loading-spinner"></div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!item) return <div className="not-found">Content not found</div>;

    const renderList = (items, fallback = "Not specified") => {
        if (!items || items.length === 0) return fallback;
        return items.join(', ');
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Unknown";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="movie-details">
            <div className="hero-banner" style={{
                backgroundImage: `linear-gradient(to top, rgba(20, 20, 20, 1), rgba(20, 20, 20, 0.5)), url(${item.largePoster})`
            }}>
                <div className="hero-content">
                    <h1 className="hero-title">
                        {item.title}
                        {item.featured && <span className="featured-badge">Featured</span>}
                    </h1>
                    
                    <div className="hero-meta">
                        <div className="rating-badge">
                            <FaStar className="star-icon" />
                            <span>{item.imdbRating ? `${item.imdbRating}/10` : 'N/A'}</span>
                        </div>
                        <span className="meta-item">{item.year || formatDate(item.releaseDate)}</span>
                        <span className="meta-item">
                            {type === 'movie' 
                                ? (item.runtime ? `${Math.floor(item.runtime / 60)}h ${item.runtime % 60}m` : 'N/A')
                                : (item.seasons ? `${item.seasons} season${item.seasons !== 1 ? 's' : ''}` : 'N/A')}
                        </span>
                        <span className="meta-item">{renderList(item.genres)}</span>
                    </div>
                    
                    <div className="hero-buttons">
                        <button className="play-button">
                            <FaPlay /> Play
                        </button>
                        <button className="action-button">
                            <FaShoppingCart /> Buy {item.purchasePrice || 'N/A'}
                        </button>
                        <button className="action-button">
                            <FaTag /> Rent {item.rentPrice || 'N/A'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="content-container">
                <div className="content-wrapper">
                    {/* Synopsis */}
                    <div className="synopsis-section">
                        <h2>Overview</h2>
                        <p className="synopsis-text">
                            {item.synopsis || 'No synopsis available.'}
                        </p>
                    </div>

                    {/* Additional Info */}
                    <div className={`info-section ${showMoreInfo ? 'expanded' : ''}`}>
                        <h3>Details</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <strong>Country</strong>
                                <span>{renderList(item.countries)}</span>
                            </div>
                            <div className="info-item">
                                <strong>Language</strong>
                                <span>{renderList(item.languages)}</span>
                            </div>
                            {type === 'movie' && item.movieCountry && (
                                <div className="info-item">
                                    <strong>Industry</strong>
                                    <span>{item.movieCountry}</span>
                                </div>
                            )}
                            <div className="info-item">
                                <strong>Production</strong>
                                <span>{renderList(item.productionCompanies)}</span>
                            </div>
                            {type === 'movie' && item.budget && (
                                <div className="info-item">
                                    <strong>Budget</strong>
                                <span>${item.budget.toLocaleString()}</span>
                                </div>
                            )}
                            {item.createdAt && (
                                <div className="info-item">
                                    <strong>Added</strong>
                                    <span>{formatDate(item.createdAt)}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <button 
                        className="toggle-info-button"
                        onClick={() => setShowMoreInfo(!showMoreInfo)}
                    >
                        {showMoreInfo ? 'Show Less' : 'Show More'} <FaChevronDown className={`chevron ${showMoreInfo ? 'up' : ''}`} />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default MovieDetails;
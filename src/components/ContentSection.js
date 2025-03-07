import React from 'react';
import '../styles/ContentSection.css';

const ContentSection = ({ title, description, image, reverse, ctaText = 'Learn More' }) => {
  return (
    <section className={`content-section ${reverse ? 'reverse' : ''}`}>
      <div className="text-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <button className="cta-btn">{ctaText}</button>
      </div>
      <div className="image-container">
        <img src={image} alt={title} />
      </div>
    </section>
  );
};

export default ContentSection;
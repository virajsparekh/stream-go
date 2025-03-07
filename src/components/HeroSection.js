import React, { useState, useEffect } from 'react';
import '../styles/HeroSection.css';

const Hero = () => {
  const slides = [
    {
      image: '/images/image.png',
      title: 'BLACK & WHITE CINEMA',
      subtitle: 'Mix & Match 2 for $9.99',
      text: 'The Lighthouse'
    },
    {
      image: '/images/shahrukhkhandon2.jpg',
      title: 'ACTOR\'S SPOTLIGHT',
      subtitle: 'Award-Winning Performances',
      text: '2021 Masterpieces'
    },
    {
      image: '/images/mny.jpg',
      title: 'NEW RELEASES',
      subtitle: 'Experience the Latest Blockbusters',
      text: 'Now Streaming'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="hero">
      <div className="slides-container">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`slide ${index === activeIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p className="subtitle">{slide.subtitle}</p>
              <p className="highlight-text">{slide.text}</p>
              <button className="cta-btn">Explore Collection</button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button className="carousel-arrow prev-arrow" onClick={goToPrev}>
        &lt;
      </button>
      <button className="carousel-arrow next-arrow" onClick={goToNext}>
        &gt;
      </button>

      {/* Dots Navigation */}
      <div className="dots-container">
        {slides.map((_, index) => (
          <span 
            key={index}
            className={`dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
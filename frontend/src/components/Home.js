// src/components/Home.js

import React from 'react';
import HeroSection from './HeroSection';
import CardsSection from './CardsSection';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="overlay"></div>
      <HeroSection />
      <CardsSection />
    </div>
  );
};

export default Home;

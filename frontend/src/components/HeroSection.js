// src/components/HeroSection.js

import React from 'react';
import Typewriter from './Typewriter';
import '../styles/Home.css';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <h1>
        <Typewriter text="Bienvenidos a Bulletproof" />
      </h1>
      <p className="hero-description">
        Descubre lo último en tecnología y encuentra los dispositivos que transformarán tu experiencia diaria, Ofresiendote lo mejor siempre. 
      </p>
    </div>
  );
};

export default HeroSection;

// src/components/HeroSection.js

import React from 'react';
import Typewriter from './Typewriter';
import '../styles/Home.css';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <h1>
        <Typewriter text="Bienvenido a Marvin Shop" />
      </h1>
      <p className="hero-description">
        Descubre lo último en tecnología y encuentra los dispositivos que transformarán tu experiencia diaria. 
      </p>
    </div>
  );
};

export default HeroSection;

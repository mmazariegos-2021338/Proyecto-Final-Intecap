// src/components/CardsSection.js

import React from 'react';
import '../styles/Home.css';

const CardsSection = () => {
  return (
    <div className="cards-section">
      <div className="card">
        <img
          src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzQ4fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400"
          alt="Productos Destacados"
          className="card-image"
        />
        <h2 className="card-title">Productos Destacados</h2>
        <p className="card-description">
          Conoce nuestros productos estrella, seleccionados por nuestros clientes para ofrecerte la mejor experiencia tecnológica. Innovación y calidad a tu alcance.
        </p>
      </div>
      <div className="card">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQTMALCaUNe14XFJbasfSI0SoyfFP1HRyDRQ&s"
          alt="Ofertas y Promociones"
          className="card-image"
        />
        <h2 className="card-title">Ofertas y Promociones</h2>
        <p className="card-description">
          No dejes pasar nuestras promociones exclusivas y ofertas irresistibles. Aprovecha esta oportunidad para actualizar tu tecnología con precios especiales.
        </p>
      </div>
      <div className="card">
        <img
          src="https://especializate.usat.edu.pe/wp-content/uploads/2022/05/servicio-al-cliente-importancia.jpg"
          alt="Atención al Cliente"
          className="card-image"
        />
        <h2 className="card-title">Atención al Cliente</h2>
        <p className="card-description">
          Estamos aquí para acompañarte en cada paso. Nuestro equipo de soporte está siempre dispuesto a resolver tus dudas y ayudarte a aprovechar al máximo tus productos.
        </p>
      </div>
    </div>
  );
};

export default CardsSection;

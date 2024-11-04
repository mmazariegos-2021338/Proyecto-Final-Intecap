// src/components/Navbar.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica si hay un token en localStorage
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY - lastScrollY > 50) {
        setShowNavbar(false);
      } else if (lastScrollY - window.scrollY > 50) {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirige a la página de login
  };

  return (
    <nav
      style={{
        display: showNavbar ? 'flex' : 'none', // Ocultar o mostrar el navbar de inmediato
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#000',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <ul style={{
        listStyleType: 'none',
        display: 'flex',
        gap: '1.5rem',
        margin: 0,
        padding: 0,
      }}>
        <li><Link to="/" style={linkStyle}>Inicio</Link></li>
        <li><Link to="/productos" style={linkStyle}>Productos</Link></li>

        {}
        {isAuthenticated && (
          <>
            <li><Link to="/cliente" style={linkStyle}>Clientes</Link></li>
            <li><Link to="/dashboard-clientes" style={linkStyle}>Gestionar Clientes</Link></li>
            <li><Link to="/dashboard-productos" style={linkStyle}>Gestionar Productos</Link></li>
            <li><Link to="/ventas" style={linkStyle}>Registrar Venta</Link></li>
            <li><Link to="/reporte-ventas" style={linkStyle}>Reporte de Ventas</Link></li>
          </>
        )}
      </ul>

      {isAuthenticated ? (
        <button onClick={handleLogout} style={logoutButtonStyle}>
          Cerrar Sesión
        </button>
      ) : (
        <Link to="/login" style={loginLinkStyle}>Iniciar Sesión</Link>
      )}
    </nav>
  );
}

const linkStyle = {
  color: '#4caf50',
  textDecoration: 'none',
  fontSize: '1.1rem',
  fontWeight: 'bold',
};

const logoutButtonStyle = {
  backgroundColor: '#ff4d4d',
  color: 'white',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  fontSize: '1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const loginLinkStyle = {
  color: '#4caf50',
  textDecoration: 'none',
  fontSize: '1.1rem',
  fontWeight: 'bold',
};

export default Navbar;

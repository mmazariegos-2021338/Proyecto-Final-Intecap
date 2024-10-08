// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <h1>BULLETPROOF</h1>
      </div>
      <ul style={styles.navLinks}>
        <li>
          <Link
            to="/"
            style={styles.link}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            Inicio
          </Link>
        </li>
        <li>
          <Link
            to="/clientes"
            style={styles.link}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            Clientes
          </Link>
        </li>
        <li>
          <Link
            to="/productos"
            style={styles.link}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            Productos
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard-clientes"
            style={styles.link}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            Gestión de Clientes
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard-productos"
            style={styles.link}
            onMouseEnter={(e) => handleHover(e, true)}
            onMouseLeave={(e) => handleHover(e, false)}
          >
            Gestión de Productos
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const handleHover = (e, isHovering) => {
  e.target.style.color = isHovering ? '#4caf50' : '#fff';
};

const styles = {
  nav: {
    padding: '20px 50px',
    backgroundColor: '#1c1c1e',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    fontSize: '1.5em',
    fontWeight: 'bold',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '30px',
    marginLeft: 'auto',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.1em',
    transition: 'color 0.3s',
  },
};

export default Navbar;

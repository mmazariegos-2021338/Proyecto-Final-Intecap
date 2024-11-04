// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ClientesList from './components/ClientesList';
import ProductosList from './components/ProductosList';
import ProductsDashboard from './components/ProductsDashboard';
import ClientsDashboard from './components/ClientsDashboard';
import Login from './components/login';
import VentaForm from './components/VentaForm';
import VentasList from './components/VentasList';

function App() {
  const isAuthenticated = !!localStorage.getItem('token'); // Verifica si el usuario está autenticado

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productos" element={<ProductosList />} />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard-clientes"
          element={isAuthenticated ? <ClientsDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard-productos"
          element={isAuthenticated ? <ProductsDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/cliente"
          element={isAuthenticated ? <ClientesList /> : <Navigate to="/login" />}
        />
        <Route
          path="/ventas"
          element={isAuthenticated ? <VentaForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/reporte-ventas"
          element={isAuthenticated ? <VentasList /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

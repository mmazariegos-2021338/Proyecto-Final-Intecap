// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ClientesList from './components/ClientesList'; // Mantén el nombre ClientesList
import ProductosList from './components/ProductosList'; // Mantén el nombre ProductosList
import ProductsDashboard from './components/ProductsDashboard';
import ClientsDashboard from './components/ClientsDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<ClientesList />} />
        <Route path="/productos" element={<ProductosList />} />
        <Route path="/dashboard-clientes" element={<ClientsDashboard />} />
        <Route path="/dashboard-productos" element={<ProductsDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

// src/components/ProductForm.js

import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import api from '../services/api';

const ProductForm = ({ selectedProduct, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    stock: ''
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        nombre: selectedProduct.nombre,
        precio: selectedProduct.precio,
        stock: selectedProduct.stock
      });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedProduct) {
      // Editar producto existente
      api.put(`/productos/editar/${selectedProduct.id}`, formData)
        .then(() => {
          alert('Producto editado correctamente');
          onSuccess();
        })
        .catch((error) => {
          console.error('Error al editar producto:', error);
        });
    } else {
      // Agregar nuevo producto
      api.post('/productos/guardar', formData)
        .then(() => {
          alert('Producto agregado correctamente');
          onSuccess();
        })
        .catch((error) => {
          console.error('Error al agregar producto:', error);
        });
    }
  };

  return (
    <Container sx={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        {selectedProduct ? 'Editar Producto' : 'Agregar Producto'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Precio"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {selectedProduct ? 'Guardar Cambios' : 'Agregar Producto'}
        </Button>
      </form>
    </Container>
  );
};

export default ProductForm;

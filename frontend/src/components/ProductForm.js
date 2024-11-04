// src/components/ProductForm.js

import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import Swal from 'sweetalert2';
import api from '../services/api';

const FormContainer = styled(Paper)({
  padding: '2rem',
  maxWidth: '400px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '8px',
  backgroundColor: 'rgba(30, 30, 30, 0.9)',
  color: '#ffffff',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
});

const StyledTextField = styled(TextField)({
  marginBottom: '1.5rem',
  '& .MuiInputBase-root': {
    backgroundColor: '#333',
    borderRadius: '4px',
    color: '#fff',
  },
  '& .MuiFormLabel-root': {
    color: '#888',
  },
  '& .MuiFormLabel-root.Mui-focused': {
    color: '#4CAF50',
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#4CAF50',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#388E3C',
  },
});

const ProductForm = ({ selectedProduct, onFormSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    stock: '',
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        nombre: selectedProduct.nombre,
        precio: selectedProduct.precio,
        stock: selectedProduct.stock,
      });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiCall = selectedProduct
      ? api.put(`/productos/actualizar/${selectedProduct.id}`, formData)
      : api.post('/productos/guardar', formData);

    apiCall
      .then((response) => {
        Swal.fire({
          title: selectedProduct ? 'Producto editado correctamente' : 'Producto agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        onFormSubmit(response.data); 
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text: selectedProduct ? 'Error al editar producto' : 'Error al agregar producto',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
        console.error(selectedProduct ? 'Error al editar producto:' : 'Error al agregar producto:', error);
      });
  };

  return (
    <FormContainer elevation={3}>
      <Typography variant="h5" gutterBottom>
        {selectedProduct ? 'Editar Producto' : 'Agregar Producto'}
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <StyledTextField
          label="Nombre"
          name="nombre"
          variant="outlined"
          fullWidth
          value={formData.nombre}
          onChange={handleChange}
        />
        <StyledTextField
          label="Precio"
          name="precio"
          variant="outlined"
          fullWidth
          value={formData.precio}
          onChange={handleChange}
        />
        <StyledTextField
          label="Stock"
          name="stock"
          variant="outlined"
          fullWidth
          value={formData.stock}
          onChange={handleChange}
        />
        <StyledButton type="submit" variant="contained" fullWidth>
          {selectedProduct ? 'Guardar Cambios' : 'Agregar Producto'}
        </StyledButton>
      </form>
    </FormContainer>
  );
};

export default ProductForm;

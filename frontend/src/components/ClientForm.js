// src/components/ClientForm.js

import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import api from '../services/api';

const ClientForm = ({ selectedClient, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: ''
  });

  useEffect(() => {
    if (selectedClient) {
      setFormData({
        nombre: selectedClient.nombre,
        apellido: selectedClient.apellido
      });
    }
  }, [selectedClient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedClient) {
      // Editar cliente existente
      api.put(`/clientes/editar/${selectedClient.id}`, formData)
        .then((response) => {
          alert('Cliente editado correctamente');
          onSuccess(response.data); // Pasar el cliente actualizado
        })
        .catch((error) => {
          console.error('Error al editar cliente:', error);
        });
    } else {
      // Agregar nuevo cliente
      api.post('/clientes/guardar', formData)
        .then((response) => {
          alert('Cliente agregado correctamente');
          onSuccess(response.data); // Pasar el nuevo cliente
        })
        .catch((error) => {
          console.error('Error al agregar cliente:', error);
        });
    }
  };

  return (
    <Container sx={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        {selectedClient ? 'Editar Cliente' : 'Agregar Cliente'}
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
          label="Apellido"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          {selectedClient ? 'Guardar Cambios' : 'Agregar Cliente'}
        </Button>
      </form>
    </Container>
  );
};

export default ClientForm;

// src/components/ClientesList.js

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Container } from '@mui/material';
import api from '../services/api';

const ClientesList = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    // Cargar datos de clientes desde el backend
    api.get('/clientes/listar')
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar los clientes:', error);
      });
  }, []);

  return (
    <Container sx={{ padding: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Lista de Clientes
      </Typography>
      <Grid container spacing={3}>
        {clientes.map((cliente, index) => (
          <Grid item xs={12} sm={6} md={4} key={cliente.id}>
            <Card sx={{ boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', backgroundColor: '#1c1c1e', color: '#fff' }}>
              <CardMedia
                component="img"
                height="140"
                image={`https://randomuser.me/api/portraits/men/${(index % 100)}.jpg`} 
                alt="User Profile"
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {cliente.nombre} {cliente.apellido}
                </Typography>
                <Typography variant="body2">
                  ID: {cliente.id}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ClientesList;

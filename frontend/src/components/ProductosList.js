// src/components/ProductosList.js

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Container } from '@mui/material';
import api from '../services/api';

const ProductosList = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
  
    api.get('/productos/listar')
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar los productos:', error);
      });
  }, []);

 
  const productImages = {
    laptop: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    smartphone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    tablet: 'https://images.unsplash.com/photo-1557431077-88f2a5a5b6fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    smartwatch: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    headphone: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  };

  
  const getProductImage = (nombre) => {
    const lowerCaseName = nombre.toLowerCase();

   
    for (const [key, value] of Object.entries(productImages)) {
      if (lowerCaseName.includes(key)) {
        return value;
      }
    }

    
    return 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400';
  };

  return (
    <Container sx={{ padding: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Lista de Productos
      </Typography>
      <Grid container spacing={3}>
        {productos.map((producto) => (
          <Grid item xs={12} sm={6} md={4} key={producto.id}>
            <Card sx={{ boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', backgroundColor: '#1c1c1e', color: '#fff' }}>
              <CardMedia
                component="img"
                height="140"
                image={getProductImage(producto.nombre)} 
                alt={producto.nombre}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {producto.nombre}
                </Typography>
                <Typography variant="body2">
                  Precio: ${producto.precio}
                </Typography>
                <Typography variant="body2">
                  Stock: {producto.stock}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductosList;

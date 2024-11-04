import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Container } from '@mui/material';
import { styled } from '@mui/system';
import Swal from 'sweetalert2';
import api from '../services/api';

const BackgroundWrapper = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  backgroundImage: 'url("https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzQ4fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=2000")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  padding: '50px',
});

const StyledContainer = styled(Container)({
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  borderRadius: '15px',
  padding: '50px',
  color: '#fff',
  boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.4)',
});

const Title = styled(Typography)({
  fontSize: '2.5rem',
  color: '#4CAF50',
  textAlign: 'center',
  marginBottom: '2rem',
  textShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)',
});

const StyledCard = styled(Card)({
  boxShadow: '0px 8px 20px rgba(0, 255, 0, 0.2)',
  backgroundColor: '#1f1f1f',
  color: '#fff',
  borderRadius: '15px',
  overflow: 'hidden',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0px 15px 30px rgba(0, 255, 0, 0.4)',
  },
});

const CardInfo = styled(CardContent)({
  padding: '20px',
  textAlign: 'center',
});

const ProductosList = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    api.get('/productos/listar')
      .then((response) => setProductos(response.data))
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al cargar los productos. Por favor, intenta de nuevo.',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
        console.error('Error al cargar los productos:', error);
      });
  }, []);

  const getProductImage = (nombre) => {
    const images = {
      'Laptop ASUS ZenBook': 'https://img.pacifiko.com/PROD/resize/1/500x500/M2FhMDA2ZD.jpg',
      'Smartphone Samsung Galaxy S21': 'https://i.blogs.es/d9faf7/samsung-galaxy-s21-ultra-00-02/1366_2000.jpg',
      'Tablet iPad Pro 11"': 'https://ishop.gt/cdn/shop/files/IMG-13192519_7d906edd-1e50-496b-b0a6-9d6b5b788449.jpg?v=1718924803&width=823',
      'Smartwatch Apple Watch Series 6': 'https://www.apple.com/newsroom/images/product/watch/standard/Apple_delivers-apple-watch-series-6_09152020_big.jpg.large.jpg',
      'Auriculares Sony WH-1000XM4': 'https://tecnocat.com.mx/wp-content/uploads/2021/01/SONY-WH1000XM4-800x445.jpg',
      'Teclado Mecánico Logitech G915': 'https://img.pacifiko.com/PROD/resize/1/1000x1000/ZTQ4ZGJjND_4.jpg',
      'Cámara GoPro HERO9': 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      'Monitor Dell UltraSharp 27"': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5V6FkxMEoMf1FbCHoErhk6QnnYyhmjBCDwMcrZrOec9eaieHOy5Vmim7lT1xWzKd059s&usqp=CAU',
      'Laptop Lenovo ThinkPad X1': 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    };
    return images[nombre] || 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400';
  };

  return (
    <BackgroundWrapper>
      <StyledContainer maxWidth="lg">
        <Title variant="h4">Lista de Productos</Title>
        <Grid container spacing={4}>
          {productos.map((producto) => (
            <Grid item xs={12} sm={6} md={4} key={producto.id}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={getProductImage(producto.nombre)}
                  alt={producto.nombre}
                />
                <CardInfo>
                  <Typography variant="h5" style={{ color: '#4CAF50', fontWeight: 'bold' }} gutterBottom>
                    {producto.nombre}
                  </Typography>
                  <Typography variant="body2" style={{ color: '#e0e0e0', marginBottom: '0.5rem' }}>
                    Precio: ${producto.precio}
                  </Typography>
                  <Typography variant="body2" style={{ color: '#e0e0e0' }}>
                    Stock: {producto.stock}
                  </Typography>
                  <Typography variant="body2" style={{ color: '#e0e0e0', marginTop: '1rem' }}>
                    {producto.descripcion}
                  </Typography>
                </CardInfo>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </StyledContainer>
    </BackgroundWrapper>
  );
};

export default ProductosList;

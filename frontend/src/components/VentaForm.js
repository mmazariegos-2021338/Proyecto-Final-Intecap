import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Typography, Paper, Container } from '@mui/material';
import { styled } from '@mui/system';
import Swal from 'sweetalert2';
import api from '../services/api';

const FormContainer = styled(Paper)({
  padding: '2rem',
  maxWidth: '500px',
  margin: '2rem auto',
  borderRadius: '10px',
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

const VentaForm = ({ onSave }) => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    productoId: '',
    cantidad: '',
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    api.get('/productos/listar')
      .then((response) => setProductos(response.data))
      .catch((error) => console.error('Error al obtener productos:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'productoId') {
      const selectedProduct = productos.find(product => product.id === parseInt(value));
      setFormData((prevState) => ({ ...prevState, productoId: value }));
      if (selectedProduct && formData.cantidad) {
        setTotal(selectedProduct.precio * formData.cantidad);
      }
    } else if (name === 'cantidad') {
      const cantidad = parseInt(value);
      setFormData((prevState) => ({ ...prevState, cantidad }));
      if (formData.productoId) {
        const selectedProduct = productos.find(product => product.id === parseInt(formData.productoId));
        if (selectedProduct) {
          setTotal(selectedProduct.precio * cantidad);
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
   
    if (!formData.productoId || !formData.cantidad || formData.cantidad <= 0) {
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios y la cantidad debe ser mayor que 0.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
      return;
    }
  
    const ventaData = {
      productoId: parseInt(formData.productoId),
      cantidad: formData.cantidad,
      total: total,
    };
  
    api.post('/ventas/guardar', ventaData)
      .then(() => {
        Swal.fire({
          title: 'Venta registrada exitosamente',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        onSave && onSave();
        setFormData({ productoId: '', cantidad: '' });
        setTotal(0);
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text: 'Error al registrar la venta',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
  
       
        console.error('Detalles del error:', error.response?.data || error.message);
      });
  };
  

  return (
    <Container>
      <FormContainer elevation={3}>
        <Typography variant="h5" gutterBottom style={{ textAlign: 'center', color: '#4CAF50' }}>
          Registrar Venta
        </Typography>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            select
            label="Producto"
            name="productoId"
            value={formData.productoId}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            required
          >
            {productos.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.nombre} - ${product.precio}
              </MenuItem>
            ))}
          </StyledTextField>
          <StyledTextField
            label="Cantidad"
            name="cantidad"
            type="number"
            value={formData.cantidad}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            required
          />
          <StyledTextField
            label="Total"
            name="total"
            value={total}
            fullWidth
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
          <StyledButton type="submit" variant="contained" fullWidth>
            Registrar Venta
          </StyledButton>
        </form>
      </FormContainer>
    </Container>
  );
};

export default VentaForm;

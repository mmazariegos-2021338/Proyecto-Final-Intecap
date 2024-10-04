// src/components/ProductsDashboard.js

import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Dialog, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import api from '../services/api';
import ProductForm from './ProductForm';

const ProductsDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = () => {
    api.get('/productos/listar')
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar los productos:', error);
      });
  };

  const handleOpenForm = (product) => {
    setSelectedProduct(product);
    setOpenForm(true);
  };

  const handleCloseForm = (updatedProduct) => {
    if (updatedProduct) {
      if (selectedProduct) {
        // Actualizar producto existente
        setProductos(productos.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        ));
      } else {
        // Agregar nuevo producto
        setProductos([...productos, updatedProduct]);
      }
    }
    setSelectedProduct(null);
    setOpenForm(false);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      api.delete(`/productos/eliminar/${productId}`)
        .then(() => {
          alert('Producto eliminado correctamente');
          setProductos(productos.filter((product) => product.id !== productId));
        })
        .catch((error) => {
          console.error('Error al eliminar producto:', error);
        });
    }
  };

  return (
    <Container sx={{ padding: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Productos
      </Typography>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenForm(null)} sx={{ marginBottom: '20px' }}>
        Agregar Producto
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell>{producto.id}</TableCell>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell>${producto.precio}</TableCell>
                <TableCell>{producto.stock}</TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleOpenForm(producto)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteProduct(producto.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openForm} onClose={() => handleCloseForm()}>
        <DialogContent>
          <ProductForm selectedProduct={selectedProduct} onSuccess={handleCloseForm} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ProductsDashboard;

// src/components/ProductsDashboard.js

import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Dialog, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { styled } from '@mui/system';
import Swal from 'sweetalert2';
import api from '../services/api';
import ProductForm from './ProductForm';

const BackgroundWrapper = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: 'url("https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzQ4fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=2000")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  padding: '50px',
});

const StyledContainer = styled(Container)({
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  borderRadius: '15px',
  padding: '30px',
  color: '#fff',
  boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.4)',
  maxWidth: '900px',
});

const StyledTableCell = styled(TableCell)({
  color: '#FFFFFF',
  fontWeight: 'bold',
});

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

  const handleOpenForm = (product = null) => {
    setSelectedProduct(product);
    setOpenForm(true);
  };

  const handleCloseForm = (updatedProduct = null) => {
    if (updatedProduct) {
      setProductos((prevProductos) =>
        selectedProduct
          ? prevProductos.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
          : [...prevProductos, updatedProduct]
      );
    }
    setSelectedProduct(null);
    setOpenForm(false);
  };

  const handleDeleteProduct = (productId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el producto de forma permanente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/productos/eliminar/${productId}`)
          .then(() => {
            Swal.fire({
              title: 'Eliminado',
              text: 'El producto ha sido eliminado correctamente.',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            setProductos((prevProductos) => prevProductos.filter((product) => product.id !== productId));
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al eliminar el producto.',
              icon: 'error',
              confirmButtonText: 'Cerrar',
            });
            console.error('Error al eliminar producto:', error);
          });
      }
    });
  };

  return (
    <BackgroundWrapper>
      <StyledContainer>
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center', color: '#4CAF50' }}>
          Gestión de Productos
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenForm()}
          sx={{
            backgroundColor: '#4CAF50',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#388E3C',
            },
            marginBottom: '20px',
          }}
        >
          Agregar Producto
        </Button>
        <TableContainer component={Paper} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '10px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>Precio</StyledTableCell>
                <StyledTableCell>Stock</StyledTableCell>
                <StyledTableCell>Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.map((producto) => (
                <TableRow key={producto.id}>
                  <StyledTableCell>{producto.id}</StyledTableCell>
                  <StyledTableCell>{producto.nombre}</StyledTableCell>
                  <StyledTableCell>${producto.precio}</StyledTableCell>
                  <StyledTableCell>{producto.stock}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton color="secondary" onClick={() => handleOpenForm(producto)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteProduct(producto.id)}>
                      <Delete />
                    </IconButton>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={openForm} onClose={() => handleCloseForm()}>
          <DialogContent>
            <ProductForm selectedProduct={selectedProduct} onFormSubmit={handleCloseForm} />
          </DialogContent>
        </Dialog>
      </StyledContainer>
    </BackgroundWrapper>
  );
};

export default ProductsDashboard;

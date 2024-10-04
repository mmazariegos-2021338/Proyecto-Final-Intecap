// src/components/ClientsDashboard.js

import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Dialog, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import api from '../services/api';
import ClientForm from './ClientForm';

const ClientsDashboard = () => {
  const [clientes, setClientes] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = () => {
    api.get('/clientes/listar')
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar los clientes:', error);
      });
  };

  const handleOpenForm = (client) => {
    setSelectedClient(client);
    setOpenForm(true);
  };

  const handleCloseForm = (updatedClient) => {
    if (updatedClient) {
      if (selectedClient) {
        // Actualizar cliente existente
        setClientes(clientes.map((client) =>
          client.id === updatedClient.id ? updatedClient : client
        ));
      } else {
        // Agregar nuevo cliente
        setClientes([...clientes, updatedClient]);
      }
    }
    setSelectedClient(null);
    setOpenForm(false);
  };

  const handleDeleteClient = (clientId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      api.delete(`/clientes/eliminar/${clientId}`)
        .then(() => {
          alert('Cliente eliminado correctamente');
          setClientes(clientes.filter((client) => client.id !== clientId));
        })
        .catch((error) => {
          console.error('Error al eliminar cliente:', error);
        });
    }
  };

  return (
    <Container sx={{ padding: '30px' }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Clientes
      </Typography>
      <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenForm(null)} sx={{ marginBottom: '20px' }}>
        Agregar Cliente
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell>{cliente.id}</TableCell>
                <TableCell>{cliente.nombre}</TableCell>
                <TableCell>{cliente.apellido}</TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleOpenForm(cliente)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteClient(cliente.id)}>
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
          <ClientForm selectedClient={selectedClient} onSuccess={handleCloseForm} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ClientsDashboard;

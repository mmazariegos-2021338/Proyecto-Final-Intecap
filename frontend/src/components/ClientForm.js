// src/components/ClientList.js js
import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, TextField, Container, Typography, Button, Dialog,
  DialogActions, DialogContent, DialogTitle, IconButton
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import api from '../services/api'; // Suponiendo que tienes este servicio configurado
import '../styles/Home.css';


const ClientList = () => {
  const [clients, setClients] = useState([]); // Lista de clientes
  const [filteredClients, setFilteredClients] = useState([]); // Lista filtrada
  const [searchQuery, setSearchQuery] = useState(''); // Búsqueda
  const [page, setPage] = useState(0); // Página actual
  const [rowsPerPage, setRowsPerPage] = useState(5); // Filas por página
  const [openDialog, setOpenDialog] = useState(false); // Estado del modal
  const [currentClient, setCurrentClient] = useState(null); // Cliente seleccionado
  const [formData, setFormData] = useState({ nombre: '', apellido: '', }); // Datos del formulario

  // Obtener clientes de la API
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    api.get('/clientes/listar')
      .then((response) => {
        setClients(response.data);
        setFilteredClients(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener clientes:', error);
      });
  };

  // Filtrar clientes por búsqueda
  useEffect(() => {
    const results = clients.filter(client =>
      client.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.apellido.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredClients(results);
  }, [searchQuery, clients]);

  // Abrir el modal para agregar o editar cliente
  const handleOpenDialog = (client = null) => {
    setCurrentClient(client); // Si es null, es agregar
    setFormData(client ? { nombre: client.nombre, apellido: client.apellido } : { nombre: '', apellido: '' , });
    setOpenDialog(true);
  };

  // Cerrar el modal
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Guardar o actualizar cliente
  const handleSaveClient = () => {
    if (currentClient) {
      // Editar cliente
      api.put(`/clientes/editar/${currentClient.id}`, formData)
        .then(() => {
          alert('Cliente actualizado correctamente');
          fetchClients();
          handleCloseDialog();
        })
        .catch((error) => {
          console.error('Error al editar cliente:', error);
        });
    } else {
      // Agregar nuevo cliente
      api.post('/clientes/guardar', formData)
        .then(() => {
          alert('Cliente agregado correctamente');
          fetchClients();
          handleCloseDialog();
        })
        .catch((error) => {
          console.error('Error al agregar cliente:', error);
        });
    }
  };

  // Eliminar cliente
  const handleDeleteClient = (clientId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      api.delete(`/clientes/eliminar/${clientId}`)
        .then(() => {
          alert('Cliente eliminado correctamente');
          fetchClients();
        })
        .catch((error) => {
          console.error('Error al eliminar cliente:', error);
        });
    }
  };

  // Cambiar la página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Cambiar el número de filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container   
   sx={{ marginTop: 4, 
    backgroundColor: '#e0f7fa', // Color de fondo
    minHeight: '100vh', // Asegura que cubra toda la pantalla
    padding: '50px', // Opcional
    }}>

      <Typography variant="h4" gutterBottom>
        Lista de Clientes
      </Typography>

      {/* Campo de búsqueda */}
      <TextField
        label="Buscar por Nombre o Apellido"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Botón para agregar cliente */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleOpenDialog()}
        sx={{ marginBottom: 2 }}
      >
        Agregar Cliente
      </Button>

      {/* Tabla de clientes */}
      <TableContainer className='color' component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Producto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.id}</TableCell>
                <TableCell>{client.nombre}</TableCell>
                <TableCell>{client.apellido}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpenDialog(client)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClient(client.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginación */}
      <TablePagination
        component="div"
        count={filteredClients.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
      />

      {/* Modal de agregar/editar cliente */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{currentClient ? 'Editar Cliente' : 'Agregar Cliente'}</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSaveClient} color="primary">
            {currentClient ? 'Guardar Cambios' : 'Agregar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClientList;

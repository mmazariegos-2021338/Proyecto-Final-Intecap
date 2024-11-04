import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, TextField, Typography, Button, Dialog,
  DialogActions, DialogContent, DialogTitle, IconButton
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { Container } from '@mui/material';
import { styled } from '@mui/system';
import Swal from 'sweetalert2';
import api from '../services/api';

const StyledContainer = styled(Container)({
  marginTop: '4rem',
  backgroundColor: 'rgba(30, 30, 30, 0.9)',
  minHeight: '100vh',
  padding: '2rem',
  borderRadius: '10px',
  color: '#ffffff',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.4)',
});

const StyledTextField = styled(TextField)({
  marginBottom: '1rem',
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
  marginBottom: '1rem',
});

const StyledTableContainer = styled(TableContainer)({
  backgroundColor: '#1c1c1e',
});

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', apellido: '' });

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

  useEffect(() => {
    const results = clients.filter(client =>
      (client.nombre ? client.nombre.toLowerCase() : "").includes(searchQuery.toLowerCase()) ||
      (client.apellido ? client.apellido.toLowerCase() : "").includes(searchQuery.toLowerCase())
    );
    setFilteredClients(results);
  }, [searchQuery, clients]);

  const handleOpenDialog = (client = null) => {
    setSelectedClient(client);
    setFormData(client ? { nombre: client.nombre, apellido: client.apellido } : { nombre: '', apellido: '' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedClient(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClient = () => {
    const apiCall = selectedClient
      ? api.put(`/clientes/actualizar/${selectedClient.id}`, formData)
      : api.post('/clientes/guardar', formData);

    apiCall
      .then((response) => {
        Swal.fire({
          title: selectedClient ? 'Cliente actualizado correctamente' : 'Cliente agregado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          if (selectedClient) {
            // Actualiza directamente el cliente en el estado de clients
            setClients(prevClients =>
              prevClients.map(client =>
                client.id === selectedClient.id ? { ...client, ...formData } : client
              )
            );
          } else {
            // Agrega el nuevo cliente al estado de clients
            setClients(prevClients => [...prevClients, response.data]);
          }
          setFilteredClients(prevClients =>
            prevClients.map(client =>
              client.id === selectedClient?.id ? { ...client, ...formData } : client
            )
          );
          handleCloseDialog();
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text: selectedClient ? 'Error al editar cliente' : 'Error al agregar cliente',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
        console.error(selectedClient ? 'Error al editar cliente:' : 'Error al agregar cliente:', error);
      });
  };

  const handleDeleteClient = (clientId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al cliente de forma permanente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/clientes/eliminar/${clientId}`)
          .then(() => {
            Swal.fire({
              title: 'Eliminado',
              text: 'El cliente ha sido eliminado correctamente.',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            setClients((prevClients) => prevClients.filter((client) => client.id !== clientId));
            setFilteredClients((prevClients) => prevClients.filter((client) => client.id !== clientId));
          })
          .catch((error) => {
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al eliminar el cliente.',
              icon: 'error',
              confirmButtonText: 'Cerrar',
            });
            console.error('Error al eliminar cliente:', error);
          });
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Lista de Clientes
      </Typography>
      <StyledTextField
        label="Buscar por Nombre o Apellido"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <StyledButton
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpenDialog()}
      >
        Agregar Cliente
      </StyledButton>
      <StyledTableContainer component={Paper}>
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
            {filteredClients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.id}</TableCell>
                <TableCell>{client.nombre}</TableCell>
                <TableCell>{client.apellido}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog(client)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClient(client.id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <TablePagination
        component="div"
        count={filteredClients.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página"
      />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedClient ? 'Editar Cliente' : 'Agregar Cliente'}</DialogTitle>
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
          <Button onClick={handleCloseDialog} color="error">Cancelar</Button>
          <Button onClick={handleSaveClient} color="primary">
            {selectedClient ? 'Guardar Cambios' : 'Agregar'}
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default ClientList;

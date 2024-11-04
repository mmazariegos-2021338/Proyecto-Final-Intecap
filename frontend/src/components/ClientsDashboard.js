import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Dialog, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { styled } from '@mui/system';
import Swal from 'sweetalert2';
import api from '../services/api';
import ClientForm from './ClientForm';


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
  color: '#f0f0f0',
  fontWeight: 'bold',
});

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});

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
        setClientes(clientes.map((client) =>
          client.id === updatedClient.id ? updatedClient : client
        ));
      } else {
        setClientes([...clientes, updatedClient]);
      }
    }
    setSelectedClient(null);
    setOpenForm(false);
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
      cancelButtonText: 'Cancelar'
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
            setClientes(clientes.filter((client) => client.id !== clientId));
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

  return (
    <BackgroundWrapper>
      <StyledContainer>
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center', color: '#4CAF50' }}>
          Gestión de Clientes
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenForm(null)}
          sx={{
            backgroundColor: '#4CAF50',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#388E3C',
            },
            marginBottom: '20px',
          }}
        >
          Agregar Cliente
        </Button>
        <TableContainer component={Paper} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '10px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>Apellido</StyledTableCell>
                <StyledTableCell>Acciones</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientes.map((cliente) => (
                <StyledTableRow key={cliente.id}>
                  <StyledTableCell>{cliente.id}</StyledTableCell>
                  <StyledTableCell>{cliente.nombre}</StyledTableCell>
                  <StyledTableCell>{cliente.apellido}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton color="secondary" onClick={() => handleOpenForm(cliente)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteClient(cliente.id)}>
                      <Delete />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={openForm} onClose={() => handleCloseForm()}>
          <DialogContent>
            <ClientForm selectedClient={selectedClient} onSuccess={handleCloseForm} />
          </DialogContent>
        </Dialog>
      </StyledContainer>
    </BackgroundWrapper>
  );
};

export default ClientsDashboard;

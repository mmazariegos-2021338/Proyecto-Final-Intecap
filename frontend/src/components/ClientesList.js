// src/components/ClientList.js
import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, TextField, Container, Typography
} from '@mui/material';
import api from '../services/api';

const ClientList = () => {
  const [clients, setClients] = useState([]); // Lista de clientes
  const [filteredClients, setFilteredClients] = useState([]); // Lista filtrada por búsqueda
  const [searchQuery, setSearchQuery] = useState(''); // Query de búsqueda
  const [page, setPage] = useState(0); // Página actual
  const [rowsPerPage, setRowsPerPage] = useState(5); // Filas por página

  // Obtener clientes de la API cuando el componente se monte
  useEffect(() => {
    api.get('/clientes/listar') // Endpoint para obtener la lista de clientes
      .then((response) => {
        setClients(response.data);
        setFilteredClients(response.data); // Inicialmente no hay filtro
      })
      .catch((error) => {
        console.error('Error al obtener clientes:', error);
      });
  }, []);

  // Filtrar clientes por nombre o apellido basado en el query de búsqueda
  useEffect(() => {
    const results = clients.filter(client =>
      client.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.apellido.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredClients(results);
  }, [searchQuery, clients]);

  // Cambiar la página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Cambiar el número de filas por página
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Volver a la primera página
  };

  return (
    <Container 
    sx={{ marginTop: 4,
    
      backgroundColor: '#f0f0f0', // Color de fondo (cambia el color aquí)
      minHeight: '100vh', // Altura mínima para que cubra toda la pantalla
      padding: '20px', // Espaciado dentro del contenedor

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

      {/* Tabla de clientes */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.id}</TableCell>
                <TableCell>{client.nombre}</TableCell>
                <TableCell>{client.apellido}</TableCell>
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
    </Container>
  );
};

export default ClientList;

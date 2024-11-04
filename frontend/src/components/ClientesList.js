// src/components/ClientList.js

import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, TextField, Container, Typography
} from '@mui/material';
import { styled } from '@mui/system';

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

const StyledTablePagination = styled(TablePagination)({
  color: '#fff',
  '& .MuiSelect-icon': {
    color: '#fff',
  },
});

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    api.get('/clientes/listar')
      .then((response) => {
        setClients(response.data);
        setFilteredClients(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener clientes:', error);
      });
  }, []);

  useEffect(() => {
    const results = clients.filter(client =>
      client.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.apellido.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredClients(results);
  }, [searchQuery, clients]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <BackgroundWrapper>
      <StyledContainer>
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center', color: '#4CAF50' }}>
          Lista de Clientes
        </Typography>
        <TextField
          label="Buscar por Nombre o Apellido"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            input: { color: '#fff' },
            label: { color: '#4CAF50' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#4CAF50' },
              '&:hover fieldset': { borderColor: '#81C784' },
            },
          }}
        />
        <TableContainer component={Paper} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '10px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>Apellido</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((client) => (
                <StyledTableRow key={client.id}>
                  <StyledTableCell>{client.id}</StyledTableCell>
                  <StyledTableCell>{client.nombre}</StyledTableCell>
                  <StyledTableCell>{client.apellido}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <StyledTablePagination
          component="div"
          count={filteredClients.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
        />
      </StyledContainer>
    </BackgroundWrapper>
  );
};

export default ClientList;

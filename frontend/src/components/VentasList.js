// src/components/VentasList.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import api from '../services/api';

const VentasList = () => {
    const [ventas, setVentas] = useState([]);

    useEffect(() => {

        api.get('/ventas/reporte')
            .then((response) => {
                
                setVentas(response.data);
            })
            .catch((error) => console.error('Error al cargar las ventas:', error));
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom style={{ color: '#4CAF50', textAlign: 'center' }}>
                Reporte de Ventas
            </Typography>
            <TableContainer component={Paper} style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)', marginTop: '2rem' }}>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#333' }}>
                            <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Cantidad</TableCell>
                            <TableCell style={{ color: '#fff', fontWeight: 'bold' }}>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ventas.length > 0 ? (
                            ventas.map((venta) => (
                                <TableRow key={venta.id}>
                                    <TableCell>{venta.id}</TableCell>
                                    <TableCell>{venta.cantidad}</TableCell>
                                    <TableCell>${venta.cantidad * venta.precio}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} style={{ textAlign: 'center' }}>
                                    No hay ventas disponibles
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default VentasList;

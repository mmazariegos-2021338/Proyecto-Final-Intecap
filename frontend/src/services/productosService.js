// src/services/productosService.js

import api from './api';


export const getProductos = async () => {
  try {
    const response = await api.get('/productos/listar');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
};


export const saveProducto = async (producto) => {
  try {
    const response = await api.post('/productos/guardar', producto);
    return response.data;
  } catch (error) {
    console.error('Error al guardar el producto:', error);
    throw error;
  }
};


export const updateProducto = async (id, producto) => {
  try {
    const response = await api.put(`/productos/actualizar/${id}`, producto);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    throw error;
  }
};


export const deleteProducto = async (id) => {
  try {
    const response = await api.delete(`/productos/eliminar/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    throw error;
  }
};

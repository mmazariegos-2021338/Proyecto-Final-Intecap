
import api from './api';

export const getClientes = async () => {
  try {
    const response = await api.get('/clientes/listar');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    throw error;
  }
};


export const saveCliente = async (cliente) => {
  try {
    const response = await api.post('/clientes/guardar', cliente);
    return response.data;
  } catch (error) {
    console.error('Error al guardar el cliente:', error);
    throw error;
  }
};


export const updateCliente = async (id, cliente) => {
  try {
    const response = await api.put(`/clientes/actualizar/${id}`, cliente);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    throw error;
  }
};


export const deleteCliente = async (id) => {
  try {
    const response = await api.delete(`/clientes/eliminar/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    throw error;
  }
};

// src/services/inventoryService.ts
import axios from 'axios';
import type { InventoryTransactionDTO } from '../api/types/inventoryTransaxtion';

const API_URL = 'https://localhost:7191/api/inventory'; // Cambia esta URL según sea necesario

// Función para crear una nueva transacción de inventario (IN o OUT)
export const createInventoryTransaction = async (payload: InventoryTransactionDTO) => {
  try {
    const response = await axios.post(`${API_URL}`, payload);
    return response.data; // Retorna la respuesta de la creación de la transacción
  } catch (error) {
    throw new Error('Error al crear la transacción de inventario');
  }
};

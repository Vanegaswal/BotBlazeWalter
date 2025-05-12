// src/api/types/inventoryTransaction.ts

export interface InventoryTransactionDTO {
  productId: number;       // ID del producto
  quantity: number;        // Cantidad a cambiar (IN o OUT)
  transactionType: 'IN' | 'OUT'; // Tipo de transacción: IN (entrada) o OUT (salida)
}

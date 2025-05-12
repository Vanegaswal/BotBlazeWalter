export interface InventoryTransactionDto {
  productId: number;
  quantityChanged: number;
  type: "IN" | "OUT";
}

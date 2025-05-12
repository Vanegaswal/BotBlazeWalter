export interface Product {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
  stock: number;
}
export interface Productsupdate {
  id: number; 
  name: string;
  unitPrice: number;
}
export interface ProductsCreate {
 
  name: string;
  description: string;
  unitPrice: number;
  stock: number;
}
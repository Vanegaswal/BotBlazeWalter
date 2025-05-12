import axios from 'axios';
import type { Product, ProductsCreate, Productsupdate } from '../api/types/product';

const API_URL = 'https://localhost:7191/api/Product'; // Ajusta si tu backend tiene otro puerto o dominio

export const getAllProducts = async (
  search?: string,
  minPrice?: number,
  maxPrice?: number
): Promise<Product[]> => {
  const params: any = {};
  if (search) params.search = search;
  if (minPrice) params.minPrice = minPrice;
  if (maxPrice) params.maxPrice = maxPrice;

  const response = await axios.get<Product[]>(API_URL, { params });
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await axios.get<Product>(`${API_URL}/${id}`);
  return response.data;
};

export const createProduct = async (product: ProductsCreate): Promise<Product> => {
  const response = await axios.post<Product>(API_URL, product);
  return response.data;
};


export const updateProduct = async (id: number, product: Productsupdate): Promise<void> => {
  console.log('Updating product with ID:', id, 'and data:', product);
  await axios.put(`${API_URL}/productedit/${id}`, product);
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/productdelete/${id}`);
};

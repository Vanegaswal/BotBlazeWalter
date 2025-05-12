export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
// types/api.types.ts

/**
 * Represents a User object, typically returned by user-related API endpoints.
 */
export interface User {
  id: number;
  username: string;
  email: string;
  passwordHash: string; // As per the schema, this field is part of the User model
}

/**
 * Request body for user registration:
 * POST /api/Auth/register
 * POST /api/Users/register
 */
export interface UserRegistrationRequest {
  id?: number;          // Example in spec shows "id": 0. Often omitted or backend-generated.
  username: string;
  email: string;
  passwordHash: string; // As per the example schema, client is expected to send this.
                        // This is unconventional; typically client sends plain password.
}

/**
 * Request body for user login:
 * POST /api/Auth/login
 */


/**
 * Example structure for an authentication response after login.
 * The actual response might vary.
 */
export interface AuthResponse {
  token: string;  // Typically, a JWT or session token
  user?: User;    // Optionally, user details can be returned
}

/**
 * Data Transfer Object for inventory transactions.
 * Used as request body for POST /api/Inventory.
 * Likely also the response type if the created/updated transaction is returned.
 */
export interface InventoryTransactionDto {
  productId: number;
  quantityChanged: number;
  type: string; // e.g., "PURCHASE", "SALE", "ADJUSTMENT"
}

/**
 * Represents a Product.
 * Used for:
 * - Response for GET /api/Product and GET /api/Product/{id}
 * - Request body for POST /api/Product
 * - Request body for PUT /api/Product/{id}
 */
export interface Product {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
  initialQuantity: number;    // Quantity when product was first added/created
  availableQuantity: number;  // Current available stock
}

/**
 * Query parameters for searching/filtering products:
 * GET /api/Product
 */
export interface ProductSearchQuery {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

/**
 * A generic success response structure for operations
 * that might not return specific data (e.g., some DELETE operations).
 */
export interface SuccessResponse {
  message: string;
  success: boolean;
}

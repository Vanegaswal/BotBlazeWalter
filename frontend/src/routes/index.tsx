
// api/index.ts
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import PrivateRoute from '../components/PrivateRoute';
import MainLayout from '../layout/MainLayout';


//este es mi app routes
export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="productos" element={<Products />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);


// api/index.ts
import type {
  UserRegistrationRequest,
  LoginRequest,
  AuthResponse,
  User,
  InventoryTransactionDto,
  Product,
  ProductSearchQuery,
  // SuccessResponse // Import if needed for specific endpoints like DELETE
} from '../api/types/auth.types'; // Adjusted path based on file name
 // Adjusted path based on file name

const API_BASE_URL = '/api'; // Your API's base URL

/**
 * A helper function to make API requests using fetch.
 * It handles JSON stringification, setting common headers, and basic error handling.
 * @param url The API endpoint path (e.g., /Auth/login)
 * @param options Standard RequestInit options for fetch
 * @returns Promise<T> The parsed JSON response
 */
async function fetchAPI<T>(url: string, options: RequestInit = {}): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    // Example: Add Authorization header if a token is available
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    // }
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorData: any = { message: `HTTP error! status: ${response.status}` };
    try {
      // Try to parse a JSON error response from the server
      const errorJson = await response.json();
      errorData = { ...errorData, ...errorJson };
    } catch (e) {
      // If response is not JSON or another error occurs, stick with the status
      console.error("Failed to parse error response as JSON:", e);
    }
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  if (response.status === 204) { // No Content
    return undefined as T; // Handle cases where API returns no body for success
  }

  return response.json() as Promise<T>;
}

// --- Auth API Endpoints ---
export const authApi = {
  /**
   * Registers a new user.
   * POST /api/Auth/register
   * @param data UserRegistrationRequest payload
   * @returns Promise<User> The created user object (assumption based on common patterns)
   */
  register: (data: UserRegistrationRequest): Promise<User> => {
    return fetchAPI<User>('/Auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Logs in an existing user.
   * POST /api/Auth/login
   * @param data LoginRequest payload
   * @returns Promise<AuthResponse> Response containing token and optionally user info
   */
  login: (data: LoginRequest): Promise<AuthResponse> => {
    return fetchAPI<AuthResponse>('/Auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// --- Inventory API Endpoints ---
export const inventoryApi = {
  /**
   * Creates a new inventory transaction.
   * POST /api/Inventory
   * @param data InventoryTransactionDto payload
   * @returns Promise<InventoryTransactionDto> The created inventory transaction (assumption)
   */
  createTransaction: (data: InventoryTransactionDto): Promise<InventoryTransactionDto> => {
    return fetchAPI<InventoryTransactionDto>('/Inventory', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

// --- Product API Endpoints ---
export const productApi = {
  /**
   * Creates a new product.
   * POST /api/Product
   * @param data Product payload (Note: API example includes "id": 0)
   * @returns Promise<Product> The created product
   */
  createProduct: (data: Product): Promise<Product> => {
    return fetchAPI<Product>('/Product', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Retrieves a list of products, with optional filtering.
   * GET /api/Product
   * @param params ProductSearchQuery for filtering
   * @returns Promise<Product[]> An array of products
   */
  getProducts: (params?: ProductSearchQuery): Promise<Product[]> => {
    const queryParams = new URLSearchParams();
    if (params) {
      if (params.search) queryParams.append('search', params.search);
      if (params.minPrice !== undefined) queryParams.append('minPrice', params.minPrice.toString());
      if (params.maxPrice !== undefined) queryParams.append('maxPrice', params.maxPrice.toString());
    }
    const queryString = queryParams.toString();
    return fetchAPI<Product[]>(`/Product${queryString ? `?${queryString}` : ''}`);
  },

  /**
   * Retrieves a single product by its ID.
   * GET /api/Product/{id}
   * @param id The ID of the product
   * @returns Promise<Product> The product object
   */
  getProductById: (id: number): Promise<Product> => {
    return fetchAPI<Product>(`/Product/${id}`);
  },

  /**
   * Updates an existing product.
   * PUT /api/Product/{id}
   * @param id The ID of the product to update
   * @param data Product payload containing updated information
   * @returns Promise<Product> The updated product
   */
  updateProduct: (id: number, data: Product): Promise<Product> => {
    return fetchAPI<Product>(`/Product/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Deletes a product by its ID.
   * DELETE /api/Product/{id}
   * @param id The ID of the product to delete
   * @returns Promise<void> Resolves if deletion is successful (assuming 200 OK or 204 No Content)
   */
  deleteProduct: (id: number): Promise<void> => {
    // If your API returns a success message object for DELETE, change Promise<void>
    // to Promise<SuccessResponse> and adjust fetchAPI call if needed.
    return fetchAPI<void>(`/Product/${id}`, {
      method: 'DELETE',
    });
  },
};

// --- Users API Endpoints ---
// Note: /api/Users/register appears functionally identical to /api/Auth/register
// based on the provided specification.
export const usersApi = {
  /**
   * Registers a new user (alternative endpoint).
   * POST /api/Users/register
   * @param data UserRegistrationRequest payload
   * @returns Promise<User> The created user object (assumption)
   */
  register: (data: UserRegistrationRequest): Promise<User> => {
    return fetchAPI<User>('/Users/register', { // Note the endpoint path
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};


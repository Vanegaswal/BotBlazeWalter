// Función para guardar el token en el localStorage
export const saveToken = (token: string) => {
  localStorage.setItem('token', token);
};

// Función para obtener el token del localStorage
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Función para eliminar el token del localStorage
export const removeToken = () => {
  localStorage.removeItem('token');
};

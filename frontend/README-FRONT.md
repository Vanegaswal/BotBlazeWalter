# wevt-frontend - Frontend React

Este proyecto es el frontend de la aplicación de gestión de productos, construido con React, Vite y TypeScript. Utiliza Ant Design para la interfaz de usuario y JWT para autenticación.

## 🚀 Tecnologías
- React 18
- Vite
- TypeScript
- Ant Design
- Axios
- React Router
- localStorage (para manejar el token JWT)

## 📦 Funcionalidades
- Login con autenticación JWT
- Visualización de productos
- Agregar, editar y eliminar productos
- Filtros y búsqueda de productos
- Rutas privadas protegidas por autenticación

## ⚙️ Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/wevt-frontend.git
   cd wevt-frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env`:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Ejecuta la aplicación:
   ```bash
   npm run dev
   ```

## 🧱 Estructura del proyecto

```
src/
├── api/            # Axios config y llamadas a API
├── components/     # Componentes reutilizables
├── pages/          # Vistas (login, productos, etc.)
├── utils/          # Funciones auxiliares (jwt.ts, auth.ts)
├── App.tsx         # Configuración principal de rutas
└── main.tsx        # Punto de entrada de la app
```

## 🔐 Autenticación
El token JWT se guarda en `localStorage` al iniciar sesión. Las rutas privadas redirigen al login si el token no está presente o es inválido.

## 📄 Licencia
MIT

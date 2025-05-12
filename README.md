 wevt2 - Backend API

Este proyecto es el backend de una aplicación de gestión de productos e inventario. Desarrollado en .NET 8 con Entity Framework Core y autenticación JWT.

## 🚀 Tecnologías
- .NET 8
- Entity Framework Core
- Pomelo MySQL Provider
- JWT (JSON Web Tokens)
- MailKit (para envío de tokens por correo)
- ASP.NET Web API

## 📦 Funcionalidades
- CRUD de productos
- Actualización de inventario
- Filtros y búsqueda de productos
- Autenticación y autorización con JWT
- Envío de token de autenticación al correo electrónico del usuario

## ⚙️ Configuración del entorno

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/wevt2.git
   cd wevt2
   ```

2. Configura `appsettings.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "server=localhost;database=wevt2_db;user=root;password=tu_contraseña"
     },
     "Jwt": {
       "Key": "clave_super_secreta",
       "Issuer": "wevt2",
       "Audience": "wevt2Users"
     },
     "Email": {
       "SmtpServer": "smtp.tuservidor.com",
       "Port": 587,
       "SenderEmail": "tucorreo@dominio.com",
       "Password": "clave_correo"
     }
   }
   ```

3. Ejecuta las migraciones y actualiza la base de datos:
   ```bash
   dotnet ef database update
   ```

4. Ejecuta la API:
   ```bash
   dotnet run
   ```

## 🔐 Autenticación
El usuario recibe un token JWT en su correo después de autenticarse. Este token debe enviarse en cada petición protegida en la cabecera `Authorization: Bearer <token>`.

## 📫 Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST   | /api/auth/login        | Login con envío de token por correo |
| GET    | /api/products          | Listar productos (con filtros) |
| POST   | /api/products          | Crear producto |
| PUT    | /api/products/{id}     | Actualizar producto |
| DELETE | /api/products/{id}     | Eliminar producto |

## 📄 Licencia
MIT
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

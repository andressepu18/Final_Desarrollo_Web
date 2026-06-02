# Reseñas de Restaurantes

Proyecto fullstack (Node + Angular) para crear, leer, actualizar y eliminar reseñas de restaurantes.

Resumen
- Backend: Node.js + Express + Mongoose (MongoDB).
- Frontend: Angular (carpeta `FrontendCarrosV3`).
- Autenticación: token JWT almacenado en `sessionStorage`.

Características
- Registro y login de usuarios (`/api/usuario/registrar`, `/api/usuario/login`).
- CRUD de reseñas protegidas por token:
  - `POST /api/resenia` (crear)
  - `GET /api/resenias` (listar)
  - `GET /api/resenia/:reseniaId` (obtener por id)
  - `PUT /api/resenia/:reseniaId` (actualizar)
  - `DELETE /api/resenia/:reseniaId` (eliminar)

Estructura principal
- `carrosv4/` — backend Node
  - `index.js` — conexión a MongoDB y arranque
  - `application.js` — configuración Express
  - `routes/` — rutas (`resenas`, `users`)
  - `controllers/` — lógica de negocio
  - `models/` — esquemas Mongoose
  - `helpers/auth.js` — creación y validación de JWT

- `FrontendCarrosV3/` — frontend Angular
  - `src/app/components/login` — componente de login
  - `src/app/components/home` — UI principal (lista y formulario)
  - `src/app/services/auth.ts` — login + guardar token en `sessionStorage`
  - `src/app/services/resenia.ts` — llamadas API CRUD y envío del header `Authorization`

Requisitos
- Node.js
- npm
- MongoDB corriendo en `mongodb://localhost:27017/ejemploweb` (o cambiar en `carrosv4/index.js`).

Instalación y ejecución (local)
1. Backend:
```bash
cd carrosv4
npm install
node index.js
```

2. Frontend:
```bash
cd FrontendCarrosV3
npm install
npm start
# abre http://localhost:4200 (por defecto de Angular)
```

Notas sobre autenticación
- El login devuelve un token JWT que se guarda en `sessionStorage` (método `guardarToken` en `src/app/services/auth.ts`).
- El backend espera el header `Authorization: Bearer <token>` para rutas protegidas. El helper `auth.js` valida y extrae `req.userId`.
- El token tiene expiración (configurable en `carrosv4/helpers/auth.js`).

Preparar para GitHub
- El repositorio ya incluye `.gitignore` en la raíz para ignorar `node_modules` y archivos sensibles.
- Antes de subir: eliminar las carpetas `node_modules` de `carrosv4` y `FrontendCarrosV3` (no deben versionarse).
- Mantén `package-lock.json` o `yarn.lock` para reproducibilidad.

Puntos de interés para la entrega
- Cumple los requisitos:
  - Frontend en Angular, login y almacenamiento de token en `sessionStorage`, CRUD de reseñas.
  - Backend en Node, APIs para login y CRUD.
  - Base de datos en MongoDB (Mongoose).

Contacto
- Si quieres, puedo generar un `README.md` en inglés, o añadir instrucciones de despliegue (Heroku, Railway, o GitHub Actions).
# Sistema de Reseñas de Restaurantes

## Descripción
Aplicativo web para que los usuarios puedan crear, ver, editar y eliminar reseñas de restaurantes. Los usuarios pueden ver todas las reseñas pero solo pueden modificar o eliminar sus propias reseñas.

## Características
- ✅ Autenticación de usuarios con email y contraseña
- ✅ CRUD de reseñas de restaurantes
- ✅ Solo usuarios logueados pueden crear reseñas
- ✅ Cada usuario solo puede editar/eliminar sus propias reseñas
- ✅ Todos los usuarios pueden ver todas las reseñas
- ✅ Campos: Nombre Restaurante, Calificación (1-5), Fecha de Visita, Observaciones

## Requisitos Previos
- Node.js (versión 14 o superior)
- MongoDB (ejecutándose en localhost:27017)
- Angular CLI (para desarrollo del frontend)

## Instalación

### Backend (carrosv4)
1. Navega a la carpeta `carrosv4`
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Asegúrate de que MongoDB esté ejecutándose
4. Inicia el servidor:
   ```bash
   node index.js
   ```
   El servidor se iniciará en `http://localhost:1702`

### Frontend (FrontendCarrosV3)
1. Navega a la carpeta `FrontendCarrosV3`
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   ng serve
   ```
   El aplicativo estará disponible en `http://localhost:4200`

## Uso

1. Abre el navegador y ve a `http://localhost:4200`
2. Si no tienes cuenta, regístrate con tu email y contraseña
3. Inicia sesión
4. Una vez logueado, puedes:
   - Ver todas las reseñas de todos los usuarios
   - Crear nuevas reseñas de restaurantes
   - Editar tus propias reseñas
   - Eliminar tus propias reseñas
   - Ver las reseñas de otros usuarios (pero no puedes modificarlas)

## Estructura de Rutas API

### Usuarios
- `POST /api/usuario/registrar` - Registrar nuevo usuario
- `POST /api/usuario/login` - Iniciar sesión y obtener token

### Reseñas
- `GET /api/resenas` - Obtener todas las reseñas
- `GET /api/resenia/:reseniaId` - Obtener una reseña específica
- `POST /api/resenia` - Crear nueva reseña (requiere token)
- `PUT /api/resenia/:reseniaId` - Actualizar reseña (requiere token, solo propietario)
- `DELETE /api/resenia/:reseniaId` - Eliminar reseña (requiere token, solo propietario)

## Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs

### Frontend
- Angular
- TypeScript
- Bootstrap 5
- Angular Signals

## Autenticación
- El sistema usa JWT para autenticación
- El token se almacena en sessionStorage del navegador
- El token tiene una validez de 5 minutos
- Se envía con cada solicitud que requiere autenticación en el header `Authorization: Bearer <token>`

## Notas Importantes
- Las contraseñas se almacenan hasheadas con bcryptjs
- No se suben las carpetas `node_modules` ni `angular` para reducir tamaño
- La aplicación debe estar logueada para crear/editar/eliminar reseñas

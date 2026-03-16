# Habit Tracking Application

## Descripción

Esta aplicación permite a los usuarios registrar y realizar seguimiento de hábitos diarios. Cada hábito puede marcarse como completado una vez por día. El sistema lleva un registro de la racha (streak) de días consecutivos en los que el usuario completa el hábito.

La aplicación también muestra hitos relevantes en la formación de hábitos. En particular se destacan los días **21** y **66**, que comúnmente se mencionan como puntos de referencia en el proceso de formación de un hábito.

## Instalación

### Requisitos

Antes de ejecutar el proyecto es necesario tener instalado:

- Node.js
- npm o pnpm
- MongoDB

### Pasos generales

1. Clonar el repositorio.

```bash
git clone [URL_DEL_REPOSITORIO]
cd [NOMBRE_DEL_PROYECTO]
```

2. Instalar las dependencias del proyecto.

El proyecto utiliza **npm workspaces** y **pnpm workspaces**, por lo que todas las dependencias pueden instalarse desde la carpeta raíz.

```bash
npm install
```

o

```bash
pnpm install
```

3. Configurar las variables de entorno creando un archivo `.env` en la carpeta raíz del proyecto.

Ejemplo de variables requeridas:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/habit-tracker
JWT_SECRET=[SECRET]
```

4. Iniciar la aplicación en modo desarrollo.

Debido a la configuración de **workspaces**, el siguiente comando inicia tanto el servidor **backend** como el servidor de desarrollo del **frontend**.

```bash
npm run dev
```

o

```bash
pnpm run dev
```

## Funcionalidad

La aplicación incluye las siguientes funcionalidades principales:

- Crear nuevos hábitos.
- Visualizar la lista de hábitos registrados.
- Marcar un hábito como completado para el día actual.
- Mantener una racha de días consecutivos en los que el hábito fue completado.
- Mostrar hitos cuando la racha alcanza 21 días y 66 días.

El sistema está diseñado para que cada hábito solo pueda marcarse una vez por día. Cuando un día no se completa el hábito, la racha se reinicia.

## Arquitectura

La aplicación está dividida en dos partes principales: **frontend** y **backend**.

### Frontend

El frontend está construido utilizando:

- Vite
- React
- React Router
- Redux
- Tailwind CSS

Herramientas auxiliares utilizadas:

- Lucide para iconos
- clsx para manejo condicional de clases
- tailwind-merge para evitar conflictos entre clases de Tailwind

El frontend se encarga de:

- Manejar la interfaz de usuario.
- Gestionar el estado de la aplicación mediante Redux.
- Navegación entre vistas mediante React Router.
- Comunicación con la API del backend.

### Backend

El backend está construido utilizando:

- Node.js
- Express

Dependencias principales:

- mongoose para la conexión con MongoDB
- bcrypt para el hash de contraseñas
- jsonwebtoken (JWT) para autenticación
- cookie-parser para el manejo de cookies
- cors para habilitar peticiones desde el frontend
- dotenv para manejar variables de entorno

El backend se encarga de:

- Proveer endpoints para autenticación de usuarios.
- Gestionar la creación y actualización de hábitos.
- Persistir la información en la base de datos.

### Base de datos

La base de datos utilizada es **MongoDB** con el nombre:

`habit-tracker`

Colecciones principales:

- `users`
- `habits`

La colección `users` almacena la información de autenticación de los usuarios.

La colección `habits` almacena los hábitos creados por cada usuario junto con la información necesaria para calcular rachas y progreso.

## Estructura del proyecto

### Raíz

```
HabitTracker/
├─ backend/
├─ frontend/
├─ .env
├─ package.json
└─ README.md
```

### Frontend - Estructura

El frontend está organizado en varios módulos principales dentro de `frontend/src`:

```
frontend/src
├─ components
├─ pages
├─ store
├─ types
├─ utils
├─ App.tsx
└─ main.tsx
```

#### Components

Contiene los componentes reutilizables de la interfaz. Algunos ejemplos:

- `HabitCard`: muestra la información de un hábito y permite completarlo, editarlo o eliminarlo.
- `HabitForm`: formulario utilizado tanto para crear como para editar hábitos.
- `ProgressBar`: barra de progreso que muestra el avance de la racha y los hitos de 21 y 66 días.
- `ProtectedRoute`: componente que protege las rutas que requieren autenticación.
- `Button` y `ButtonHabit`: componentes reutilizables de botones.

#### Pages

Define las vistas principales de la aplicación:

- `Home`: lista todos los hábitos del usuario.
- `Login`: pantalla de inicio de sesión.
- `Register`: pantalla de registro.
- `NewHabit`: formulario para crear un hábito.
- `EditHabit`: formulario para editar un hábito existente.

La navegación se define en `router.tsx` utilizando **React Router**.

#### Store

El estado global se gestiona con **Redux Toolkit**.

Slices principales:

- `authSlice`: maneja el estado de autenticación del usuario.
- `habitSlice`: maneja el estado de los hábitos cargados desde la API.

Las operaciones asíncronas se implementan mediante `createAsyncThunk` para interactuar con el backend.

Ejemplos de acciones:

- `login`
- `register`
- `initializeAuth`
- `loadHabits`
- `addHabit`
- `checkHabit`
- `updateHabit`
- `deleteHabit`

#### Types

Contiene las definiciones de tipos utilizadas en la aplicación (por ejemplo `User` y `Habit`).

#### Utils

Funciones auxiliares utilizadas por la interfaz, como utilidades para combinar clases de Tailwind (`clsx` + `tailwind-merge`) y constantes para colores e iconos.

### Backend - Estructura

El backend contiene la siguiente organización interna:

```
backend/src
├─ controllers
├─ middleware
├─ models
├─ routes
├─ utils
└─ index.ts
```

Responsabilidades principales:

- **controllers**: contienen la lógica para cada endpoint.
- **models**: definen los esquemas de MongoDB mediante Mongoose.
- **routes**: definen los endpoints HTTP y conectan con los controladores.
- **middleware**: funciones intermedias utilizadas por Express.
- **utils**: funciones auxiliares utilizadas para cálculos como la lógica de rachas.
- **index.ts**: punto de entrada del servidor Express.

## APIs

Todas las rutas del backend están expuestas bajo el prefijo:

```
/api
```

### Autenticación

Base path:

```
/api/auth
```

Endpoints disponibles:

**POST /api/auth/register**

Crea un nuevo usuario.

Body esperado:

```json
{
  "username": "string",
  "password": "string",
  "timezone": "string"
}
```

**POST /api/auth/login**

Autentica un usuario y genera una cookie `session_token` con un JWT.

Body esperado:

```json
{
  "username": "string",
  "password": "string"
}
```

**GET /api/auth/session**

Devuelve la información del usuario autenticado.

Requiere cookie de sesión válida.

**POST /api/auth/logout**

Elimina la cookie de sesión.

---

### Hábitos

Base path:

```
/api/habits
```

Todas las rutas requieren autenticación mediante `session_token`.

**GET /api/habits**

Obtiene todos los hábitos del usuario autenticado.

**POST /api/habits**

Crea un nuevo hábito.

Ejemplo de body:

```json
{
  "userId": "ObjectId",
  "name": "Leer",
  "description": "Leer 20 minutos",
  "color": "#22c55e",
  "icon": "book"
}
```

**GET /api/habits/:id**

Obtiene un hábito específico.

**PATCH /api/habits/:id**

Actualiza los datos de un hábito.

Ejemplo de body:

```json
{
  "name": "Regar las plantas",
  "icon": "plant"
}
```

**POST /api/habits/:id/checkin**

Marca el hábito como completado para el día actual.

Este endpoint:

- valida que no haya sido completado ya ese día
- calcula la nueva racha
- actualiza `currentStreak`, `longestStreak` y `lastCompletedDate`

**DELETE /api/habits/:id**

Elimina un hábito existente.

## Lógica de rachas

La aplicación incluye validaciones para asegurar que las rachas de hábitos sean correctas.

Principios principales de la lógica:

- Un hábito solo puede marcarse como completado **una vez por día**.
- Si el hábito ya fue completado en la fecha actual, el endpoint de `checkin` devuelve un error.
- Si la última fecha completada fue **ayer**, la racha (`currentStreak`) aumenta en 1.
- Si la última fecha completada es **anterior a ayer**, la racha se reinicia a **1** al realizar un nuevo `checkin`.
- Cuando se consulta la lista de hábitos (`GET /api/habits`), el sistema valida si la última fecha completada sigue siendo válida para mantener la racha.
- Si la última fecha completada es **mayor a un día de diferencia**, la racha se devuelve como **0** en la respuesta.

Para facilitar estas validaciones el backend utiliza funciones auxiliares que normalizan las fechas y verifican si una racha sigue siendo válida.

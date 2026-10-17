# API Hoja de Vida — Experiencias Profesionales

API REST para administrar las experiencias profesionales de una hoja de vida.
Construida con **Express.js (Node.js)** y **MongoDB** como base de datos NoSQL (a través de Mongoose).

## Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express.js | ^5.3.0 | Framework web / rutas |
| MongoDB | 4.4+ | Base de datos NoSQL |
| Mongoose | ^9.11.2 | ODM para MongoDB |
| dotenv | ^18.0.8 | Variables de entorno |
| cors | ^2.8.6 | Habilitar peticiones cross-origin |
| nodemon | ^3.1.14 | Recarga automática en desarrollo |

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- [MongoDB](https://www.mongodb.com/try/download/community) corriendo localmente en el puerto `27017`

## Instalación y ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Verificar el archivo .env (ya incluido en el proyecto)
#    PORT=3000
#    MONGO_URI=mongodb://127.0.0.1:27017/hoja_de_vida

# 3. Levantar el servidor
npm start        # producción
npm run dev      # desarrollo con nodemon (recarga automática)
```

Salida esperada:

```
Servidor corriendo en el puerto 3000
MongoDB conectado exitosamente
```

La API queda disponible en: `http://localhost:3000/api/experiencias`

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/experiencias` | Crear una experiencia profesional |
| `GET` | `/api/experiencias` | Obtener todas las experiencias (ordenadas por `fechaInicio` descendente) |
| `GET` | `/api/experiencias/:id` | Obtener una experiencia por su ID |
| `PUT` | `/api/experiencias/:id` | Actualizar una experiencia por su ID |
| `DELETE` | `/api/experiencias/:id` | Eliminar una experiencia por su ID |

## Estructura de la experiencia

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `empresa` | String | ✅ | Nombre de la empresa |
| `cargo` | String | ✅ | Cargo desempeñado |
| `descripcion` | String | ❌ | Descripción de funciones |
| `fechaInicio` | Date | ✅ | Fecha de inicio (`YYYY-MM-DD`) |
| `fechaFin` | Date | ❌ | Fecha de fin (`null` si sigue activo) |
| `trabajoActual` | Boolean | ❌ | `true` si es el empleo actual |
| `tecnologias` | [String] | ❌ | Lista de tecnologías utilizadas |

Además, Mongoose genera automáticamente `_id`, `createdAt`, `updatedAt` y `__v`.

## Ejemplos de uso

### Crear experiencia — `POST /api/experiencias`

```json
{
  "empresa": "Hospital Santa Rosa",
  "cargo": "Auxiliar de Facturación",
  "descripcion": "Gestión de facturación y soporte del sistema.",
  "fechaInicio": "2023-01-15",
  "fechaFin": null,
  "trabajoActual": true,
  "tecnologias": ["Node.js", "MongoDB"]
}
```

Respuesta `201 Created`:

```json
{
  "ok": true,
  "data": {
    "_id": "6ad3bd84e200aab6035b1c3a",
    "empresa": "Hospital Santa Rosa",
    "cargo": "Auxiliar de Facturación",
    "createdAt": "2026-10-17T18:25:08.268Z",
    "updatedAt": "2026-10-17T18:25:08.268Z",
    "__v": 0
  }
}
```

### Obtener todas — `GET /api/experiencias`

```json
{
  "ok": true,
  "count": 1,
  "data": [ { "...": "..." } ]
}
```

### Actualizar — `PUT /api/experiencias/:id`

```json
{ "cargo": "Facturadora Senior", "trabajoActual": true }
```

### Eliminar — `DELETE /api/experiencias/:id`

```json
{ "ok": true, "message": "Experiencia eliminada correctamente" }
```

## Códigos de estado

| Código | Cuándo |
|---|---|
| `200` | Operación exitosa (GET, PUT, DELETE) |
| `201` | Recurso creado (POST) |
| `400` | Datos inválidos o ID mal formado (validaciones de Mongoose) |
| `404` | Experiencia no encontrada con ese ID |
| `500` | Error interno del servidor |

## Probar con Postman

1. Abrir Postman → **Import** → seleccionar `experiencias.postman_collection.json`.
2. La colección incluye las 5 peticiones con sus cuerpos de ejemplo.
3. Ajustar la variable `baseUrl` si usas otro puerto (por defecto `http://localhost:3000`).

## Estructura del proyecto

```
api/
├── app.js                          # Punto de entrada: Express + middlewares + rutas
├── .env                            # Variables de entorno (no se sube a git)
├── package.json
├── experiencias.postman_collection.json
└── src/
    ├── config/
    │   └── db.js                   # Conexión a MongoDB con Mongoose
    ├── models/
    │   └── Experiencia.js          # Esquema/schema de la experiencia
    ├── controllers/
    │   └── experiencia.controller.js  # Lógica del CRUD
    └── routes/
        └── experiencia.routes.js   # Definición de rutas REST
```

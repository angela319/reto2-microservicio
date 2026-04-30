# Reto 2 — Microservicio MVC

Evolución del Reto 1: backend convertido en un **microservicio listo para despliegue** con pruebas unitarias, healthcheck y Docker.

---

## Stack

- **Runtime:** Node.js 20
- **Framework:** Express
- **Base de datos:** SQLite (better-sqlite3)
- **Patrón:** MVC + Service Layer
- **Tests:** Jest + Supertest (20 tests, 86% cobertura)
- **Deploy:** Docker + Docker Compose

---

## Arquitectura por capas

```
HTTP Request
     │
     ▼
 Routes         ← define URL + método
     │
     ▼
 Controller     ← recibe req, responde res
     │
     ▼
 Service        ← lógica de negocio y validaciones
     │
     ▼
 Model          ← acceso a la base de datos (SQLite)
```

## Estructura de carpetas

```
reto2-microservicio/
├── src/
│   ├── config/
│   │   ├── database.js        ← Conexión SQLite
│   │   ├── env.js             ← Variables de entorno
│   │   ├── migrations.js      ← Creación de tablas
│   │   └── seed.js            ← Datos de prueba
│   ├── models/                ← Acceso a DB
│   │   ├── User.js
│   │   └── Product.js
│   ├── services/              ← Lógica de negocio (nueva capa)
│   │   ├── userService.js
│   │   └── productService.js
│   ├── controllers/           ← Manejo de HTTP
│   │   ├── userController.js
│   │   └── productController.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── productRoutes.js
│   ├── middlewares/
│   │   └── errorHandler.js
│   └── app.js
├── tests/
│   ├── health.test.js
│   ├── users.test.js
│   └── products.test.js
├── Dockerfile
├── docker-compose.yml
├── postman_collection.json
└── .env.example
```

---

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/health` | **Healthcheck** del servicio |
| GET | `/` | Info del microservicio |
| GET | `/api/users` | Listar usuarios |
| POST | `/api/users` | Crear usuario |
| GET | `/api/users/:id` | Ver usuario |
| PUT | `/api/users/:id` | Editar usuario |
| DELETE | `/api/users/:id` | Eliminar usuario |
| GET | `/api/users/:id/products` | Productos de un usuario |
| GET | `/api/products` | Listar productos |
| POST | `/api/products` | Crear producto |
| GET | `/api/products/:id` | Ver producto |
| PUT | `/api/products/:id` | Editar producto |
| DELETE | `/api/products/:id` | Eliminar producto |

---

## Resultado de pruebas

```
Test Suites: 3 passed, 3 total
Tests:       20 passed, 20 total

Cobertura global:
 % Stmts: 86.05  |  % Branch: 70.21  |  % Funcs: 90.24  |  % Lines: 86.20
```

---

## Cómo correr el proyecto

```bash
# Instalar dependencias
npm install

# Datos de prueba
npm run seed

# Desarrollo (hot-reload)
npm run dev

# Tests con cobertura
npm run test:coverage
```

## Con Docker

```bash
docker compose up --build
```

El servicio queda en `http://localhost:3000`  
Healthcheck en `http://localhost:3000/health`

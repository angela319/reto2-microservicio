// src/app.js  —  Microservicio listo para despliegue
const express       = require("express");
const env           = require("./config/env");
const { runMigrations } = require("./config/migrations");
const userRoutes    = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const errorHandler  = require("./middlewares/errorHandler");

// Ejecutar migraciones al arrancar
runMigrations();

const app = express();

// ── Middlewares globales ──────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── /health  — Healthcheck para orquestadores (Docker, K8s, etc.) ─────────────
app.get("/health", (req, res) => {
  res.json({
    status:    "ok",
    service:   env.SERVICE_NAME,
    version:   env.SERVICE_VERSION,
    env:       env.NODE_ENV,
    timestamp: new Date().toISOString(),
    uptime:    `${Math.floor(process.uptime())}s`,
  });
});

// ── Raíz informativa ──────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    service:  env.SERVICE_NAME,
    version:  env.SERVICE_VERSION,
    docs:     "Consulta los endpoints disponibles abajo",
    endpoints: {
      health:   "GET  /health",
      users:    "GET|POST /api/users  —  GET|PUT|DELETE /api/users/:id",
      products: "GET|POST /api/products  —  GET|PUT|DELETE /api/products/:id",
    },
  });
});

// ── Rutas de la API ───────────────────────────────────────────────────────────
app.use("/api/users",    userRoutes);
app.use("/api/products", productRoutes);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Ruta '${req.path}' no encontrada` });
});

// ── Error handler global (debe ir al final) ───────────────────────────────────
app.use(errorHandler);

// ── Arrancar servidor solo si no estamos en test ──────────────────────────────
if (require.main === module) {
  app.listen(env.PORT, () => {
    console.log(`\n🚀  ${env.SERVICE_NAME} v${env.SERVICE_VERSION} corriendo en http://localhost:${env.PORT}`);
    console.log(`🏥  Healthcheck: http://localhost:${env.PORT}/health\n`);
  });
}

module.exports = app; // exportar para tests con supertest

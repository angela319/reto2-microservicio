// src/middlewares/errorHandler.js
// Captura cualquier error no manejado y responde con JSON limpio
function errorHandler(err, req, res, next) {
  console.error("❌  Error:", err.message);

  // Error de constraint de SQLite (ej: email duplicado)
  if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
    return res.status(409).json({ success: false, message: "Valor duplicado: ya existe un registro con ese dato único" });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Error interno del servidor",
  });
}

module.exports = errorHandler;

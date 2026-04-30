// src/config/migrations.js
// Crea las tablas si no existen (ejecutado al iniciar la app)
const db = require("./database");

function runMigrations() {
  db.exec(`
    -- Tabla de usuarios
    CREATE TABLE IF NOT EXISTS users (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT    NOT NULL,
      email      TEXT    NOT NULL UNIQUE,
      role       TEXT    NOT NULL DEFAULT 'user',   -- 'admin' | 'user'
      created_at TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT    NOT NULL DEFAULT (datetime('now'))
    );

    -- Tabla de productos (un usuario crea cada producto)
    CREATE TABLE IF NOT EXISTS products (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT    NOT NULL,
      description TEXT,
      price       REAL    NOT NULL CHECK (price >= 0),
      stock       INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
      user_id     INTEGER NOT NULL,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at  TEXT    NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- Índices para búsquedas frecuentes
    CREATE INDEX IF NOT EXISTS idx_products_user_id ON products(user_id);
    CREATE INDEX IF NOT EXISTS idx_users_email      ON users(email);
  `);

  console.log("✅  Migraciones ejecutadas correctamente");
}

module.exports = { runMigrations };

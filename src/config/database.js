// src/config/database.js
// Conexión única a SQLite usando better-sqlite3
const Database = require("better-sqlite3");
const path = require("path");
const env = require("./env");
const fs = require("fs");

const DB_PATH = path.resolve(env.DB_PATH);

// Asegura que la carpeta exista
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

// Singleton: una sola instancia para toda la app
const db = new Database(DB_PATH);

// Mejoras de rendimiento y consistencia
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

module.exports = db;

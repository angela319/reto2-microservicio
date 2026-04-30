// src/config/env.js  — Centraliza y valida todas las variables de entorno
require("dotenv").config();

const env = {
  PORT:            parseInt(process.env.PORT || "3000", 10),
  NODE_ENV:        process.env.NODE_ENV || "development",
  DB_PATH:         process.env.DB_PATH  || "./data/app.db",
  SERVICE_NAME:    process.env.SERVICE_NAME    || "reto2-microservicio",
  SERVICE_VERSION: process.env.SERVICE_VERSION || "1.0.0",
};

module.exports = env;

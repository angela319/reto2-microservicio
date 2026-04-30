// src/config/seed.js
// Datos iniciales de prueba (ejecutar: npm run seed)
const db = require("./database");
const { runMigrations } = require("./migrations");

runMigrations();

const insertUser = db.prepare(`
  INSERT OR IGNORE INTO users (name, email, role)
  VALUES (@name, @email, @role)
`);

const insertProduct = db.prepare(`
  INSERT OR IGNORE INTO products (name, description, price, stock, user_id)
  VALUES (@name, @description, @price, @stock, @user_id)
`);

const seedAll = db.transaction(() => {
  // Usuarios de ejemplo
  insertUser.run({ name: "Angela Herrera", email: "angela@bia.app",   role: "admin" });
  insertUser.run({ name: "Carlos López",   email: "carlos@bia.app",   role: "user"  });
  insertUser.run({ name: "María García",   email: "maria@bia.app",    role: "user"  });

  // Productos de ejemplo
  const admin = db.prepare("SELECT id FROM users WHERE email = ?").get("angela@bia.app");

  insertProduct.run({ name: "Laptop Pro",    description: "Laptop de alto rendimiento", price: 1299.99, stock: 10, user_id: admin.id });
  insertProduct.run({ name: "Mouse Inalámbrico", description: "Mouse ergonómico",       price:   29.99, stock: 50, user_id: admin.id });
  insertProduct.run({ name: "Teclado Mecánico",  description: "Teclado retroiluminado", price:   89.99, stock: 25, user_id: admin.id });
});

seedAll();
console.log("🌱  Seed completado — datos de prueba insertados");

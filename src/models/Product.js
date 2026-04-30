// src/models/Product.js
const db = require("../config/database");

const Product = {
  // ── CREATE ──────────────────────────────────────────────────────────
  create({ name, description, price, stock = 0, user_id }) {
    const stmt = db.prepare(`
      INSERT INTO products (name, description, price, stock, user_id)
      VALUES (@name, @description, @price, @stock, @user_id)
    `);
    const result = stmt.run({ name, description, price, stock, user_id });
    return this.findById(result.lastInsertRowid);
  },

  // ── READ ALL (con datos del usuario creador) ─────────────────────────
  findAll() {
    return db.prepare(`
      SELECT p.*, u.name AS user_name, u.email AS user_email
      FROM products p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `).all();
  },

  // ── READ ONE ─────────────────────────────────────────────────────────
  findById(id) {
    return db.prepare(`
      SELECT p.*, u.name AS user_name, u.email AS user_email
      FROM products p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = ?
    `).get(id);
  },

  // ── BUSCAR POR USUARIO ────────────────────────────────────────────────
  findByUser(user_id) {
    return db.prepare(
      "SELECT * FROM products WHERE user_id = ? ORDER BY created_at DESC"
    ).all(user_id);
  },

  // ── UPDATE ───────────────────────────────────────────────────────────
  update(id, { name, description, price, stock }) {
    const stmt = db.prepare(`
      UPDATE products
      SET name        = COALESCE(@name,        name),
          description = COALESCE(@description, description),
          price       = COALESCE(@price,       price),
          stock       = COALESCE(@stock,       stock),
          updated_at  = datetime('now')
      WHERE id = @id
    `);
    stmt.run({ id, name, description, price, stock });
    return this.findById(id);
  },

  // ── DELETE ───────────────────────────────────────────────────────────
  delete(id) {
    const product = this.findById(id);
    db.prepare("DELETE FROM products WHERE id = ?").run(id);
    return product;
  },
};

module.exports = Product;

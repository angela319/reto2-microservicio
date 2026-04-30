// src/models/User.js
// El Model encapsula TODA la lógica de acceso a datos del recurso
const db = require("../config/database");

const User = {
  // ── CREATE ──────────────────────────────────────────────────────────
  create({ name, email, role = "user" }) {
    const stmt = db.prepare(`
      INSERT INTO users (name, email, role)
      VALUES (@name, @email, @role)
    `);
    const result = stmt.run({ name, email, role });
    return this.findById(result.lastInsertRowid);
  },

  // ── READ ALL ─────────────────────────────────────────────────────────
  findAll() {
    return db.prepare("SELECT * FROM users ORDER BY created_at DESC").all();
  },

  // ── READ ONE ─────────────────────────────────────────────────────────
  findById(id) {
    return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  },

  findByEmail(email) {
    return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  },

  // ── UPDATE ───────────────────────────────────────────────────────────
  update(id, { name, email, role }) {
    const stmt = db.prepare(`
      UPDATE users
      SET name       = COALESCE(@name,  name),
          email      = COALESCE(@email, email),
          role       = COALESCE(@role,  role),
          updated_at = datetime('now')
      WHERE id = @id
    `);
    stmt.run({ id, name, email, role });
    return this.findById(id);
  },

  // ── DELETE ───────────────────────────────────────────────────────────
  delete(id) {
    const user = this.findById(id);
    db.prepare("DELETE FROM users WHERE id = ?").run(id);
    return user; // devuelve el registro eliminado
  },
};

module.exports = User;

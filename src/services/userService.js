// src/services/userService.js
// La capa Service contiene la lógica de negocio.
// El Controller solo recibe/responde HTTP; el Model solo habla con la DB.
const User = require("../models/User");

const userService = {
  getAll() {
    return User.findAll();
  },

  getById(id) {
    const user = User.findById(id);
    if (!user) throw Object.assign(new Error("Usuario no encontrado"), { status: 404 });
    return user;
  },

  create({ name, email, role }) {
    if (!name || !email) {
      throw Object.assign(new Error("name y email son requeridos"), { status: 400 });
    }
    if (User.findByEmail(email)) {
      throw Object.assign(new Error("El email ya está registrado"), { status: 409 });
    }
    return User.create({ name, email, role });
  },

  update(id, fields) {
    const user = User.findById(id);
    if (!user) throw Object.assign(new Error("Usuario no encontrado"), { status: 404 });
    return User.update(id, fields);
  },

  remove(id) {
    const user = User.findById(id);
    if (!user) throw Object.assign(new Error("Usuario no encontrado"), { status: 404 });
    User.delete(id);
    return user;
  },
};

module.exports = userService;

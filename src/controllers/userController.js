// src/controllers/userController.js
// El Controller solo maneja HTTP: recibe req, llama al Service y responde
const userService = require("../services/userService");

const userController = {
  index(req, res, next) {
    try {
      const users = userService.getAll();
      res.json({ success: true, data: users, total: users.length });
    } catch (e) { next(e); }
  },

  show(req, res, next) {
    try {
      const user = userService.getById(Number(req.params.id));
      res.json({ success: true, data: user });
    } catch (e) { next(e); }
  },

  create(req, res, next) {
    try {
      const user = userService.create(req.body);
      res.status(201).json({ success: true, data: user, message: "Usuario creado" });
    } catch (e) { next(e); }
  },

  update(req, res, next) {
    try {
      const user = userService.update(Number(req.params.id), req.body);
      res.json({ success: true, data: user, message: "Usuario actualizado" });
    } catch (e) { next(e); }
  },

  destroy(req, res, next) {
    try {
      const user = userService.remove(Number(req.params.id));
      res.json({ success: true, data: user, message: "Usuario eliminado" });
    } catch (e) { next(e); }
  },
};

module.exports = userController;

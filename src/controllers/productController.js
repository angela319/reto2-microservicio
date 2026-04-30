// src/controllers/productController.js
// El Controller solo maneja HTTP: recibe req, llama al Service y responde
const productService = require("../services/productService");

const productController = {
  index(req, res, next) {
    try {
      const products = productService.getAll();
      res.json({ success: true, data: products, total: products.length });
    } catch (e) { next(e); }
  },

  show(req, res, next) {
    try {
      const product = productService.getById(Number(req.params.id));
      res.json({ success: true, data: product });
    } catch (e) { next(e); }
  },

  create(req, res, next) {
    try {
      const product = productService.create(req.body);
      res.status(201).json({ success: true, data: product, message: "Producto creado" });
    } catch (e) { next(e); }
  },

  update(req, res, next) {
    try {
      const product = productService.update(Number(req.params.id), req.body);
      res.json({ success: true, data: product, message: "Producto actualizado" });
    } catch (e) { next(e); }
  },

  destroy(req, res, next) {
    try {
      const product = productService.remove(Number(req.params.id));
      res.json({ success: true, data: product, message: "Producto eliminado" });
    } catch (e) { next(e); }
  },

  byUser(req, res, next) {
    try {
      const products = productService.getByUser(Number(req.params.id));
      res.json({ success: true, data: products, total: products.length });
    } catch (e) { next(e); }
  },
};

module.exports = productController;

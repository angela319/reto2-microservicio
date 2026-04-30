// src/services/productService.js
const Product = require("../models/Product");
const User    = require("../models/User");

const productService = {
  getAll() {
    return Product.findAll();
  },

  getById(id) {
    const product = Product.findById(id);
    if (!product) throw Object.assign(new Error("Producto no encontrado"), { status: 404 });
    return product;
  },

  getByUser(userId) {
    if (!User.findById(userId)) {
      throw Object.assign(new Error("Usuario no encontrado"), { status: 404 });
    }
    return Product.findByUser(userId);
  },

  create({ name, description, price, stock, user_id }) {
    if (!name || price === undefined || !user_id) {
      throw Object.assign(new Error("name, price y user_id son requeridos"), { status: 400 });
    }
    if (!User.findById(user_id)) {
      throw Object.assign(new Error("Usuario creador no existe"), { status: 404 });
    }
    return Product.create({ name, description, price, stock, user_id });
  },

  update(id, fields) {
    if (!Product.findById(id)) {
      throw Object.assign(new Error("Producto no encontrado"), { status: 404 });
    }
    return Product.update(id, fields);
  },

  remove(id) {
    const product = Product.findById(id);
    if (!product) throw Object.assign(new Error("Producto no encontrado"), { status: 404 });
    Product.delete(id);
    return product;
  },
};

module.exports = productService;

// src/routes/userRoutes.js
const { Router } = require("express");
const userController    = require("../controllers/userController");
const productController = require("../controllers/productController");

const router = Router();

router.get(   "/",           userController.index);   // Listar todos
router.get(   "/:id",        userController.show);    // Ver uno
router.post(  "/",           userController.create);  // Crear
router.put(   "/:id",        userController.update);  // Editar
router.delete("/:id",        userController.destroy); // Eliminar

// Ruta anidada: productos de un usuario
router.get("/:id/products",  productController.byUser);

module.exports = router;

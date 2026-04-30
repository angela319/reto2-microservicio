// src/routes/productRoutes.js
const { Router } = require("express");
const productController = require("../controllers/productController");

const router = Router();

router.get(   "/",    productController.index);   // Listar todos
router.get(   "/:id", productController.show);    // Ver uno
router.post(  "/",    productController.create);  // Crear
router.put(   "/:id", productController.update);  // Editar
router.delete("/:id", productController.destroy); // Eliminar

module.exports = router;

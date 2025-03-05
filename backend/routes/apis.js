const express = require("express");
const productController = require("../controller/productController");

const router = express.Router();

// Product Routes
router.get("/get-products", productController.getProducts);
router.post("/add-product", productController.addProduct);

// Auth Routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;
const express = require("express");
const productController = require("../controller/productController");
const checkAuth = require("../middleware/checkAuth");
const orderController = require("../controller/orderController");
const authController = require("../controller/authController");

const router = express.Router();

// Product Routes
router.get("/get-products", productController.getProducts);
router.post("/add-product", productController.addProduct);
router.get("/:id/get-product", productController.getProductById);

// Review Routes
router.post("/:id/reviews", productController.addReview);

// Auth Routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// Order Routes
router.post("/place-order", checkAuth, orderController.placeOrder);
router.post("/cancel-order", checkAuth, orderController.cancelOrder);
router.get("/get-orders/:id", checkAuth, orderController.getOrders);

module.exports = router;
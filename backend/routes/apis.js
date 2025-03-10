const express = require("express");
const productController = require("../controller/productController");
const checkAuth = require("../middleware/checkAuth");

const router = express.Router();

// Product Routes
router.get("/get-products", productController.getProducts);
router.post("/add-product", productController.addProduct);

// Auth Routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// Order Routes

// place order
router.post("/place-order", checkAuth, (req, res, next) => {
    Order.create(req.body)
        .then(() => {
            res.send({
                message: "Order Placed Successfully",
                order: req.body,
            });
        })
        .catch((error) => {
            res.status(400).send({
                message: "Order Failed",
            });
        });
});

router.post("/cancel-order", checkAuth, (req, res, next) => {
    Order.findByIdAndUpdate(req.body.order_id, {
        order_cancelled: true,
        percentage_complete: 0,
        expected_delivery_date: "",
    })
        .then(() => {
            res.status(200).send({
                message: "Order cancelled successfully",
                order: req.body.order_id,
            });
        })
        .catch(() => {
            res.status(400).send({
                message: "Order cancellation failed",
            });
        });
});

// get orders where user id matches
router.get("/get-orders/:id", checkAuth, (req, res, next) => {
    Order.find({ user_id: req.params.id })
        .then((orders) => {
            res.status(200).send({
                orders: orders,
                message: "Orders Fetched Successfully",
            });
        })
        .catch((error) => {
            res.status(400).send({
                message: "Orders not found",
            });
        });
});


module.exports = router;
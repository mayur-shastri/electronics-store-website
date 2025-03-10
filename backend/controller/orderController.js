const Order = require("../models/Order");

const orderController = {
    placeOrder: async (req, res) => {
        try {
            await Order.create(req.body);
            res.send({
                message: "Order Placed Successfully",
                order: req.body,
            });
        } catch (error) {
            res.status(400).send({
                message: "Order Failed",
            });
        }
    },
    cancelOrder: async (req, res) => {
        try {
            await Order.findByIdAndUpdate(req.body.order_id, {
                order_cancelled: true,
                percentage_complete: 0,
                expected_delivery_date: "",
            });
            res.status(200).send({
                message: "Order cancelled successfully",
                order: req.body.order_id,
            });
        } catch (error) {
            res.status(400).send({
                message: "Order cancellation failed",
            });
        }
    },
    getOrders: async (req, res) => {
        try {
            const orders = await Order.find({ user_id: req.params.id });
            res.status(200).send({
                orders: orders,
                message: "Orders Fetched Successfully",
            });
        } catch (error) {
            res.status(400).send({
                message: "Orders not found",
            });
        }
    }
};

module.exports = orderController;
const Product = require("../models/Product");

const productController = {
  getProducts: async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ message: "Products not found", error: error.message });
    }
  },
  addProduct: async (req, res) => {
    try {
      await Product.create(req.body);
      res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
      res.status(400).json({ message: "Failed to add product", error: error.message });
    }
  },
};

module.exports = productController;
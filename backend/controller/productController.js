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
  getProductById : async (req, res) => {
    try{
      const product = await Product.findById(req.params.id);
      res.json(product);
    }
    catch (error) {
      res.status(400).json({ message: "Failed to get product", error: error.message });
    }
  },
  addReview : async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      const { rating, comment, userName } = req.body;
      product.reviews.push({ user: userName, rating, comment });
      product.updateRating();
      
      await product.save();
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = productController;
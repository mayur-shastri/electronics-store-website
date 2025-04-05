const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  description: {
    type: String,
    required: [true, "Description field is required"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "Price field is required"],
  },
  price_before: {
    type: Number,
  },
  times_bought: {
    type: Number,
    default: 0,
  },
  product_image: {
    type: String,
  },
  tags: {
    type: String,
  },
  reviews: [reviewSchema]
});

productSchema.pre("save", function (next) {
  this.price_before = this.price;
  next();
});

// Method to update rating when new review is added
productSchema.methods.updateRating = function() {
  if (this.reviews.length === 0) {
    this.rating = 0;
    return;
  }
  
  const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  this.rating = sum / this.reviews.length;
};

module.exports = mongoose.model("Product", productSchema);
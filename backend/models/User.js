const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
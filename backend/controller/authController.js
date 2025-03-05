const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const setTokenCookie = (res, token) => {
  res.cookie("userToken", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "None",
    secure: true,
  });
};

const formatUserResponse = (user) => ({
  user: {
    id: user._id,
    username: user.username,
  },
});

const authController = {
  register: async (req, res) => {
    const { email, password, username } = req.body;

    try {
      const user = await User.create({ email, password, username });
      const token = createToken(user._id);
      setTokenCookie(res, token);
      res.status(201).json(formatUserResponse(user));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      setTokenCookie(res, token);
      res.status(200).json(formatUserResponse(user));
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },

  logout: (req, res) => {
    try {
      res.clearCookie("userToken");
      res.status(200).json({ message: "User logged out" });
    } catch (error) {
      res.status(500).json({ error: "Server error during logout" });
    }
  },
};

module.exports = authController;
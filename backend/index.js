require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routes = require("./routes/apis");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_DB_URI;
const FRONTEND_URL = process.env.FRONTEND_URL;

if (!MONGO_URI) {
  throw new Error("MongoDB URI not found in .env file");
}

app.use(cookieParser());
app.use(bodyParser.json());

const corsConfig = {
  credentials: true,
  origin: FRONTEND_URL,
  sameSite: "none",
  // secure: true, // uncomment in when using HTTPS
};
app.use(cors(corsConfig));

app.get('/', (req, res) => {
  res.json({message : "Hello World"});
})

app.use("/api", routes);

app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(422).json({ error: err.message });
});

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
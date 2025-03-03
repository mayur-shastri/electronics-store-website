require("dotenv").config();

const express = require("express");
const routes = require("./routes/apis");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const uri = process.env.MONGO_DB_URI;
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cookieParser());
if (typeof uri === "string") {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("Connected to MongoDB");
      console.log("Starting server");
      const corsConfig = {
        credentials: true,
        origin: process.env.FRONTEND_URL,
        sameSite: "none",
        Secure: true,
      };
      app.use(cors(corsConfig));
      app.use(bodyParser.json());
      app.use("/api", routes);
      app.use((err, req, res, next) => {
        res.status(422).send({ error: err.message });
      });

      app.listen(process.env.PORT || 3000, () => {
        console.log("Server is running...");
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
} else {
  console.log("MongoDB URI not found in .env file");
}
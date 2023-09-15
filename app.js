require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// middleware
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

// Db
const connectDB = require("./db/connect");

// Routes
const ProductRoutes = require("./routes/products");

// *********************************
// *********************************

app.use("/api/v1/products", ProductRoutes);

app.use(notFound);
app.use(errorHandler);

// start
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => {
      console.log(`Listening on port : ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

require("dotenv").config();

const express = require("express");
const app = express();

// middleware
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

// Db
const connectDB = require("./db/connect");

// *********************************
// *********************************

app.use(notFound);
app.use(errorHandler);

// start
const port = process.env.PORT;
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

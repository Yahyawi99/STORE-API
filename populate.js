require("dotenv").config();

const Product = require("./models/product");

const Data = require("./products.json");

const connectDB = require("./db/connect");

// start
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    await Product.deleteMany();

    await Product.create(Data);

    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

start();

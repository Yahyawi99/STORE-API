const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;

  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company && ["ikea", "liddy", "marcos", "caressa"].includes(company)) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  const products = await Product.find(queryObject);

  res.status(StatusCodes.OK).json({ products, count: products.length });
};

// static
const getAllProductsStatic = async (req, res) => {
  const search = "bed";
  const products = await Product.find({
    name: { $regex: search, $options: "i" },
  });

  res.status(StatusCodes.OK).json({ products, count: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};

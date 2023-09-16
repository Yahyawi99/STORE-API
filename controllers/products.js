const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort } = req.query;

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

  const result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  const products = await result;

  res.status(StatusCodes.OK).json({ products, count: products.length });
};

// static
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort(" price");

  res.status(StatusCodes.OK).json({ products, count: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};

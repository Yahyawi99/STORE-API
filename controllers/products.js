const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");

const getAllProducts = async (req, res) => {
  const products = await Product.find(req.query);

  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ featured: true });

  res.status(StatusCodes.OK).json({ products, count: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};

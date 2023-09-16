const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, select } = req.query;

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

  let result = Product.find(queryObject);

  // Sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // Select
  if (select) {
    const selectList = select.split(",").join(" ");
    result = result.select(selectList);
  }

  const products = await result;

  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getAllProductsStatic = async (req, res) => {
  res.send();
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};

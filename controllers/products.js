const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, select, numericFilters } = req.query;

  // search
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

  // page and limit
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  // Numerique filters
  if (numericFilters) {
    let filterObject = {};
    const signObject = {
      "<": "$lt",
      ">": "$gt",
      ">=": "$gte",
      "<=": "$lte",
      "=": "$eq",
    };

    const filtersArray = numericFilters.split(",");

    filtersArray.forEach((filter) => {
      const name = filter.match(/[a-z]/g).join("");

      const sign = filter.match(/\W/g).join("");

      const value = Number(filter.match(/\d/g).join(""));

      filterObject[name] = { [signObject[sign]]: value };
    });

    result = result.find(filterObject);
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

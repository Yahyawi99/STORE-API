const getAllProducts = async (req, res) => {
  res.send("get all");
};

const getAllProductsStatic = async (req, res) => {
  res.send("get all testing route");
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};

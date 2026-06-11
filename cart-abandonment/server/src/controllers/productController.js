const productService = require('../services/productService');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id, 10);
    const product = await productService.getProductById(productId);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById
};

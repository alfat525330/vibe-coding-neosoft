const { Product } = require('../models');

const getAllProducts = async () => {
  return await Product.findAll();
};

const getProductById = async (id) => {
  return await Product.findByPk(id);
};

module.exports = {
  getAllProducts,
  getProductById
};

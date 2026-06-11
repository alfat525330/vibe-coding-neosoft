const productRepository = require('../repositories/productRepository');

const getAllProducts = async () => {
  return await productRepository.getAllProducts();
};

const getProductById = async (id) => {
  const product = await productRepository.getProductById(id);
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  return product;
};

module.exports = {
  getAllProducts,
  getProductById
};

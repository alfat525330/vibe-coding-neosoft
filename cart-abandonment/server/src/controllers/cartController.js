const cartService = require('../services/cartService');

const createCart = async (req, res, next) => {
  try {
    const cart = await cartService.createCart();
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

const getCart = async (req, res, next) => {
  try {
    const cartId = parseInt(req.params.cartId, 10);
    const cart = await cartService.getCart(cartId);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

const addItem = async (req, res, next) => {
  try {
    const cartId = parseInt(req.params.cartId, 10);
    const { productId, quantity } = req.body;
    const cart = await cartService.addItemToCart(cartId, parseInt(productId, 10), parseInt(quantity, 10));
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const cartId = parseInt(req.params.cartId, 10);
    const productId = parseInt(req.params.productId, 10);
    const { quantity } = req.body;
    const cart = await cartService.updateItemQuantity(cartId, productId, parseInt(quantity, 10));
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

const removeItem = async (req, res, next) => {
  try {
    const cartId = parseInt(req.params.cartId, 10);
    const productId = parseInt(req.params.productId, 10);
    const cart = await cartService.removeItemFromCart(cartId, productId);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

const updateEmail = async (req, res, next) => {
  try {
    const cartId = parseInt(req.params.cartId, 10);
    const { email } = req.body;
    const cart = await cartService.updateCartEmail(cartId, email);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

const checkout = async (req, res, next) => {
  try {
    const cartId = parseInt(req.params.cartId, 10);
    const cart = await cartService.completeCheckout(cartId);
    res.json({ message: 'Purchase completed successfully.', cart });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCart,
  getCart,
  addItem,
  updateItem,
  removeItem,
  updateEmail,
  checkout
};

const cartRepository = require('../repositories/cartRepository');
const productRepository = require('../repositories/productRepository');

const calculateTotals = (cart) => {
  if (!cart || !cart.items || cart.items.length === 0) {
    return { subtotal: 0.00, total: 0.00, itemCount: 0 };
  }
  let subtotal = 0;
  let itemCount = 0;
  cart.items.forEach(item => {
    if (item.product) {
      subtotal += parseFloat(item.product.price) * item.quantity;
      itemCount += item.quantity;
    }
  });
  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    total: parseFloat(subtotal.toFixed(2)), // For MVP, subtotal and total are identical (no taxes/shipping configured)
    itemCount
  };
};

const getCart = async (cartId) => {
  const cart = await cartRepository.getCartById(cartId);
  if (!cart) {
    const error = new Error('Cart not found');
    error.statusCode = 404;
    throw error;
  }
  const totals = calculateTotals(cart);
  return {
    id: cart.id,
    email: cart.email,
    status: cart.status,
    lastActivityAt: cart.lastActivityAt,
    items: cart.items,
    ...totals
  };
};

const createCart = async () => {
  return await cartRepository.createCart();
};

const addItemToCart = async (cartId, productId, quantity) => {
  const product = await productRepository.getProductById(productId);
  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  // Verify that the cart exists
  await getCart(cartId);

  await cartRepository.addItemToCart(cartId, productId, quantity);
  return await getCart(cartId);
};

const updateItemQuantity = async (cartId, productId, quantity) => {
  // Verify that the cart and product exist in the cart
  const cart = await getCart(cartId);
  const itemExists = cart.items.some(item => item.productId === productId);
  if (!itemExists) {
    const error = new Error('Item not found in cart');
    error.statusCode = 404;
    throw error;
  }

  await cartRepository.updateItemQuantity(cartId, productId, quantity);
  return await getCart(cartId);
};

const removeItemFromCart = async (cartId, productId) => {
  const cart = await getCart(cartId);
  const itemExists = cart.items.some(item => item.productId === productId);
  if (!itemExists) {
    const error = new Error('Item not found in cart');
    error.statusCode = 404;
    throw error;
  }

  await cartRepository.removeItemFromCart(cartId, productId);
  return await getCart(cartId);
};

const updateCartEmail = async (cartId, email) => {
  await getCart(cartId);
  await cartRepository.updateCartEmail(cartId, email);
  return await getCart(cartId);
};

const completeCheckout = async (cartId) => {
  await getCart(cartId);
  await cartRepository.updateCartStatus(cartId, 'completed');
  return await getCart(cartId);
};

module.exports = {
  getCart,
  createCart,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  updateCartEmail,
  completeCheckout
};

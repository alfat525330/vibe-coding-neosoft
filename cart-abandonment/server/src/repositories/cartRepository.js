const { Cart, CartItem, Product, EmailLog } = require('../models');
const { Op } = require('sequelize');

const getCartById = async (cartId) => {
  return await Cart.findOne({
    where: { id: cartId },
    include: [
      {
        model: CartItem,
        as: 'items',
        include: [
          {
            model: Product,
            as: 'product'
          }
        ]
      }
    ]
  });
};

const createCart = async () => {
  return await Cart.create({
    status: 'active',
    lastActivityAt: new Date()
  });
};

const updateCartActivity = async (cartId) => {
  return await Cart.update(
    { lastActivityAt: new Date() },
    { where: { id: cartId } }
  );
};

const addItemToCart = async (cartId, productId, quantity) => {
  let item = await CartItem.findOne({
    where: { cartId, productId }
  });

  if (item) {
    item.quantity += quantity;
    await item.save();
  } else {
    item = await CartItem.create({
      cartId,
      productId,
      quantity
    });
  }
  await updateCartActivity(cartId);
  return item;
};

const updateItemQuantity = async (cartId, productId, quantity) => {
  const result = await CartItem.update(
    { quantity },
    { where: { cartId, productId } }
  );
  await updateCartActivity(cartId);
  return result;
};

const removeItemFromCart = async (cartId, productId) => {
  const result = await CartItem.destroy({
    where: { cartId, productId }
  });
  await updateCartActivity(cartId);
  return result;
};

const updateCartEmail = async (cartId, email) => {
  const result = await Cart.update(
    { email, lastActivityAt: new Date() },
    { where: { id: cartId } }
  );
  return result;
};

const updateCartStatus = async (cartId, status) => {
  return await Cart.update(
    { status, lastActivityAt: new Date() },
    { where: { id: cartId } }
  );
};

const getAbandonedCarts = async () => {
  return await Cart.findAll({
    where: { status: 'abandoned' },
    include: [
      {
        model: CartItem,
        as: 'items',
        include: [{ model: Product, as: 'product' }]
      },
      {
        model: EmailLog,
        as: 'emailLogs'
      }
    ],
    order: [['updatedAt', 'DESC']]
  });
};

const getInactiveCartsToAbandon = async (thresholdMinutes) => {
  const thresholdDate = new Date(Date.now() - thresholdMinutes * 60 * 1000);
  return await Cart.findAll({
    where: {
      status: 'active',
      email: { [Op.ne]: null },
      lastActivityAt: { [Op.lte]: thresholdDate }
    },
    include: [
      {
        model: CartItem,
        as: 'items',
        include: [{ model: Product, as: 'product' }]
      }
    ]
  });
};

module.exports = {
  getCartById,
  createCart,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  updateCartEmail,
  updateCartStatus,
  getAbandonedCarts,
  getInactiveCartsToAbandon
};

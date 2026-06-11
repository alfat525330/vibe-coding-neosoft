const sequelize = require('../config/db');
const User = require('./User');
const Product = require('./Product');
const Cart = require('./Cart');
const CartItem = require('./CartItem');
const EmailLog = require('./EmailLog');

// Set up associations
Cart.hasMany(CartItem, { foreignKey: 'cartId', as: 'items', onDelete: 'CASCADE' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

Cart.hasMany(EmailLog, { foreignKey: 'cartId', as: 'emailLogs', onDelete: 'CASCADE' });
EmailLog.belongsTo(Cart, { foreignKey: 'cartId' });

module.exports = {
  sequelize,
  User,
  Product,
  Cart,
  CartItem,
  EmailLog
};

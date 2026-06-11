const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const adminController = require('../controllers/adminController');

const { validateEmail, validateCartItem } = require('../validators/validation');

// 1. Product Catalog routes
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);

// 2. Cart Management routes
router.post('/cart', cartController.createCart);
router.get('/cart/:cartId', cartController.getCart);
router.post('/cart/:cartId/items', validateCartItem, cartController.addItem);
router.put('/cart/:cartId/items/:productId', validateCartItem, cartController.updateItem);
router.delete('/cart/:cartId/items/:productId', cartController.removeItem);
router.put('/cart/:cartId/email', validateEmail, cartController.updateEmail);
router.post('/cart/:cartId/checkout', cartController.checkout);

// 3. Admin Dashboard routes
router.get('/admin/abandoned', adminController.getAbandonedCartsDashboard);

module.exports = router;

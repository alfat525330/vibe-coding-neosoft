const cartRepository = require('../repositories/cartRepository');

const getAbandonedCartsDashboard = async (req, res, next) => {
  try {
    const carts = await cartRepository.getAbandonedCarts();

    // Map each cart to calculate totals and item details for dashboard consumption
    const formattedCarts = carts.map(cart => {
      let subtotal = 0;
      let totalQty = 0;
      const items = cart.items.map(item => {
        const itemPrice = item.product ? parseFloat(item.product.price) : 0;
        const itemTotal = itemPrice * item.quantity;
        subtotal += itemTotal;
        totalQty += item.quantity;

        return {
          productId: item.productId,
          productName: item.product ? item.product.name : 'Unknown Product',
          quantity: item.quantity,
          unitPrice: itemPrice,
          totalPrice: parseFloat(itemTotal.toFixed(2))
        };
      });

      // Find the most recent email log status
      let emailStatus = 'none';
      let sentAt = null;
      if (cart.emailLogs && cart.emailLogs.length > 0) {
        // Sort logs by newest first
        const sortedLogs = [...cart.emailLogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        emailStatus = sortedLogs[0].status;
        sentAt = sortedLogs[0].sentAt;
      }

      return {
        cartId: cart.id,
        email: cart.email,
        status: cart.status,
        lastActivityAt: cart.lastActivityAt,
        totalValue: parseFloat(subtotal.toFixed(2)),
        totalQuantity: totalQty,
        items,
        emailStatus,
        emailSentAt: sentAt
      };
    });

    res.json(formattedCarts);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAbandonedCartsDashboard
};

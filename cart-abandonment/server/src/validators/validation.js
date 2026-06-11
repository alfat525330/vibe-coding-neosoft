const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }
  next();
};

const validateCartItem = (req, res, next) => {
  const { productId, quantity } = req.body;
  const pId = parseInt(productId, 10);
  const qty = parseInt(quantity, 10);

  if (isNaN(pId) || pId <= 0) {
    return res.status(400).json({ error: 'Valid Product ID is required.' });
  }
  if (req.method === 'POST' || quantity !== undefined) {
    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ error: 'Quantity must be a positive integer.' });
    }
  }
  next();
};

module.exports = {
  validateEmail,
  validateCartItem
};

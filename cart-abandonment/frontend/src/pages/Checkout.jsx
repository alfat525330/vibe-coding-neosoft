import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { setCartEmail, setItemCount, resetCart } from '../store';
import { TableSkeleton } from '../components/Skeletons';
import './Checkout.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const { cartId, email: storedEmail } = useSelector(state => state.cart);

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailInput, setEmailInput] = useState(storedEmail);
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    if (cartId) {
      loadCart();
    } else {
      setLoading(false);
    }
  }, [cartId]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const data = await api.fetchCart(cartId);
      setCart(data);
      dispatch(setItemCount(data.itemCount));
      if (data.email) {
        setEmailInput(data.email);
        dispatch(setCartEmail(data.email));
      }
    } catch (err) {
      console.error('Failed to load cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQty = async (productId, currentQty, increment) => {
    const newQty = currentQty + increment;
    if (newQty <= 0) return;
    try {
      const updated = await api.updateCartItem(cartId, productId, newQty);
      setCart(updated);
      dispatch(setItemCount(updated.itemCount));
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const updated = await api.removeCartItem(cartId, productId);
      setCart(updated);
      dispatch(setItemCount(updated.itemCount));
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const validateAndSaveEmail = async () => {
    setEmailError('');
    setEmailSuccess(false);

    if (!emailInput) {
      setEmailError('Email is required for checkout notification updates.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailInput)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    try {
      const updated = await api.updateCartEmail(cartId, emailInput);
      setCart(updated);
      dispatch(setCartEmail(emailInput));
      setEmailSuccess(true);
      setTimeout(() => setEmailSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save email:', err);
      setEmailError('Failed to save email to cart.');
    }
  };

  const handleCheckoutComplete = async () => {
    if (!emailInput) {
      setEmailError('Please enter your email to complete checkout.');
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailInput)) {
      setEmailError('Please enter a valid email address first.');
      return;
    }

    setPurchasing(true);
    try {
      // Complete email update check
      await api.updateCartEmail(cartId, emailInput);
      dispatch(setCartEmail(emailInput));

      // Checkout complete
      await api.completeCheckout(cartId);
      setPurchased(true);
      dispatch(resetCart());
    } catch (err) {
      console.error('Failed to complete purchase:', err);
      alert('Could not complete purchase. Please try again.');
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h1>Checkout Summary</h1>
        <div style={{ marginTop: '2rem' }}>
          <TableSkeleton />
        </div>
      </div>
    );
  }

  if (purchased) {
    return (
      <div className="container checkout-success">
        <div className="success-badge">🎉</div>
        <h2>Thank you for your purchase!</h2>
        <p className="order-number">Order #VIBE-{Math.floor(Math.random() * 900000) + 100000}</p>
        <p className="success-desc">
          Your order has been placed successfully. A confirmation email has been logged under your captured email address.
        </p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '2rem' }}>
          Back to Catalog
        </Link>
      </div>
    );
  }

  if (!cartId || !cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container empty-cart">
        <div className="empty-badge">🛒</div>
        <h2>Your Cart is Empty</h2>
        <p>You haven't added any products to your cart yet.</p>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="container checkout-container">
      <div className="checkout-main">
        <div className="card checkout-card">
          <h2>Your Items</h2>
          <div className="checkout-table-wrapper">
            <table className="checkout-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className="table-product-cell">
                        <img 
                          src={item.product?.imageUrl} 
                          alt={item.product?.name} 
                          className="table-product-thumb"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60';
                          }}
                        />
                        <div>
                          <div className="table-product-name">{item.product?.name}</div>
                          <div className="table-product-desc">{item.product?.description}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="qty-controls">
                        <button 
                          className="qty-btn"
                          onClick={() => handleUpdateQty(item.productId, item.quantity, -1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="qty-val">{item.quantity}</span>
                        <button 
                          className="qty-btn"
                          onClick={() => handleUpdateQty(item.productId, item.quantity, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="table-price">${parseFloat(item.product?.price || 0).toFixed(2)}</td>
                    <td className="table-total">${(parseFloat(item.product?.price || 0) * item.quantity).toFixed(2)}</td>
                    <td>
                      <button 
                        className="delete-item-btn" 
                        onClick={() => handleRemoveItem(item.productId)}
                        title="Remove product"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card email-capture-card">
          <h2>Capture Checkout Details</h2>
          <p className="email-hint">Enter your email address. It will automatically save to lock in your cart items for recovery updates.</p>
          <div className="input-group">
            <span className="input-icon">✉️</span>
            <input 
              type="email" 
              className={`form-input ${emailError ? 'input-error' : ''}`}
              placeholder="name@example.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onBlur={validateAndSaveEmail}
            />
          </div>
          {emailError && <div className="validation-error">{emailError}</div>}
          {emailSuccess && <div className="validation-success">✓ Checkout details auto-saved!</div>}
        </div>
      </div>

      <div className="checkout-summary-sidebar">
        <div className="card summary-card">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal ({cart.itemCount} items)</span>
            <span>${cart.subtotal?.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="shipping-free">FREE</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total-row">
            <span>Total</span>
            <span className="total-price-val">${cart.total?.toFixed(2)}</span>
          </div>
          <button 
            className="btn btn-primary checkout-action-btn"
            onClick={handleCheckoutComplete}
            disabled={purchasing}
          >
            {purchasing ? 'Processing...' : 'Complete Purchase'}
          </button>
          <Link to="/" className="btn btn-secondary back-to-shop-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import api from '../services/api';
import { setCartId, setItemCount } from '../store';
import { ProductSkeleton } from '../components/Skeletons';
import './Catalog.css';

const Catalog = () => {
  const dispatch = useDispatch();
  const cartId = useSelector(state => state.cart.cartId);
  const [addingId, setAddingId] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: api.fetchProducts
  });

  const handleAddToCart = async (productId) => {
    setAddingId(productId);
    setSuccessMsg('');
    try {
      let activeCartId = cartId;
      
      // Initialize cart in database if not exists
      if (!activeCartId) {
        const newCart = await api.createCart();
        activeCartId = newCart.id;
        dispatch(setCartId(activeCartId));
      }

      // Add item to cart
      const updatedCart = await api.addItemToCart(activeCartId, productId, 1);
      dispatch(setItemCount(updatedCart.itemCount));
      
      setSuccessMsg('Product added to cart successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error('Failed to add item:', err);
      alert('Could not add item to cart. Please check backend connection.');
    } finally {
      setAddingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="container">
        <h1>Product Catalog</h1>
        <p className="subtitle">Discover our premium tech and essentials</p>
        <div style={{ marginTop: '2rem' }}>
          <ProductSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container error-container">
        <h2>Failed to load products</h2>
        <p>Ensure the backend Express server is running on port 5000 and MySQL is active.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="catalog-header">
        <div>
          <h1>Product Catalog</h1>
          <p className="subtitle">Discover our premium tech and essentials</p>
        </div>
        {successMsg && <div className="toast-success">{successMsg}</div>}
      </div>

      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="card product-card">
            <div className="product-image-container">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="product-image"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">${parseFloat(product.price).toFixed(2)}</span>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product.id)}
                  disabled={addingId === product.id}
                >
                  {addingId === product.id ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

const api = {
  // Product Catalog
  fetchProducts: async () => {
    const res = await API.get('/products');
    return res.data;
  },
  fetchProduct: async (id) => {
    const res = await API.get(`/products/${id}`);
    return res.data;
  },

  // Cart Management
  createCart: async () => {
    const res = await API.post('/cart');
    return res.data;
  },
  fetchCart: async (cartId) => {
    const res = await API.get(`/cart/${cartId}`);
    return res.data;
  },
  addItemToCart: async (cartId, productId, quantity) => {
    const res = await API.post(`/cart/${cartId}/items`, { productId, quantity });
    return res.data;
  },
  updateCartItem: async (cartId, productId, quantity) => {
    const res = await API.put(`/cart/${cartId}/items/${productId}`, { quantity });
    return res.data;
  },
  removeCartItem: async (cartId, productId) => {
    const res = await API.delete(`/cart/${cartId}/items/${productId}`);
    return res.data;
  },
  updateCartEmail: async (cartId, email) => {
    const res = await API.put(`/cart/${cartId}/email`, { email });
    return res.data;
  },
  completeCheckout: async (cartId) => {
    const res = await API.post(`/cart/${cartId}/checkout`);
    return res.data;
  },

  // Admin Dashboard
  fetchAbandonedCarts: async () => {
    const res = await API.get('/admin/abandoned');
    return res.data;
  }
};

export default api;

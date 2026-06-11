import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialCartId = localStorage.getItem('vibe_cart_id') 
  ? parseInt(localStorage.getItem('vibe_cart_id'), 10) 
  : null;

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartId: initialCartId,
    itemCount: 0,
    email: localStorage.getItem('vibe_cart_email') || ''
  },
  reducers: {
    setCartId: (state, action) => {
      state.cartId = action.payload;
      if (action.payload) {
        localStorage.setItem('vibe_cart_id', action.payload);
      } else {
        localStorage.removeItem('vibe_cart_id');
      }
    },
    setCartEmail: (state, action) => {
      state.email = action.payload;
      if (action.payload) {
        localStorage.setItem('vibe_cart_email', action.payload);
      } else {
        localStorage.removeItem('vibe_cart_email');
      }
    },
    setItemCount: (state, action) => {
      state.itemCount = action.payload;
    },
    resetCart: (state) => {
      state.cartId = null;
      state.itemCount = 0;
      state.email = '';
      localStorage.removeItem('vibe_cart_id');
      localStorage.removeItem('vibe_cart_email');
    }
  }
});

export const { setCartId, setCartEmail, setItemCount, resetCart } = cartSlice.actions;

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer
  }
});

export default store;

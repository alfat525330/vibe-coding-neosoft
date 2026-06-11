import React, { useEffect } from 'react';
import { BrowserRouter, useNavigate, useSearchParams } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider, useDispatch } from 'react-redux';
import store, { setCartId } from './store';
import AppRoutes from './routes/AppRoutes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

// Interceptor component to restore cart state if cartId URL parameter is provided
const CartRestoreInterceptor = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const urlCartId = searchParams.get('cartId');
    if (urlCartId) {
      const parsedId = parseInt(urlCartId, 10);
      if (!isNaN(parsedId)) {
        console.log(`[RESTORE] Intercepted recovery Cart ID: ${parsedId} from URL.`);
        dispatch(setCartId(parsedId));
        // Clear query parameters and route directly to checkout
        navigate('/checkout', { replace: true });
      }
    }
  }, [searchParams, dispatch, navigate]);

  return null;
};

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CartRestoreInterceptor />
          <AppRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;

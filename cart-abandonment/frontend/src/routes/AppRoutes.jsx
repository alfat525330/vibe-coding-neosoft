import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Catalog from '../pages/Catalog';
import Checkout from '../pages/Checkout';
import Admin from '../pages/Admin';

const Navigation = () => {
  const location = useLocation();
  const itemCount = useSelector(state => state.cart.itemCount);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <span>VibeShop</span>
        <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.08)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--text-primary)' }}>
          ⚡ Recovery POC
        </span>
      </Link>
      <div className="nav-links">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          Catalog
        </Link>
        <Link 
          to="/checkout" 
          className={`nav-link ${location.pathname === '/checkout' ? 'active' : ''}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          Checkout 
          {itemCount > 0 && (
            <span style={{
              background: 'var(--accent-gradient)',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: '700',
              padding: '0.15rem 0.4rem',
              borderRadius: '10px',
              minWidth: '20px',
              textAlign: 'center',
              boxShadow: '0 0 8px rgba(236, 72, 153, 0.6)'
            }}>
              {itemCount}
            </span>
          )}
        </Link>
        <Link 
          to="/admin" 
          className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
        >
          Admin Panel
        </Link>
      </div>
    </nav>
  );
};

const AppRoutes = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
};

export default AppRoutes;

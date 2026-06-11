import React from 'react';
import './Skeletons.css';

export const ProductSkeleton = () => {
  return (
    <div className="skeleton-product-grid">
      {[1, 2, 3, 4].map(n => (
        <div key={n} className="skeleton-product-card">
          <div className="skeleton skeleton-image"></div>
          <div className="skeleton skeleton-title"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text" style={{ width: '50%' }}></div>
          <div className="skeleton skeleton-button"></div>
        </div>
      ))}
    </div>
  );
};

export const TableSkeleton = () => {
  return (
    <div className="skeleton-table">
      {[1, 2, 3, 4].map(n => (
        <div key={n} className="skeleton skeleton-row"></div>
      ))}
    </div>
  );
};

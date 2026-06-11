import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { TableSkeleton } from '../components/Skeletons';
import './Admin.css';

const Admin = () => {
  const { data: abandonedCarts, isLoading, error, refetch } = useQuery({
    queryKey: ['abandonedCarts'],
    queryFn: api.fetchAbandonedCarts,
    refetchInterval: 5000 // Poll every 5 seconds for live dashboard updates
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'sent': return 'badge-success';
      case 'failed': return 'badge-danger';
      case 'pending': return 'badge-warning';
      default: return 'badge-neutral';
    }
  };

  if (isLoading) {
    return (
      <div className="container">
        <h1>Admin Dashboard</h1>
        <p className="subtitle">Observability panel for abandoned cart recovery</p>
        <div style={{ marginTop: '2rem' }}>
          <TableSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container error-container">
        <h2>Failed to load admin stats</h2>
        <p>Ensure the backend Express server is running on port 5000 and database migrations are complete.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="subtitle">Observability panel for abandoned cart recovery</p>
        </div>
        <button className="btn btn-secondary" onClick={() => refetch()}>
          🔄 Refresh
        </button>
      </div>

      <div className="admin-metrics">
        <div className="card metric-card">
          <span className="metric-title">Total Abandoned Carts</span>
          <span className="metric-value">{abandonedCarts.length}</span>
        </div>
        <div className="card metric-card">
          <span className="metric-title">Total Potential Revenue Lost</span>
          <span className="metric-value price-lost">
            ${abandonedCarts.reduce((acc, cart) => acc + cart.totalValue, 0).toFixed(2)}
          </span>
        </div>
        <div className="card metric-card">
          <span className="metric-title">Reminders Dispatched</span>
          <span className="metric-value email-dispatched">
            {abandonedCarts.filter(cart => cart.emailStatus === 'sent').length}
          </span>
        </div>
      </div>

      <div className="card admin-table-card">
        <h2>Carts Log</h2>
        {abandonedCarts.length === 0 ? (
          <p className="no-data-msg">No abandoned carts detected yet. Shopper carts are analyzed after 2 minutes of inactivity.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Cart ID</th>
                  <th>Customer Email</th>
                  <th>Abandoned At</th>
                  <th>Items Details</th>
                  <th>Cart Value</th>
                  <th>Reminder Status</th>
                </tr>
              </thead>
              <tbody>
                {abandonedCarts.map(cart => (
                  <tr key={cart.cartId}>
                    <td>
                      <span className="cart-id-tag"># {cart.cartId}</span>
                    </td>
                    <td>
                      <span className="customer-email">{cart.email || 'Anonymous'}</span>
                    </td>
                    <td className="timestamp-cell">
                      {formatDate(cart.lastActivityAt)}
                    </td>
                    <td>
                      <div className="items-list-container">
                        {cart.items && cart.items.length > 0 ? (
                          cart.items.map((item, idx) => (
                            <div key={idx} className="admin-item-row">
                              <span className="item-name">{item.productName}</span>
                              <span className="item-qty">x {item.quantity}</span>
                            </div>
                          ))
                        ) : (
                          <span className="empty-items-text">No items</span>
                        )}
                      </div>
                    </td>
                    <td className="cart-value-cell">
                      ${cart.totalValue.toFixed(2)}
                    </td>
                    <td>
                      <div className="badge-wrapper">
                        <span className={`badge ${getStatusBadgeClass(cart.emailStatus)}`}>
                          {cart.emailStatus.toUpperCase()}
                        </span>
                        {cart.emailSentAt && (
                          <span className="badge-timestamp">
                            Sent at: {formatDate(cart.emailSentAt)}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;

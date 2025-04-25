// src/pages/OrderConfirmation.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrder } from '../api/apiService';
// import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const orderData = await getOrder(orderId);
        setOrder(orderData);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details. Please check your order history.');
      } finally {
        setLoading(false);
      }
    };
    
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);
  
  if (loading) {
    return <div className="loading">Loading order details...</div>;
  }
  
  if (error) {
    return (
      <div className="confirmation-error">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/" className="back-to-menu-btn">Back to Menu</Link>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="confirmation-error">
        <h2>Order Not Found</h2>
        <p>We couldn't find your order. Please check your order history.</p>
        <Link to="/" className="back-to-menu-btn">Back to Menu</Link>
      </div>
    );
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="confirmation-page">
      <div className="confirmation-header">
        <h1>Order Confirmed!</h1>
        <p>Thank you for your order at The Digital Diner.</p>
      </div>
      
      <div className="confirmation-details">
        <div className="confirmation-info">
          <h2>Order Information</h2>
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
          <p><strong>Status:</strong> <span className="status">{order.status}</span></p>
          <p><strong>Total:</strong> ${parseFloat(order.total).toFixed(2)}</p>
          {order.pickupTime && (
            <p><strong>Estimated Pickup:</strong> {formatDate(order.pickupTime)}</p>
          )}
        </div>
        
        <div className="confirmation-items">
          <h2>Order Items</h2>
          <div className="order-items-list">
            {order.OrderItems.map(item => (
              <div key={item.id} className="confirmation-item">
                <div className="item-info">
                  <span className="item-quantity">{item.quantity}x</span>
                  <span className="item-name">{item.name}</span>
                </div>
                <span className="item-price">${parseFloat(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="confirmation-footer">
        <p>You can check your order status anytime in the Order History section.</p>
        <div className="confirmation-actions">
          <Link to="/" className="back-to-menu-btn">Back to Menu</Link>
          <Link to="/history" className="order-history-btn">Order History</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
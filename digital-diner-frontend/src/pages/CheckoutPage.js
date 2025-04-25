// src/pages/Checkout.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { findOrCreateUser, createOrder } from '../api/apiService';
// import './Checkout.css';

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phoneNumber) {
      setError('Name and phone number are required');
      return;
    }
    
    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // 1. Create or find user
      const user = await findOrCreateUser(formData);
      
      // 2. Create order
      const orderItems = items.map(item => ({
        menuItemId: item._id,
        quantity: item.quantity
      }));
      
      const orderData = {
        userId: user.id,
        items: orderItems
      };
      
      const orderResponse = await createOrder(orderData);
      
      // 3. Clear cart and redirect to confirmation
      clearCart();
      navigate(`/confirmation/${orderResponse.order.id}`);
      
    } catch (err) {
      console.error('Error placing order:', err);
      setError('Failed to place your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Calculate tax and total with tax
  const tax = total * 0.08;
  const totalWithTax = total + tax;
  
  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      
      {items.length === 0 ? (
        <div className="empty-checkout">
          <p>Your cart is empty. Please add some items before checking out.</p>
          <button onClick={() => navigate('/')} className="back-to-menu-btn">
            Back to Menu
          </button>
        </div>
      ) : (
        <div className="checkout-content">
          <div className="checkout-form-container">
            <h2>Contact Information</h2>
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number *</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="10-digit number"
                  pattern="\d{10}"
                  title="Please enter a 10-digit phone number"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email (optional)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              <button
                type="submit"
                className="place-order-btn"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
          
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {items.map(item => (
                <div key={item._id} className="order-item">
                  <span>{item.quantity} x {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="order-totals">
              <div className="order-subtotal">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="order-tax">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="order-total">
                <span>Total</span>
                <span>${totalWithTax.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
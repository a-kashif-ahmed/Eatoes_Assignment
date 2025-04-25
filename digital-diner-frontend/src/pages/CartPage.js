// src/pages/Cart.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../context/CartContext';
// import './Cart.css';

const Cart = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      
      {items.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map(item => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="cart-total">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="cart-total">
              <span>Tax (8%):</span>
              <span>${(total * 0.08).toFixed(2)}</span>
            </div>
            <div className="cart-total grand-total">
              <span>Total:</span>
              <span>${(total * 1.08).toFixed(2)}</span>
            </div>
            
            <div className="cart-actions">
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
            
            <div className="continue-shopping">
              <Link to="/" className="continue-shopping-link">
                Continue Shopping
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
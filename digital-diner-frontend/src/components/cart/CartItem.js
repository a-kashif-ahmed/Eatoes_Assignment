// src/components/CartItem.js
import React from 'react';
import { useCart } from 'D:/eatoes/digital-diner-frontend/src/context/CartContext.js';
// import './CartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    updateQuantity(item._id, newQuantity);
  };
  
  const handleRemove = () => {
    removeItem(item._id);
  };
  
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.imageUrl} alt={item.name} />
      </div>
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
      </div>
      <div className="cart-item-actions">
        <div className="quantity-control">
          <button 
            className="quantity-btn" 
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <input 
            type="number" 
            min="1" 
            value={item.quantity} 
            onChange={handleQuantityChange}
            className="quantity-input"
          />
          <button 
            className="quantity-btn" 
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
          >
            +
          </button>
        </div>
        <button className="remove-btn" onClick={handleRemove}>
          Remove
        </button>
      </div>
      <div className="cart-item-subtotal">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
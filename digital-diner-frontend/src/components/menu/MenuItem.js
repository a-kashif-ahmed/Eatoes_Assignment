// src/components/MenuItem.js
import React from 'react';
import { useCart } from 'D:/eatoes/digital-diner-frontend/src/context/CartContext.js';
// import './MenuItem.css';

const MenuItem = ({ item }) => {
  const { addItem } = useCart();
  
  const handleAddToCart = () => {
    addItem(item);
  };
  
  return (
    <div className="menu-item">
      <div className="menu-item-image">
        <img src={item.imageUrl} alt={item.name} />
      </div>
      <div className="menu-item-content">
        <h3>{item.name}</h3>
        <p className="menu-item-description">{item.description}</p>
        <div className="menu-item-footer">
          <span className="menu-item-price">${item.price.toFixed(2)}</span>
          <button 
            className="add-to-cart-btn" 
            onClick={handleAddToCart}
            disabled={!item.available}
          >
            {item.available ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
        {item.dietary && (
          <div className="dietary-info">
            {item.dietary.vegetarian && <span className="vegetarian">Vegetarian</span>}
            {item.dietary.vegan && <span className="vegan">Vegan</span>}
            {item.dietary.glutenFree && <span className="gluten-free">Gluten-Free</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
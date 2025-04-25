// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
// import './Header.css';

const Header = () => {
  const { items } = useCart();
  
  // Count total items in cart
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <h1>The Digital Diner</h1>
        </Link>
      </div>
      <nav className="nav-menu">
        <ul>
          <li>
            <Link to="/">Menu</Link>
          </li>
          <li>
            <Link to="/history">Order History</Link>
          </li>
          <li>
            <Link to="/cart" className="cart-link">
              Cart {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
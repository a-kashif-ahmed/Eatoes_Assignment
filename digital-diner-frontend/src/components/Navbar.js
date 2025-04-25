// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { items } = useCart();
  
  // Calculate total number of items in cart
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <h1>The Digital Diner</h1>
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/menu">Menu</Link>
        </li>
        <li>
          <Link to="/order-history">Order History</Link>
        </li>
        <li>
          <Link to="/cart" className="cart-link">
            Cart {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
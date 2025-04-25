// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to The Digital Diner</h1>
        <p className="subtitle">
          Delicious food is just a few clicks away!
        </p>
        <Link to="/menu" className="btn btn-primary cta-button">
          Browse Our Menu
        </Link>
      </div>
      
      <div className="features-section">
        <div className="feature">
          <div className="feature-icon">🍔</div>
          <h3>Delicious Menu</h3>
          <p>Explore our wide variety of mouth-watering dishes.</p>
        </div>
        
        <div className="feature">
          <div className="feature-icon">🛒</div>
          <h3>Easy Ordering</h3>
          <p>Add items to cart and place your order in minutes.</p>
        </div>
        
        <div className="feature">
          <div className="feature-icon">🔄</div>
          <h3>Order History</h3>
          <p>Easily view and reorder your favorite meals.</p>
        </div>
      </div>
      
      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Browse Menu</h3>
            <p>Explore our selection of delicious offerings.</p>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <h3>Add To Cart</h3>
            <p>Select your favorite items and add them to your cart.</p>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <h3>Checkout</h3>
            <p>Provide your details and submit your order.</p>
          </div>
          
          <div className="step">
            <div className="step-number">4</div>
            <h3>Pick Up</h3>
            <p>Come to The Digital Diner and enjoy your meal!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
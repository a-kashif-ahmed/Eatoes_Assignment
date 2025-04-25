// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from 'D:/eatoes/digital-diner-frontend/src/context/CartContext.js';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './pages/MenuPage';
import Cart from './pages/CartPage';
import Checkout from './pages/CheckoutPage';
import OrderConfirmation from './pages/OrderConfirmationPage';

import './App.css';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmation/:orderId" element={<OrderConfirmation />} />
              
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
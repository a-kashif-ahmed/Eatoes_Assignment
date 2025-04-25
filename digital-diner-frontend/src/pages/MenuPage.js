// src/pages/Menu.js
import React, { useState, useEffect } from 'react';
import MenuItem from '../components/menu/MenuItem';
import CategoryFilter from '../components/CategoryFilter';
import { getMenuItems } from '../api/apiService';
// import './Menu.css';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const items = await getMenuItems(selectedCategory);
        setMenuItems(items);
        setError(null);
      } catch (err) {
        setError('Failed to load menu items. Please try again later.');
        console.error('Error fetching menu items:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMenuItems();
  }, [selectedCategory]);
  
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Our Menu</h1>
        <p>Select from our wide variety of delicious options</p>
      </div>
      
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      {loading && <div className="loading">Loading menu items...</div>}
      
      {error && <div className="error-message">{error}</div>}
      
      {!loading && !error && menuItems.length === 0 && (
        <div className="no-items">No menu items available in this category.</div>
      )}
      
      <div className="menu-items-grid">
        {menuItems.map(item => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
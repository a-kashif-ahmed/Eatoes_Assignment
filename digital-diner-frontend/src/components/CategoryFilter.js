// src/components/CategoryFilter.js
import React from 'react';
// import './CategoryFilter.css';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: '', name: 'All' },
    { id: 'Appetizer', name: 'Appetizers' },
    { id: 'Main Course', name: 'Main Courses' },
    { id: 'Dessert', name: 'Desserts' },
    { id: 'Drink', name: 'Drinks' }
  ];
  
  return (
    <div className="category-filter">
      <h2>Categories</h2>
      <div className="category-buttons">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
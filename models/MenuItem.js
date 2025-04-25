// models/MenuItem.js
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Appetizers', 'Main Courses', 'Desserts', 'Drinks']
  },
  image: {
    type: String,
    default: 'default-food.jpg'
  },
  ingredients: {
    type: [String],
    default: []
  },
  dietary: {
    vegetarian: { type: Boolean, default: false },
    vegan: { type: Boolean, default: false },
    glutenFree: { type: Boolean, default: false }
  },
  available: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
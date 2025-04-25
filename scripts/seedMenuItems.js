// scripts/seedMenuItems.js
const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');
const config = require('../config/db.config');

// Connect to MongoDB
mongoose.connect(config.mongo.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Sample menu items
const menuItems = [
  // Appetizers
  {
    name: 'Mozzarella Sticks',
    description: 'Golden-fried mozzarella sticks served with marinara sauce',
    price: 7.99,
    category: 'Appetizers',
    image: 'mozzarella-sticks.jpg',
    ingredients: ['Mozzarella cheese', 'Bread crumbs', 'Eggs', 'Italian seasoning'],
    dietary: {
      vegetarian: true,
      vegan: false,
      glutenFree: false
    },
    available: true
  },
  {
    name: 'Buffalo Wings',
    description: 'Crispy chicken wings tossed in spicy buffalo sauce',
    price: 10.99,
    category: 'Appetizers',
    image: 'buffalo-wings.jpg',
    ingredients: ['Chicken wings', 'Buffalo sauce', 'Butter', 'Celery', 'Blue cheese dressing'],
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: true
    },
    available: true
  },
  
  // Main Courses
  {
    name: 'Classic Cheeseburger',
    description: 'Juicy beef patty with American cheese, lettuce, tomato, and pickles',
    price: 12.99,
    category: 'Main Courses',
    image: 'cheeseburger.jpg',
    ingredients: ['Beef patty', 'American cheese', 'Lettuce', 'Tomato', 'Pickles', 'Burger bun'],
    dietary: {
      vegetarian: false,
      vegan: false,
      glutenFree: false
    },
    available: true
  },
  {
    name: 'Veggie Pasta',
    description: 'Penne pasta with roasted vegetables and tomato sauce',
    price: 14.99,
    category: 'Main Courses',
    image: 'veggie-pasta.jpg',
    ingredients: ['Penne pasta', 'Bell peppers', 'Zucchini', 'Tomato sauce', 'Parmesan cheese'],
    dietary: {
      vegetarian: true,
      vegan: false,
      glutenFree: false
    },
    available: true
  },
  
  // Desserts
  {
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with chocolate ganache',
    price: 6.99,
    category: 'Desserts',
    image: 'chocolate-cake.jpg',
    ingredients: ['Chocolate', 'Flour', 'Sugar', 'Eggs', 'Butter'],
    dietary: {
      vegetarian: true,
      vegan: false,
      glutenFree: false
    },
    available: true
  },
  
  // Drinks
  {
    name: 'Fresh Lemonade',
    description: 'Freshly squeezed lemonade with a hint of mint',
    price: 3.99,
    category: 'Drinks',
    image: 'lemonade.jpg',
    ingredients: ['Lemon juice', 'Sugar', 'Water', 'Mint leaves'],
    dietary: {
      vegetarian: true,
      vegan: true,
      glutenFree: true
    },
    available: true
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear existing menu items
    await MenuItem.deleteMany({});
    console.log('Previous menu items cleared');
    
    // Insert new menu items
    const result = await MenuItem.insertMany(menuItems);
    console.log(`${result.length} menu items added successfully`);
    
    // Log IDs for reference
    console.log('Menu Item IDs for reference:');
    result.forEach(item => {
      console.log(`${item.name}: ${item._id}`);
    });
    
    mongoose.disconnect();
    console.log('Database seeding completed and connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.disconnect();
  }
};

// Run the seeding function
seedDatabase();
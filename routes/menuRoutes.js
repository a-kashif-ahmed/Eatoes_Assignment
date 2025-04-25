// routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// GET all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET menu items by category
router.get('/category/:category', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ category: req.params.category });
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single menu item
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a menu item (for admin use)
router.post('/', async (req, res) => {
  const menuItem = new MenuItem({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image,
    ingredients: req.body.ingredients,
    dietary: req.body.dietary,
    available: req.body.available
  });

  try {
    const newMenuItem = await menuItem.save();
    res.status(201).json(newMenuItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a menu item (for admin use)
router.patch('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    // Update fields if they exist in the request
    if (req.body.name) menuItem.name = req.body.name;
    if (req.body.description) menuItem.description = req.body.description;
    if (req.body.price) menuItem.price = req.body.price;
    if (req.body.category) menuItem.category = req.body.category;
    if (req.body.image) menuItem.image = req.body.image;
    if (req.body.ingredients) menuItem.ingredients = req.body.ingredients;
    if (req.body.dietary) menuItem.dietary = req.body.dietary;
    if (req.body.available !== undefined) menuItem.available = req.body.available;
    
    const updatedMenuItem = await menuItem.save();
    res.json(updatedMenuItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
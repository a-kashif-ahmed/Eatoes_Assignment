// controllers/menuController.js
const MenuItem = require('../models/menuItem');

// Get all menu items (optionally filter by category)
exports.getMenuItems = async (req, res) => {
  try {
    let query = {};
    
    // If category is provided, filter by it
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // If availability filter is provided
    if (req.query.available === 'true') {
      query.available = true;
    }
    
    const menuItems = await MenuItem.find(query).sort({ category: 1, name: 1 });
    res.status(200).json(menuItems);
  } catch (err) {
    console.error('Error fetching menu items:', err);
    res.status(500).json({ message: 'Failed to fetch menu items', error: err.message });
  }
};

// Get a single menu item by ID
exports.getMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.status(200).json(menuItem);
  } catch (err) {
    console.error('Error fetching menu item:', err);
    res.status(500).json({ message: 'Failed to fetch menu item', error: err.message });
  }
};

// Create a new menu item (admin functionality)
exports.createMenuItem = async (req, res) => {
  try {
    const newMenuItem = new MenuItem(req.body);
    const savedMenuItem = await newMenuItem.save();
    res.status(201).json(savedMenuItem);
  } catch (err) {
    console.error('Error creating menu item:', err);
    res.status(400).json({ message: 'Failed to create menu item', error: err.message });
  }
};

// Update a menu item (admin functionality)
exports.updateMenuItem = async (req, res) => {
  try {
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updated: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!updatedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.status(200).json(updatedMenuItem);
  } catch (err) {
    console.error('Error updating menu item:', err);
    res.status(400).json({ message: 'Failed to update menu item', error: err.message });
  }
};

// Delete a menu item (admin functionality)
exports.deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    console.error('Error deleting menu item:', err);
    res.status(500).json({ message: 'Failed to delete menu item', error: err.message });
  }
};
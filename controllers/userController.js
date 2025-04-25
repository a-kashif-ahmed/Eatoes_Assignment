// controllers/userController.js
const db = require('../models/index');
const User = db.User;

// Find or create user by phone number
exports.findOrCreateUser = async (req, res) => {
  try {
    const { name, phoneNumber, email } = req.body;
    
    if (!name || !phoneNumber) {
      return res.status(400).json({ message: 'Name and phone number are required' });
    }
    
    // Check if user exists
    let user = await User.findOne({ where: { phoneNumber } });
    
    if (!user) {
      // Create new user if not found
      user = await User.create({
        name,
        phoneNumber,
        email: email || null
      });
    } else {
      // Update existing user information
      user = await user.update({
        name,
        email: email || user.email
      });
    }
    
    res.status(200).json(user);
  } catch (err) {
    console.error('Error finding/creating user:', err);
    res.status(500).json({ message: 'Failed to process user information', error: err.message });
  }
};

// Get user by phone number
exports.getUserByPhone = async (req, res) => {
  try {
    const phoneNumber = req.params.phoneNumber;
    
    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required' });
    }
    
    const user = await User.findOne({ where: { phoneNumber } });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Failed to fetch user information', error: err.message });
  }
};
// scripts/testOrder.js
const axios = require('axios');

const API_URL = 'http://localhost:5000/api'; // Change if your server runs on a different port

// Test creating a new order
const testCreateOrder = async () => {
  try {
    // First, get a user (or create one)
    const userResponse = await axios.post(`${API_URL}/users`, {
      name: 'Test Customer',
      phoneNumber: '1234567890',
      email: 'test@example.com'
    });
    
    const user = userResponse.data;
    console.log('User retrieved/created:', user);
    
    // Get some menu items (first page)
    const menuResponse = await axios.get(`${API_URL}/menu`);
    const menuItems = menuResponse.data;
    
    if (menuItems.length === 0) {
      console.error('No menu items found. Please run the seedMenuItems.js script first.');
      return;
    }
    
    console.log(`Found ${menuItems.length} menu items`);
    
    // Create a test order with the first two menu items
    const orderItems = menuItems.slice(0, 2).map(item => ({
      menuItemId: item._id,
      quantity: 2
    }));
    
    const orderResponse = await axios.post(`${API_URL}/orders`, {
      userId: user.id,
      items: orderItems
    });
    
    console.log('Order created successfully:', orderResponse.data);
  } catch (error) {
    console.error('Error testing order creation:', error.response ? error.response.data : error.message);
  }
};

testCreateOrder();
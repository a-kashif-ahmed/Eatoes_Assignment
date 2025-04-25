// controllers/orderController.js
const db = require('../models/index');
const User = db.User;
const Order = db.Order;
const OrderItem = db.OrderItem;
const MenuItem = require('../models/menuItem');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;
    
    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'User ID and at least one item are required' });
    }
    
    // Verify user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Calculate total and verify all items exist
    let total = 0;
    const validatedItems = [];
    
    for (const item of items) {
      if (!item.menuItemId || !item.quantity) {
        return res.status(400).json({ message: 'Each item must have menuItemId and quantity' });
      }
      
      // Fetch menu item to get current price and verify it exists
      const menuItem = await MenuItem.findById(item.menuItemId);
      if (!menuItem) {
        return res.status(404).json({ message: `Menu item with ID ${item.menuItemId} not found` });
      }
      
      const itemTotal = menuItem.price * item.quantity;
      total += itemTotal;
      
      validatedItems.push({
        menuItemId: item.menuItemId,
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity
      });
    }
    
    // Create order
    const order = await Order.create({
      userId,
      total,
      status: 'pending'
    });
    
    // Create order items
    const orderItems = [];
    for (const item of validatedItems) {
      const orderItem = await OrderItem.create({
        orderId: order.id,
        menuItemId: item.menuItemId,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      });
      orderItems.push(orderItem);
    }
    
    res.status(201).json({
      order,
      items: orderItems
    });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Failed to create order', error: err.message });
  }
};

// Get orders by user ID
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    const orders = await Order.findAll({
      where: { userId },
      include: [OrderItem],
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching user orders:', err);
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

// Get orders by phone number
exports.getOrdersByPhone = async (req, res) => {
  try {
    const phoneNumber = req.params.phoneNumber;
    
    // Find user by phone
    const user = await User.findOne({ where: { phoneNumber } });
    if (!user) {
      return res.status(404).json({ message: 'User not found with this phone number' });
    }
    
    // Get all orders for this user
    const orders = await Order.findAll({
      where: { userId: user.id },
      include: [OrderItem],
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders by phone:', err);
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

// Get order by ID
exports.getOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    
    const order = await Order.findByPk(orderId, {
      include: [OrderItem, User]
    });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.status(200).json(order);
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ message: 'Failed to fetch order', error: err.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, pickupTime } = req.body;
    
    const order = await Order.findByPk(id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Update order
    const updatedOrder = await order.update({
      status: status || order.status,
      pickupTime: pickupTime || order.pickupTime
    });
    
    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ message: 'Failed to update order', error: err.message });
  }
};
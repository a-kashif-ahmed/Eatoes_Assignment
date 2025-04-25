// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { pool } = require('../server');

// Helper function to get or create a customer
async function getOrCreateCustomer(name, phone, email = null) {
  const client = await pool.connect();
  
  try {
    // Check if customer exists
    const checkResult = await client.query(
      'SELECT id FROM customers WHERE phone = $1',
      [phone]
    );
    
    if (checkResult.rows.length > 0) {
      // Customer exists, return id
      return checkResult.rows[0].id;
    } else {
      // Create new customer
      const insertResult = await client.query(
        'INSERT INTO customers (name, phone, email) VALUES ($1, $2, $3) RETURNING id',
        [name, phone, email]
      );
      return insertResult.rows[0].id;
    }
  } finally {
    client.release();
  }
}

// POST a new order
router.post('/', async (req, res) => {
  const { customerInfo, items, totalAmount } = req.body;
  
  if (!customerInfo || !items || !totalAmount) {
    return res.status(400).json({ message: 'Missing required order information' });
  }

  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Get or create customer
    const customerId = await getOrCreateCustomer(
      customerInfo.name, 
      customerInfo.phone, 
      customerInfo.email
    );
    
    // Create order
    const orderResult = await client.query(
      'INSERT INTO orders (customer_id, total_amount) VALUES ($1, $2) RETURNING id',
      [customerId, totalAmount]
    );
    
    const orderId = orderResult.rows[0].id;
    
    // Add order items
    for (const item of items) {
      await client.query(
        'INSERT INTO order_items (order_id, menu_item_id, item_name, quantity, price) VALUES ($1, $2, $3, $4, $5)',
        [orderId, item.id, item.name, item.quantity, item.price]
      );
    }
    
    await client.query('COMMIT');
    
    res.status(201).json({ 
      orderId,
      message: 'Order successfully created!'
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Failed to create order' });
  } finally {
    client.release();
  }
});

// GET orders by phone number
router.get('/customer/:phone', async (req, res) => {
  const { phone } = req.params;
  
  try {
    // Get customer id
    const customerResult = await pool.query(
      'SELECT id FROM customers WHERE phone = $1',
      [phone]
    );
    
    if (customerResult.rows.length === 0) {
      return res.status(404).json({ message: 'No orders found for this phone number' });
    }
    
    const customerId = customerResult.rows[0].id;
    
    // Get all orders for this customer
    const ordersResult = await pool.query(
      `SELECT o.id, o.total_amount, o.status, o.created_at
       FROM orders o
       WHERE o.customer_id = $1
       ORDER BY o.created_at DESC`,
      [customerId]
    );
    
    // For each order, get the order items
    const orders = [];
    for (const order of ordersResult.rows) {
      const itemsResult = await pool.query(
        `SELECT menu_item_id, item_name, quantity, price
         FROM order_items
         WHERE order_id = $1`,
        [order.id]
      );
      
      orders.push({
        ...order,
        items: itemsResult.rows
      });
    }
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// GET a specific order by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    // Get order details
    const orderResult = await pool.query(
      `SELECT o.id, o.total_amount, o.status, o.created_at, c.name, c.phone
       FROM orders o
       JOIN customers c ON o.customer_id = c.id
       WHERE o.id = $1`,
      [id]
    );
    
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Get order items
    const itemsResult = await pool.query(
      `SELECT menu_item_id, item_name, quantity, price
       FROM order_items
       WHERE order_id = $1`,
      [id]
    );
    
    const order = {
      ...orderResult.rows[0],
      items: itemsResult.rows
    };
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Failed to fetch order' });
  }
});

module.exports = router;
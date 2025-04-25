const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectMongo, connectPostgres } = require('./config/db.connect');
const routes = require('./routes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to databases
connectMongo();
connectPostgres();

// Routes
app.use('/api', routes);

// Root route for API health check
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Digital Diner API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // For testing
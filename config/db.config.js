// config/db.config.js
module.exports = {
    mongo: {
      url: process.env.MONGODB_URI || 'mongodb://localhost:27017/digitalDiner'
    },
    postgres: {
      host: process.env.PG_HOST || 'localhost',
      user: process.env.PG_USER || 'postgres',
      password: process.env.PG_PASSWORD || 'password',
      database: process.env.PG_DATABASE || 'digital_diner',
      port: process.env.PG_PORT || 5432
    }
  };
  
  // config/db.connect.js
  const mongoose = require('mongoose');
  const { sequelize } = require('../models/index');
  const config = require('./db.config');
  
  // Connect to MongoDB
  const connectMongo = async () => {
    try {
      await mongoose.connect(config.mongo.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('MongoDB connection established');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    }
  };
  
  // Connect to PostgreSQL
  const connectPostgres = async () => {
    try {
      await sequelize.authenticate();
      console.log('PostgreSQL connection established');
      
      // Sync all models with database
      await sequelize.sync({ alter: true });
      console.log('Database models synchronized');
    } catch (err) {
      console.error('PostgreSQL connection error:', err);
      process.exit(1);
    }
  };
  
  module.exports = {
    connectMongo,
    connectPostgres
  };
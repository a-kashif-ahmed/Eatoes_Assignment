// scripts/seedUsers.js
const { sequelize, User } = require('../models/index');

const seedUsers = async () => {
  try {
    // Sync the model with the database
    await sequelize.sync({ force: true });
    console.log('Database synced');
    
    // Create sample users
    const users = await User.bulkCreate([
      {
        name: 'John Doe',
        phoneNumber: '1234567890',
        email: 'john@example.com'
      },
      {
        name: 'Jane Smith',
        phoneNumber: '9876543210',
        email: 'jane@example.com'
      },
      {
        name: 'Alice Johnson',
        phoneNumber: '5551234567',
        email: 'alice@example.com'
      }
    ]);
    
    console.log(`${users.length} users created successfully`);
    console.log('User details:');
    users.forEach(user => {
      console.log(`ID: ${user.id}, Name: ${user.name}, Phone: ${user.phoneNumber}`);
    });
    
    // Close the connection
    await sequelize.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
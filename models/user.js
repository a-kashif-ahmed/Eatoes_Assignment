// models/user.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isValidPhone(value) {
          if (!value.match(/^\d{10}$/)) {
            throw new Error('Phone number must be 10 digits');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  return User;
};

// models/order.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
      validate: {
        isIn: [['pending', 'preparing', 'ready', 'completed', 'cancelled']]
      }
    },
    pickupTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  return Order;
};

// models/orderItem.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const OrderItem = sequelize.define('OrderItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    menuItemId: {
      type: DataTypes.STRING, // MongoDB ID as string
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  });

  return OrderItem;
};

// models/index.js
const { Sequelize } = require('sequelize');
const config = require('../config/db.config');

const sequelize = new Sequelize(
  config.postgres.database,
  config.postgres.user,
  config.postgres.password,
  {
    host: config.postgres.host,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};
db.sequelize = sequelize;
db.User = require('./user')(sequelize);
db.Order = require('./order')(sequelize);
db.OrderItem = require('./orderItem')(sequelize);

// Define relationships
db.User.hasMany(db.Order, { foreignKey: 'userId' });
db.Order.belongsTo(db.User, { foreignKey: 'userId' });
db.Order.hasMany(db.OrderItem, { foreignKey: 'orderId' });
db.OrderItem.belongsTo(db.Order, { foreignKey: 'orderId' });

module.exports = db;
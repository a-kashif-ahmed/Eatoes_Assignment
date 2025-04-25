# The Digital Diner - Restaurant Ordering System

A full-stack web application that allows customers to browse a restaurant menu, add items to a cart, and place pickup orders. This project is built using the MERN stack (MongoDB, Express, React, Node.js) with PostgreSQL integration.

## Live Demo

Frontend: [The Digital Diner on Netlify](https://digital-diner.netlify.app)

## Features

- **Menu Display**: Browse menu items by category (Appetizers, Main Courses, Desserts, Drinks)
- **Shopping Cart**: Add items to cart, update quantities, and remove items
- **Order Placement**: Submit orders with contact information
- **Order Confirmation**: View order details after placement
- **Order History**: Track past orders using your phone number

## Technology Stack

- **Frontend**: React, React Router, Context API
- **Backend**: Node.js, Express
- **Databases**:
  - MongoDB: Menu items storage
  - PostgreSQL: User and order data storage
- **Deployment**:
  - Frontend: Netlify
  - Backend: Render/Heroku

## Database Design Choices

### MongoDB
Used for storing menu items because:
- Menu items have flexible schema requirements (different items may have different properties)
- Menu items can contain nested objects (ingredients, dietary info, etc.)
- Non-relational nature works well for independent document storage
- Schema can evolve over time without migrations
- Query patterns for menu items are simple and don't require complex joins

### PostgreSQL
Used for user and order data because:
- Orders have clear relationships (Order -> OrderItems, User -> Orders)
- Structured data with consistent fields
- ACID transactions are important for order processing
- Relational integrity ensures data consistency
- Complex queries across multiple tables (joining orders with their items and user data)

## API Endpoints

### Menu Endpoints
- `GET /api/menu` - Get all menu items (optional category filter with query parameter)
- `GET /api/menu/:id` - Get a specific menu item by ID
- `POST /api/menu` - Create a new menu item (admin use)
- `PUT /api/menu/:id` - Update a menu item (admin use)
- `DELETE /api/menu/:id` - Delete a menu item (admin use)

### User Endpoints
- `POST /api/users` - Create or find a user with phone number
- `GET /api


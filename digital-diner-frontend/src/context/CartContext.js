// src/context/CartContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define initial state
const initialState = {
  items: [],
  total: 0
};

// Create context
const CartContext = createContext();

// Actions
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const existingItemIndex = state.items.findIndex(
        item => item._id === action.payload._id
      );
      
      if (existingItemIndex >= 0) {
        // Item already in cart, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      } else {
        // Add new item to cart
        const newItem = { ...action.payload, quantity: 1 };
        return {
          ...state,
          items: [...state.items, newItem],
          total: calculateTotal([...state.items, newItem])
        };
      }
    }
    
    case REMOVE_ITEM: {
      const updatedItems = state.items.filter(item => item._id !== action.payload);
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    
    case UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is zero or negative
        return cartReducer(state, { type: REMOVE_ITEM, payload: id });
      }
      
      const updatedItems = state.items.map(item => 
        item._id === id ? { ...item, quantity } : item
      );
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    
    case CLEAR_CART:
      return initialState;
      
    default:
      return state;
  }
};

// Helper function to calculate total
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

// Provider component
export const CartProvider = ({ children }) => {
  // Load cart from localStorage on initial render
  const savedCart = localStorage.getItem('cart');
  const [state, dispatch] = useReducer(
    cartReducer, 
    savedCart ? JSON.parse(savedCart) : initialState
  );
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);
  
  // Actions
  const addItem = (item) => {
    dispatch({ type: ADD_ITEM, payload: item });
  };
  
  const removeItem = (itemId) => {
    dispatch({ type: REMOVE_ITEM, payload: itemId });
  };
  
  const updateQuantity = (itemId, quantity) => {
    dispatch({ 
      type: UPDATE_QUANTITY, 
      payload: { id: itemId, quantity }
    });
  };
  
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  
  return (
    <CartContext.Provider value={{
      items: state.items,
      total: state.total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
// src/services/api.js
import axios from 'axios';

// Base URL for API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Menu API calls
export const getMenuItems = async (category = '') => {
  try {
    const params = category ? { category } : {};
    const response = await api.get('/menu', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

export const getMenuItem = async (id) => {
  try {
    const response = await api.get(`/menu/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching menu item:', error);
    throw error;
  }
};

// User API calls
export const findOrCreateUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating/finding user:', error);
    throw error;
  }
};

export const getUserByPhone = async (phoneNumber) => {
  try {
    const response = await api.get(`/users/phone/${phoneNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Order API calls
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrdersByPhone = async (phoneNumber) => {
  try {
    const response = await api.get(`/orders/phone/${phoneNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getOrder = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};
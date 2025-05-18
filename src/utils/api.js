import { Alert } from 'react-native';

// Base URL for the API
const BASE_URL = 'https://fakestoreapi.com';

// Reusable fetch function with error handling
export const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request Failed:', error);
    Alert.alert(
      'Network Error',
      'Unable to connect to the server. Please check your internet connection and try again.'
    );
    throw error;
  }
};

// API Functions
export const getProducts = () => fetchData('/products');
export const getProductById = (id) => fetchData(`/products/${id}`);
export const getProductsByCategory = (category) => fetchData(`/products/category/${category}`);
export const getCategories = () => fetchData('/products/categories');
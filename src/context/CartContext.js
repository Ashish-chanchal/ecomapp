import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create context
const CartContext = createContext();

// Initial state
const initialState = {
  items: [],
  total: 0,
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex > -1) {
        // Item exists in cart, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };

        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      } else {
        // Item doesn't exist in cart, add it
        const newItem = { ...action.payload, quantity: 1 };
        const updatedItems = [...state.items, newItem];

        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      }
    }

    case 'REMOVE_FROM_CART': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        // If quantity is 0 or less, remove item from cart
        const updatedItems = state.items.filter(item => item.id !== id);
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      } else {
        // Update quantity
        const updatedItems = state.items.map(item =>
          item.id === id ? { ...item, quantity } : item
        );
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems),
        };
      }
    }

    case 'LOAD_CART':
      return {
        items: action.payload,
        total: calculateTotal(action.payload),
      };

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

// Helper function to calculate total price
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from AsyncStorage on initial load
  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
          dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
        }
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    };

    loadCart();
  }, []);

  // Save cart to AsyncStorage whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(state.items));
      } catch (error) {
        console.error('Failed to save cart:', error);
      }
    };

    if (state.items.length > 0) {
      saveCart();
    }
  }, [state.items]);

  // Action creators
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ 
      type: 'UPDATE_QUANTITY', 
      payload: { id: productId, quantity } 
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    AsyncStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        total: state.total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
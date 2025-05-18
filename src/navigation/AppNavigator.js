import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import { useCart } from '../context/CartContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ShopStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4f4f4',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="ProductList" 
        component={ProductListScreen} 
        options={{ title: 'Shop' }} 
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen} 
        options={({ route }) => ({ title: route.params?.productName || 'Product Details' })} 
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const { items } = useCart();
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Shop') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'shopping-cart' : 'shopping-cart';
          }
          
          return <Icon name={iconName} size={size} color={color} />
        //   <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2a7af9',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Shop" 
        component={ShopStack} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{ 
          title: 'Cart',
          tabBarBadge: cartItemCount > 0 ? cartItemCount : null,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
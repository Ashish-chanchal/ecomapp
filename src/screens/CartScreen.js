import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import EmptyState from '../components/EmptyState';

const CartScreen = () => {
  const { items, total, clearCart } = useCart();

  const handleClearCart = () => {
    if (items.length === 0) return;
    
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: clearCart }
      ]
    );
  };

  const handleCheckout = () => {
    Alert.alert(
      'Checkout',
      'This is a demo app. In a real app, this would proceed to payment.',
      [{ text: 'OK' }]
    );
  };

  if (items.length === 0) {
    return (
      <EmptyState 
        icon="cart-outline"
        title="Your cart is empty"
        message="Looks like you haven't added any products to your cart yet."
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CartItem item={item} />}
        contentContainerStyle={styles.listContent}
      />
      
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Total</Text>
          <Text style={styles.totalPrice}>${total.toFixed(2)}</Text>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
            <Text style={styles.clearButtonText}>Clear Cart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  listContent: {
    padding: 16,
    paddingBottom: 16,
  },
  summaryContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginRight: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#666',
    fontWeight: 'bold',
  },
  checkoutButton: {
    flex: 2,
    backgroundColor: '#2a7af9',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default CartScreen;
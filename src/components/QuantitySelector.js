import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuantitySelector = ({ quantity, onIncrease, onDecrease, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity 
        style={styles.button}
        onPress={onDecrease}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      
      <View style={styles.quantityContainer}>
        <Text style={styles.quantity}>{quantity}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={onIncrease}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
  },
  button: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityContainer: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default QuantitySelector;
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import RatingStars from './RatingStars';

const ProductCard = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image 
        source={{ uri: product.image }} 
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        <RatingStars rating={product.rating.rate} size={12} />
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    margin: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#f9f9f9',
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#333',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#2a7af9',
  },
});

export default ProductCard;
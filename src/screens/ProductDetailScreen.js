import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator, 
  TouchableOpacity 
} from 'react-native';


import { useCart } from '../context/CartContext';
import RatingStars from '../components/RatingStars';
import ErrorMessage from '../components/ErrorMessage';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2a7af9" />
        <Text style={styles.loadingText}>Loading product details...</Text>
      </View>
    );
  }

  if (error || !product) {
    return <ErrorMessage message={error || 'Product not found'} />;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image 
        source={{ uri: product.image }} 
        style={styles.image}
        resizeMode="contain"
      />
      
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.title}</Text>
        
        <View style={styles.priceRatingContainer}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          
          <View style={styles.ratingContainer}>
            <RatingStars rating={product.rating.rate} size={16} />
            <Text style={styles.ratingCount}>({product.rating.count} reviews)</Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>
        
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          {/* <Ionicons name="cart" size={20} color="#FFFFFF" /> */}
          <Icon name="shopping-cart" size={20} color="#FFFFFF" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#f9f9f9',
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2a7af9',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingCount: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 24,
  },
  addToCartButton: {
    backgroundColor: '#2a7af9',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
});

export default ProductDetailScreen
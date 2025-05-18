import React from 'react';
import { View, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const RatingStars = ({ rating, size = 16 }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        // <Ionicons key={`full-${i}`} name="star" size={size} color="#FFD700" />
        <Icon name="star" key={`full-${i}`} size={20} color="#ff3b30" />
      );
    }
    
    // Half star
    if (halfStar) {
      stars.push(
        // <Ionicons key="half" name="star-half" size={size} color="#FFD700" />
        <Icon name="star" key="half" size={20} color="#ff3b30" />
      );
    }
    
    // Empty stars
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon name="star" key={`empty-${i}`} size={20} color="#ff3b30" />
      
      );
    }
    
    return stars;
  };

  return <View style={styles.container}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default RatingStars;
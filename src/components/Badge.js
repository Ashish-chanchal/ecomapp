import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Badge = ({ text, type = 'default', size = 'medium' }) => {
  const badgeStyle = getTypeStyle(type);
  const sizeStyle = getSizeStyle(size);
  
  return (
    <View style={[styles.badge, badgeStyle, sizeStyle]}>
      <Text style={[styles.text, { color: badgeStyle.textColor }]}>{text}</Text>
    </View>
  );
};

const getTypeStyle = (type) => {
  const types = {
    default: { backgroundColor: '#e0e0e0', textColor: '#333333' },
    primary: { backgroundColor: '#2a7af9', textColor: '#FFFFFF' },
    success: { backgroundColor: '#4caf50', textColor: '#FFFFFF' },
    warning: { backgroundColor: '#ff9800', textColor: '#FFFFFF' },
    danger: { backgroundColor: '#f44336', textColor: '#FFFFFF' },
  };
  
  return types[type] || types.default;
};

const getSizeStyle = (size) => {
  const sizes = {
    small: { paddingVertical: 2, paddingHorizontal: 6, borderRadius: 4 },
    medium: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6 },
    large: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  };
  
  return sizes[size] || sizes.medium;
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Badge;
// ProductCard.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProductCard = ({ product, onSelect }) => {
  const { name, price, discountedPrice, image } = product;

  // Check if discountedPrice exists, else return the original price
  const hasDiscount = discountedPrice && discountedPrice < price;
  const discountPercentage = hasDiscount
    ? Math.round(((price - discountedPrice) / price) * 100)
    : 0;

  return (
    <View style={styles.card} onTouchEnd={() => onSelect(product)}>
      <Image source={{ uri: image }} style={styles.productImage} />
      <Text style={styles.productName}>{name}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>
          ₹{hasDiscount ? discountedPrice.toFixed(2) : price.toFixed(2)}
        </Text>
        {hasDiscount && (
          <>
            <Text style={styles.originalPrice}>₹{price.toFixed(2)}</Text>
            <Text style={styles.discountPercentage}>- {discountPercentage}%</Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007ACC',
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  discountPercentage: {
    fontSize: 14,
    color: '#e74c3c',
    fontWeight: 'bold',
  },
});

export default ProductCard;

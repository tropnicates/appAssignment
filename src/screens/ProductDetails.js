import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PincodeInput from '../components/PincodeInput';
import DeliveryEstimate from '../components/DeliveryEstimate';

const ProductDetails = ({ route }) => {

  const staticProduct = {
    id: 1,
    name: 'Static Product',
    price: 500,  
    inStock: true,  
  };

  const { product = staticProduct } = route.params || {};

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const [pincode, setPincode] = useState('');
  const [provider, setProvider] = useState(null);

  const handlePincodeSubmit = (enteredPincode, logisticsProvider) => {
    setPincode(enteredPincode);
    setProvider(logisticsProvider);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>₹ {product.price}</Text>
      <Text style={styles.stock}>{product.inStock ? 'In Stock' : 'Out of Stock'}</Text>
      <View style = {styles.pincode}>
      <PincodeInput onPincodeSubmit={handlePincodeSubmit} />
      {pincode && provider && (
        <DeliveryEstimate product={product} pincode={pincode} provider={provider} />
      )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start', 
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: '#333',
    marginVertical: 10,
  },
  stock: {
    fontSize: 14,
    color: '#333',  
  },
});

export default ProductDetails;

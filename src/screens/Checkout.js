// src/screens/Checkout.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Checkout = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Proceeding to Checkout...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Checkout;

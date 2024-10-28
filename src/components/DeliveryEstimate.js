import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CountdownTimer from './CountdownTimer';
import { calculateDeliveryDate } from '../utils/calculateDeliveryDate';

const DeliveryEstimate = ({ product, pincode, provider }) => {
  const [deliveryDate, setDeliveryDate] = useState(null);

  useEffect(() => {
    const estimatedDate = calculateDeliveryDate(provider, pincode);
    setDeliveryDate(estimatedDate);
  }, [pincode, provider]);

  return (
    <View style={styles.container}>
      <Text style={styles.estimate}>
        Estimated Delivery: {deliveryDate || 'Calculating...'}
      </Text>
      {provider && (provider === 'Provider A' || provider === 'Provider B') && (
        <CountdownTimer provider={provider} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  estimate: {
    fontSize: 16,
    color: '#333',
  },
});

export default DeliveryEstimate;

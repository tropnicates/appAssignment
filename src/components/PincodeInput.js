// src/components/PincodeInput.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { validatePincode } from '../utils/validatePincode';

const PincodeInput = ({ onPincodeSubmit }) => {
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');

  const handlePincodeSubmit = () => {
    const provider = validatePincode(pincode);
    if (provider) {
      setError('');
      onPincodeSubmit(pincode, provider);
    } else {
      setError('Invalid Pincode');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Pincode"
        keyboardType="numeric"
        value={pincode}
        onChangeText={setPincode}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Check Delivery" onPress={handlePincodeSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 14,
  },
});

export default PincodeInput;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, TextInput, Button } from 'react-native';

const CheckoutScreen = ({ route, navigation }) => {
  const { cart } = route.params; 
  
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePlaceOrder = () => {
    alert('Your order has been placed successfully!');
    navigation.navigate('HomeScreen');
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDetails}>Qty: {item.quantity} | Price: ₹{item.price}</Text>
        <Text style={styles.productTotal}>Total: ₹{(item.price * item.quantity).toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      
      {cart.length === 0 ? (
        <Text style={styles.emptyMessage}>Your cart is empty! Please add some items.</Text>
      ) : (
        <FlatList
          data={cart}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Order Summary</Text>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Subtotal:</Text>
          <Text style={styles.summaryValue}>₹{calculateTotal()}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Shipping:</Text>
          <Text style={styles.summaryValue}>₹50.00</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total:</Text>
          <Text style={styles.summaryValue}>₹{(parseFloat(calculateTotal()) + 50).toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.contactForm}>
        <Text style={styles.formLabel}>Shipping Address</Text>
        <TextInput style={styles.input} placeholder="Enter your address" />
      </View>

      <View style={styles.checkoutActions}>
      <TouchableOpacity 
  style={styles.placeOrderButton} 
  onPress={() => {
    handlePlaceOrder(); 
    navigation.goBack(); 
  }}
>
  <Text style={styles.placeOrderText}>Place Order</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  emptyMessage: { fontSize: 16, color: '#777', textAlign: 'center', marginTop: 20 },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  itemDetails: { flex: 1 },
  productName: { fontSize: 18, fontWeight: 'bold' },
  productDetails: { fontSize: 14, color: '#555' },
  productTotal: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  summaryContainer: { backgroundColor: '#fff', padding: 20, borderRadius: 8, marginTop: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  summaryText: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  summaryItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 16, color: '#555' },
  summaryValue: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  contactForm: { marginTop: 20 },
  formLabel: { fontSize: 18, marginBottom: 10, color: '#333' },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingLeft: 10, fontSize: 16, backgroundColor: '#fff' },
  checkoutActions: { marginTop: 30 },
  placeOrderButton: { backgroundColor: '#007ACC', padding: 15, borderRadius: 8, marginBottom: 10 },
  placeOrderText: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  cancelButton: { backgroundColor: '#ff4d4d', padding: 15, borderRadius: 8 },
  cancelText: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
});

export default CheckoutScreen;

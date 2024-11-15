import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';

const CartScreen = ({ route, navigation }) => {
  const { cart: initialCart } = route.params; 
  const [cart, setCart] = useState(initialCart); // Using state to manage cart items

  // Calculate the total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Function to increase the quantity of an item
  const increaseQuantity = (itemId) => {
    const updatedCart = cart.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  // Function to decrease the quantity of an item
  const decreaseQuantity = (itemId) => {
    const updatedCart = cart.map(item =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  // Function to remove an item from the cart
  const removeItem = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDetails}>Qty: {item.quantity} | Price: ₹{item.price}</Text>
        <Text style={styles.productTotal}>Total: ₹{(item.price * item.quantity).toFixed(2)}</Text>

        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => decreaseQuantity(item.id)}
          >
            <Text style={styles.controlText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => increaseQuantity(item.id)}
          >
            <Text style={styles.controlText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeItem(item.id)}
        >
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      {cart.length === 0 ? (
        <Text style={styles.emptyMessage}>Your cart is empty!</Text>
      ) : (
        <FlatList
          data={cart}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      {cart.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ₹{calculateTotal()}</Text>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => navigation.navigate('Checkout', { cart })}
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  cartItem: {
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
  productImage: { width: '100%', height: 350, borderRadius: 8, marginBottom: 10 },
  itemDetails: { flex: 1 },
  productName: { fontSize: 18, fontWeight: 'bold' },
  productDetails: { fontSize: 14, color: '#555' },
  productTotal: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  quantityControls: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  controlButton: {
    backgroundColor: '#007ACC',
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  controlText: { color: '#fff', fontSize: 18 },
  quantityText: { fontSize: 16, fontWeight: 'bold' },
  removeButton: { marginTop: 10, backgroundColor: '#f44336', padding: 8, borderRadius: 5 },
  removeText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  totalContainer: { marginTop: 20, padding: 15, backgroundColor: '#fff', borderRadius: 8 },
  totalText: { fontSize: 18, fontWeight: 'bold' },
  checkoutButton: { backgroundColor: '#007ACC', padding: 10, borderRadius: 5, marginTop: 15 },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  emptyMessage: { fontSize: 16, color: '#777', textAlign: 'center', marginTop: 20 },
});

export default CartScreen;

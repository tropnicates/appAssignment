import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faCreditCard, faMapMarkerAlt, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';

const BuyNowScreen = ({ route, navigation }) => {
  const { product, quantity } = route.params;
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);

  const paymentMethods = [
    { id: 1, name: 'Credit Card' },
    { id: 2, name: 'Debit Card' },
    { id: 3, name: 'UPI' },
    { id: 4, name: 'Net Banking' },
    { id: 5, name: 'Cash on Delivery' },
  ];

  const handlePlaceOrder = () => {
    if (!address.trim()) {
      Alert.alert('Address Required', 'Please enter a valid delivery address.');
      return;
    }
    Alert.alert('Order Placed', `Your order for ${product.name} has been placed.`);
  };

  const renderPaymentMethodItem = ({ item }) => (
    <TouchableOpacity
      style={styles.paymentOptionItem}
      onPress={() => {
        setPaymentMethod(item.name);
        setPaymentModalVisible(false);
      }}
    >
      <Text style={styles.paymentOptionText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Purchase</Text>

      {/* Product Information */}
      <View style={styles.productContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>₹{(product.discountedPrice * quantity).toFixed(2)}</Text>
          <Text style={styles.productQuantity}>Qty: {quantity}</Text>
        </View>
      </View>

      {/* Delivery Address Section */}
      <View style={styles.addressSection}>
        <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter delivery address"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      {/* Payment Method Section */}
      <View style={styles.paymentMethodSection}>
        <FontAwesomeIcon icon={faCreditCard} style={styles.icon} />
        <Text style={styles.paymentLabel}>Payment Method</Text>
        <TouchableOpacity
          style={styles.paymentDropdown}
          onPress={() => setPaymentModalVisible(true)}
        >
          <Text style={styles.paymentText}>{paymentMethod}</Text>
          <FontAwesomeIcon icon={faChevronDown} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>

      {/* Final Price Section */}
      <View style={styles.finalPriceContainer}>
        <Text style={styles.finalPriceText}>Total: ₹{(product.discountedPrice * quantity).toFixed(2)}</Text>
      </View>

      {/* Place Order Button */}
      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>

      {/* Payment Method Modal */}
      <Modal
        visible={isPaymentModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPaymentModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Select Payment Method</Text>
          <FlatList
            data={paymentMethods}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPaymentMethodItem}
          />
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setPaymentModalVisible(false)}
          >
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  productContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productDetails: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    color: '#ff6347',
  },
  productQuantity: {
    fontSize: 14,
    color: '#555',
  },
  addressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  icon: {
    color: '#007ACC',
    marginRight: 10,
    fontSize: 18,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
  },
  paymentMethodSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 10,
  },
  paymentDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  paymentText: {
    fontSize: 16,
    color: '#333',
  },
  arrowIcon: {
    fontSize: 14,
    color: '#007ACC',
  },
  finalPriceContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  finalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeOrderButton: {
    backgroundColor: '#007ACC',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  paymentOptionItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  paymentOptionText: {
    fontSize: 16,
    color: '#333',
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 8,
  },
  modalCloseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BuyNowScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck, faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ product, onSelect,addToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [showQuantityOptions, setShowQuantityOptions] = useState(false);

    // Navigation hook
    const navigation = useNavigation();

  const { mrp, discountedPrice, savings } = calculateDiscountedPrice(product.price, product.discountPercentage || 10);

  const selectQuantity = (value) => {
    setQuantity(value);
    setShowQuantityOptions(false);
  };

  const toggleQuantityOptions = () => {
    setShowQuantityOptions(!showQuantityOptions);
  };
  console.log('MRP:', mrp, 'Discounted Price:', discountedPrice, 'Savings:', savings);


  return (
    <View style={styles.card}>

      {/* Product Name */}
      <Text style={styles.name}>{product.name}</Text>

      {/* Benefits */}
      <View style={styles.benefitsContainer}>
        {product.benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <FontAwesomeIcon icon={faCircleCheck} style={styles.icon} />
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>

      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <TouchableOpacity style={styles.searchIcon} onPress={() => onSelect(product)}>
          <FontAwesomeIcon icon={faSearch} style={styles.searchIconStyle} />
        </TouchableOpacity>
      </View>

      {/* Features */}
      <View style={styles.featureContainer}>
        <Feature iconSource={require('../../assets/original.jpg')} label="100% Original" />
        <Feature iconSource={require('../../assets/discountBanner.jpg')} label="Lowest Price" />
        <Feature iconSource={require('../../assets/shipping.jpg')} label="Free Shipping" />
      </View>

    {/* Price Section */}
    <View style={styles.priceSection}>
      <Text style={styles.mrp}>MRP: ₹<Text style={styles.strikeThrough}>{mrp}</Text></Text>
      <Text style={styles.discountedPrice}>Buy at ₹ {discountedPrice}</Text>
      <Text style={styles.discountText}>{product.discountPercentage}10 % OFF</Text> 
      <Text style={styles.savingsText}>You save ₹ {savings}</Text>
    </View>
    <View style={styles.sizeContainer}>
  <Text style={styles.sizeLabel}>Size:</Text>
  {product.sizes && product.sizes.length > 0 ? (
    <View style={styles.sizeOptionsContainer}>
      {product.sizes.map((size, index) => (
        <TouchableOpacity 
          key={index} 
          style={[
            styles.sizeOption, 
            product.selectedSize === size && styles.selectedSize
          ]}
          onPress={() => onSelectSize(size)}>
          <Text style={[
            styles.sizeText, 
            product.selectedSize === size && styles.selectedSizeText
          ]}>
            {size}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  ) : (
    <Text style={styles.noSizeText}>30 ml</Text>
  )}
</View>

      {/* Quantity Selector */}
      <TouchableOpacity style={styles.quantitySelector} onPress={toggleQuantityOptions}>
        <Text style={styles.quantityText}>Qty: {quantity}</Text>
        <FontAwesomeIcon icon={faChevronDown} style={styles.toggleIcon} />
      </TouchableOpacity>

      {showQuantityOptions && (
        <View style={styles.quantityDropdown}>
          {[1, 2, 3, 4, 5].map((value) => (
            <TouchableOpacity key={value} onPress={() => selectQuantity(value)} style={styles.option}>
              <Text style={styles.optionText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(product, quantity)}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
  style={product.inStock ? styles.buyNowButton : styles.notifyMeButton}
  onPress={() => {
    if (product.inStock) {
      navigation.navigate('BuyNowScreen',{
        product:product,
        queantity: quantity,
      }); 
    } else {
      alert('Product is out of stock! You will be notified when available.');
    }
  }}
>
  <Text style={styles.buttonText}>
    {product.inStock ? 'Buy Now' : 'Notify Me'}
  </Text>
</TouchableOpacity>

      </View>
    </View>
  );
};

const Feature = ({ iconSource, label }) => (
  <View style={styles.feature}>
    <Image source={iconSource} style={styles.featureIcon} />
    <Text style={styles.featureText}>{label}</Text>
  </View>
);


const calculateDiscountedPrice = (mrp, discountPercentage = 10) => {
  const discountAmount = (mrp * (discountPercentage || 10)) / 100;
  const discountedPrice = mrp - discountAmount;
  const savings = discountAmount;
  return { mrp, discountedPrice, savings };
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  breadcrumbText: {
    fontSize: 14,
    color: '#6c757d',
  },
  currentLocation: {
    color: '#343a40',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
    marginVertical: 8,
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  icon: {
    marginRight: 8,
    color: '#28a745',
  },
  benefitText: {
    fontSize: 12,
    color: '#495057',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 350,
    borderRadius: 8,
  },
  searchIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 8,
    elevation: 2,
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  feature: {
    alignItems: 'center',
  },
  featureIcon: {
    width: 40,
    height: 40,
  },
  featureText: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 4,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  mrp: {
    fontSize: 16,
    color: '#6c757d',
    marginRight: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6347',
  },

  sizeContainer: {
    marginVertical: 10,
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#343a40',
    marginBottom: 8,
  },
  sizeOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
    
  sizeOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    borderColor: '#dee2e6',
    borderWidth: 1,
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '500',
  },
  selectedSize: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  selectedSizeText: {
    color: '#fff',
  },

  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  quantityText: {
    fontSize: 16,
  },
  toggleIcon: {
    fontSize: 16,
    color: '#343a40',
    marginLeft: 5,
  },
  quantityDropdown: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 8,
    borderColor: '#dee2e6',
    borderWidth: 1,
    position: 'absolute',
    zIndex: 10,
    top: '80%',
    width: '30%',
    marginLeft: 100,

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  addToCartButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifyMeButton: {
    flex: 1,
    backgroundColor: '#ffc107',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
  },
  priceSection: {
    marginVertical: 8,
  },
  mrp: {
    fontSize: 16,
    color: '#6c757d',
    marginRight: 8,
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
    color: '#6c757d',
  },
  discountedPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6347',
  },
  discountText: {
    fontSize: 14,
    color: '#ff4500',
    marginTop: 5,
  },
  savingsText: {
    fontSize: 14,
    color: '#28a745',
    marginTop: 5,
  },
});

export default ProductCard;

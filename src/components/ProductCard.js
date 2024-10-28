import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCircleCheck,
  faChevronDown,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product, onSelect }) => {
  const [quantity, setQuantity] = useState(1);
  const [showQuantityOptions, setShowQuantityOptions] = useState(false);

  const selectQuantity = value => {
    setQuantity(value);
    setShowQuantityOptions(false);
  };

  const toggleQuantityOptions = () => {
    setShowQuantityOptions(!showQuantityOptions);
  };

  // Handle the image index change
  const handleImageScroll = (event) => {
    const width = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(event.nativeEvent.contentOffset.x / width);
    setCurrentImageIndex(index);
  };
  
  return (
    <View style={styles.card}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          alignSelf: 'flex-start',
          marginLeft: 45,
          marginTop: 10,
        }}>
        <Text>home/</Text>
        <Text>{product.name}</Text>
      </View>
      <Text style={styles.name}>{product.name}</Text>
      <View style={styles.benefitsContainer}>
        {product.benefits.map((benefit, index) => {
          const [firstWord, secondWord] = benefit.split(' ');
          return (
            <View key={index} style={styles.column}>
              <View style={styles.benefitItem}>
                <FontAwesomeIcon icon={faCircleCheck} style={styles.icon} />
                <View style={styles.textContainer}>
                  <Text style={styles.benefitText}>{firstWord} </Text>
                  <Text style={styles.benefitText}>{secondWord}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={() => onSelect(product)}>
          <FontAwesomeIcon icon={faSearch} style={styles.searchIconStyle} />
        </TouchableOpacity>
      </View>

      <View style={styles.discountContainer}>
        <View style={styles.discount}>
          <Image
            source={require('../../assets/original.jpg')}
            style={{ width: 60, marginBottom: 10, height: 40 }}
          />
          <Text style={styles.anar}>100% Original</Text>
        </View>
        <View style={styles.discount}>
          <Image
            source={require('../../assets/discountBanner.jpg')}
            style={{ width: 60, marginBottom: 10, height: 40 }}
          />
          <Text style={styles.anar}>Lowest Price</Text>
        </View>
        <View style={styles.discount1}>
          <Image
            source={require('../../assets/shipping.jpg')}
            style={{ width: 60, marginBottom: 10, height: 40 }}
          />
          <Text style={styles.anar}>Free Shipping</Text>
        </View>
      </View>

      <View style={styles.prices}>
        <Text style={styles.mrp}>MRP:</Text>
        <Text style={styles.price}>₹ {product.price}</Text>
      </View>
      <Text style={styles.data}>[incl. of all taxes]</Text>
      <Text style={styles.stock}>
        {/* {product.inStock ? 'In Stock' : 'Out of Stock'} */}
      </Text>
      <Text style={styles.sizeLabel}>Size: </Text>
      <Text style={styles.size}>{product.size}</Text>

      <TouchableOpacity
        style={styles.quantityContainer}
        onPress={toggleQuantityOptions}>
        <Text style={styles.quantityText}>Qty: {quantity} </Text>
        <FontAwesomeIcon icon={faChevronDown} style={styles.toggleIcon} />
      </TouchableOpacity>

      {showQuantityOptions && (
        <View style={styles.quantityDropdown}>
          {[1, 2, 3, 4, 5].map(value => (
            <TouchableOpacity
              key={value}
              onPress={() => selectQuantity(value)}
              style={styles.option}>
              <Text style={styles.optionText}>{value}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.buttonText}>Add to cart</Text>
        </TouchableOpacity>

        {product.inStock ? (
          <TouchableOpacity style={styles.buyNowButton}>
            <Text style={styles.buttonText1}>Buy it now</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.notifyMeButton}>
            <Text style={styles.buttonText1}>Notify Me</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 'width*0.9',
    backgroundColor: '#2222',
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 70,
  },
  benefitsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingLeft: 32,
    marginBottom: -10,
  },
  column: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 10,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  icon: {
    marginRight: 5,
    color: '#0B6623',
  },
  benefitText: {
    fontSize: 12,
    color: '#0B6623',
  },
  productImage: {
    width: 320,
    height: 300,
    borderRadius: 16,
    marginVertical: 10,
    alignSelf: 'center',
  },
  searchIcon: {
    position: 'absolute',
    bottom: 25,
    right: 15,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
  },
  discountContainer: {
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
  },
  discount: {
    flex: 1,
    padding: 10,
    borderColor: '#6c5ce7',
    alignItems: 'center',
    borderRightWidth: 1,
  },
  discount1: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  anar: {
    fontSize: 12,
  },
  prices: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
    marginLeft: -210,
  },
  data: {
    marginLeft: -210,
    fontSize: 10,
  },
  mrp: {
    fontSize: 14,
    color: '#333',
    marginRight: 5,
  },
  price: {
    fontSize: 20,
    color: '#333',
  },
  stock: {
    fontSize: 16,
    color: '#888',
    marginLeft: -250,
  },
  sizeLabel: {
    fontSize: 20,
    marginTop: -10,
    marginLeft: -250,
  },
  size: {
    fontSize: 20,
    borderRadius: 8,
    borderColor:"#6c5ce7",
    borderWidth: 2,
    padding: 5,
    marginTop: -30,
    marginLeft: -120,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: -210,
    padding: 10,
    borderRadius: 10,
    backgroundColor:'grey',
    padding:20.
  },
  toggleIcon: {
    fontSize: 30,
    color: '#333',
    marginLeft: 5,
  },
  quantityDropdown: {
    position: 'absolute',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 450,
    // zIndex: 1,
    width: '20%',
    borderRadius:5,
    borderWidth: 2,
    borderColor:"#FFF",
    backgroundColor:'white',
  },
  quantityText:{
    fontSize: 15,

  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  
  addToCartButton: {
    flex: 1,
    padding: 10,
    borderColor: '#6c5ce7',
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  
  buyNowButton: {
    flex: 1,
    backgroundColor: '#6c5ce7',
    paddingVertical: 10, // Consistent padding for height
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  notifyMeButton: {
    flex: 1,
    backgroundColor: '#FF6347',
    paddingVertical: 10, // Consistent padding for height
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonText1: {
    fontSize: 16,
    color: '#FFF',
    alignItems:'center',
  },
});

export default ProductCard;

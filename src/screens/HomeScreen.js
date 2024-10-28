import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import ProductCard from '../components/ProductCard';
import {loadProducts} from '../data/Products';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faUser as faRegularUser,
  faBagShopping,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

const HomeScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsData = loadProducts();
    setProducts(productsData);
  }, []);

  const handleSelectProduct = product => {
    navigation.navigate('ProductDetails', {product});
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.button}>
          <View style={styles.line} />
          <View style={styles.line1} />
          <View style={styles.line} />
        </View>
        <View style={styles.circle}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </View>
        <Text style={styles.text}>Clinikally.</Text>
        <View style={styles.profile}>
          <FontAwesomeIcon icon={faRegularUser} size={24}  />
        </View>
        <View style={styles.cart}>
          <FontAwesomeIcon
            icon={faBagShopping}
            size={24}
            c
            borderColor="#0000FF"
          />
        </View>
      </View>

      <FlatList
        data={products}
        renderItem={({item}) => (
          <ProductCard product={item} onSelect={handleSelectProduct} />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1,  backgroundColor: '#f9f9f9'},
  container: {flexDirection: 'row', alignItems: 'center',paddingLeft:20,marginTop:10},
  button: {
    width: 24,
    height: 24,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginRight: 5,
    marginLeft: 10,
  },
  line: {
    width: 25,
    height: 3,
    backgroundColor: '#000',
    borderRadius: 2,
  },
  line1: {
    width: '80%',
    height: 3,
    backgroundColor: '#000',
    borderRadius: 2,
    alignSelf: 'flex-start',
  },
  circle: {
    width: 60,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 0,
  },
  text: {fontSize: 20, marginLeft: 20},
  profile: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 40,
    marginRight: 20,
  },
  cart: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#0000FF',
    // marginRight: 10,
    paddingRight:10
  },
});

export default HomeScreen;

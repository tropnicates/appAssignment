// ProductDetails.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import ProductCard from '../components/ProductCard';
import { loadProducts } from '../data/Products';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faUser as faRegularUser,
  faBagShopping,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

const { width, height } = Dimensions.get('window');

const ProductDetails = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const productsData = loadProducts();
    setProducts(productsData);
    setFilteredProducts(productsData);
  }, []);

  const handleSelectProduct = (product) => {
    navigation.navigate('ProductDetails', { product });
  };

  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.line} />
          <View style={styles.line1} />
          <View style={styles.line} />
        </TouchableOpacity>
        <Text style={styles.title}>OnlineMart</Text>
        <View style={styles.icons}>
          <TouchableOpacity style={styles.iconWrapper}>
            <FontAwesomeIcon icon={faRegularUser} size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper}>
            <FontAwesomeIcon icon={faBagShopping} size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductCard product={item} onSelect={handleSelectProduct} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: width * 0.05,
    width: '100%', 
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#007ACC', 
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  menuButton: {
    width: 24,
    height: 24,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  line: {
    width: 25,
    height: 3,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  line1: {
    width: '80%',
    height: 3,
    backgroundColor: '#fff',
    borderRadius: 2,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: width * 0.06,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  icons: {
    flexDirection: 'row',
  },
  iconWrapper: {
    marginLeft: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  searchIcon: {
    paddingHorizontal: 5,
  },
  flatListContainer: {
    paddingBottom: 20, 
  },
});

export default ProductDetails;

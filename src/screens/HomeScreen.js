import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Modal } from 'react-native';
import ProductCard from '../components/ProductCard';
import { loadProducts } from '../data/Products';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser as faRegularUser, faBagShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const productsData = loadProducts();
    setProducts(productsData);
    setFilteredProducts(productsData);
  }, []);

  const handleSelectProduct = (product) => {
    navigation.navigate('ProductDetails', { product, addToCart });
  };

  const addToCart = (product, quantity) => {
    const updatedProduct = { ...product, quantity };
    setCart([...cart, updatedProduct]);
  };

  const handleAddToCart = () => {
    setCartCount(cartCount + 1); 
    setModalVisible(true); 
    setTimeout(() => {
      setModalVisible(false); 
    }, 2000);
  };

  const handleSearch = () => {
    const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
    if (filtered.length === 0) {
        alert("No products found.");
    }
};


  return (
    <View style={styles.mainContainer}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Categories')}>
          <View style={styles.line} />
          <View style={styles.line1} />
          <View style={styles.line} />
        </TouchableOpacity>

        {/* Wrap the title with TouchableOpacity to make it a Home button */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.title}>DazeCart</Text>
        </TouchableOpacity>

        <View style={styles.icons}>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('Profile')}>
            <FontAwesomeIcon icon={faRegularUser} size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconWrapper} onPress={() => navigation.navigate('Cart', { cart })}>
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
        renderItem={({ item }) => <ProductCard product={item} onSelect={handleSelectProduct} addToCart = {addToCart} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>

    
  );
};



const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#f9f9f9', paddingHorizontal: width * 0.0 },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#007ACC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  menuButton: { width: 24, height: 24, justifyContent: 'space-around', alignItems: 'center' },
  line: { width: 25, height: 3, backgroundColor: '#fff', borderRadius: 2 },
  line1: { width: '80%', height: 3, backgroundColor: '#fff', borderRadius: 2, alignSelf: 'flex-start' },
  title: { fontSize: width * 0.06, color: '#fff', fontWeight: 'bold', alignSelf: 'center' },
  icons: { flexDirection: 'row' },
  iconWrapper: { marginLeft: 15 },
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
  searchInput: { flex: 1, fontSize: 16, paddingVertical: 20, paddingHorizontal: 20 },
  searchIcon: { paddingHorizontal: 8 },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  cartText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

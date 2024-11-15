import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const categories = ['Electronics', 'Fashion', 'Home Appliances', 'Books', 'Toys'];

const productData = {
  Electronics: [
    { 
      id: '1', 
      name: 'Laptop', 
      price: '50000', 
      image: 'https://placeimg.com/150/150/tech?text=Laptop' 
    },
    { 
      id: '2', 
      name: 'Smartphone', 
      price: '20000', 
      image: 'https://placeimg.com/150/150/tech?text=Smartphone' 
    },
    { 
      id: '3', 
      name: 'Smartwatch', 
      price: '5000', 
      image: 'https://placeimg.com/150/150/tech?text=Smartwatch' 
    },
    { 
      id: '4', 
      name: 'Headphones', 
      price: '3000', 
      image: 'https://placeimg.com/150/150/tech?text=Headphones' 
    },
  ],
  Fashion: [
    { 
      id: '5', 
      name: 'T-shirt', 
      price: '500', 
      image: 'https://placeimg.com/150/150/fashion?text=T-shirt' 
    },
    { 
      id: '6', 
      name: 'Jeans', 
      price: '1500', 
      image: 'https://placeimg.com/150/150/fashion?text=Jeans' 
    },
    { 
      id: '7', 
      name: 'Jacket', 
      price: '2500', 
      image: 'https://placeimg.com/150/150/fashion?text=Jacket' 
    },
    { 
      id: '8', 
      name: 'Sneakers', 
      price: '3500', 
      image: 'https://placeimg.com/150/150/fashion?text=Sneakers' 
    },
  ],
  'Home Appliances': [
    { 
      id: '9', 
      name: 'Washing Machine', 
      price: '30000', 
      image: 'https://placeimg.com/150/150/tech?text=Washing+Machine' 
    },
    { 
      id: '10', 
      name: 'Microwave', 
      price: '7000', 
      image: 'https://placeimg.com/150/150/tech?text=Microwave' 
    },
    { 
      id: '11', 
      name: 'Air Conditioner', 
      price: '35000', 
      image: 'https://placeimg.com/150/150/tech?text=Air+Conditioner' 
    },
    { 
      id: '12', 
      name: 'Refrigerator', 
      price: '25000', 
      image: 'https://placeimg.com/150/150/tech?text=Refrigerator' 
    },
  ],
  Books: [
    { 
      id: '13', 
      name: 'React Native Guide', 
      price: '800', 
      image: 'https://placeimg.com/150/150/tech?text=React+Native+Guide' 
    },
    { 
      id: '14', 
      name: 'The Great Gatsby', 
      price: '500', 
      image: 'https://placeimg.com/150/150/tech?text=The+Great+Gatsby' 
    },
    { 
      id: '15', 
      name: 'Clean Code', 
      price: '600', 
      image: 'https://placeimg.com/150/150/tech?text=Clean+Code' 
    },
    { 
      id: '16', 
      name: 'Introduction to Algorithms', 
      price: '1200', 
      image: 'https://placeimg.com/150/150/tech?text=Algorithms+Book' 
    },
  ],
  Toys: [
    { 
      id: '17', 
      name: 'Lego Set', 
      price: '2000', 
      image: 'https://placeimg.com/150/150/tech?text=Lego+Set' 
    },
    { 
      id: '18', 
      name: 'Toy Car', 
      price: '300', 
      image: 'https://placeimg.com/150/150/tech?text=Toy+Car' 
    },
    { 
      id: '19', 
      name: 'Action Figure', 
      price: '1500', 
      image: 'https://placeimg.com/150/150/tech?text=Action+Figure' 
    },
    { 
      id: '20', 
      name: 'Dollhouse', 
      price: '4000', 
      image: 'https://placeimg.com/150/150/tech?text=Dollhouse' 
    },
  ],
};


const CategoriesScreen = ({ navigation }) => {
  const handleCategorySelect = (category) => {
    const products = productData[category] || [];
    navigation.navigate('CategoryProducts', { category, products });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => handleCategorySelect(item)}
          >
            <Text style={styles.categoryText}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  categoryButton: { padding: 15, borderWidth: 1, marginBottom: 10 },
  categoryText: { fontSize: 18 },
});

export default CategoriesScreen;

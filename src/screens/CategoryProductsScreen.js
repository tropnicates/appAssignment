import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const CategoryProductsScreen = ({ route }) => {
  // Destructure category and products from the route params
  const { category, products } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category} Products</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>₹ {item.price}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  productCard: { padding: 15, borderWidth: 1, marginBottom: 10 },
  productName: { fontSize: 18 },
  productPrice: { fontSize: 16, color: 'green' },
});

export default CategoryProductsScreen;

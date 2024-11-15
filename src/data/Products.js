import { parse } from 'papaparse';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const productsCsv = `
Product ID,Product Name,Price,inStock,image,size,benefits,Product Quantity
1,Aloe Vera Shampoo,63,true,"https://m.media-amazon.com/images/I/61KiCS3rPpS.jpg","30 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
2,Keratin Shampoo,263,false,"https://theskinstory.in/cdn/shop/files/1_101b2734-5b84-4ccd-97c3-ea15e483f1f0.jpg?v=1704451340","300 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
3,Naturali Shampoo,630,true,"https://naturali.co.in/cdn/shop/files/DSN_HFA_16527160-1c29-4aeb-8a90-d36f86fea34e.jpg?v=1715838431","130 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
4,L'oreal Shampoo,603,false,"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRqyFuqo7bd_Z0D605tGOLGS0PzbQl70Lh0hhvhfnN-n2mUTxkrRA9aytVq_0qh_IQrMsvcuDVervFB3n1hqOTiSXtlowxOCKVWg0m7XteR3R93Lr9HYDQr&usqp=CAE","30 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
5,Aloe Vera Shampoo,600,false,"https://m.media-amazon.com/images/I/61KiCS3rPpS.jpg","130 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
6,Aloe Vera Shampoo,63,true,"https://m.media-amazon.com/images/I/61KiCS3rPpS.jpg","230 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
7,Aloe Vera Shampoo,63,false,"https://m.media-amazon.com/images/I/61KiCS3rPpS.jpg","230 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
8,Aloe Vera Shampoo,63,false,"https://m.media-amazon.com/images/I/61KiCS3rPpS.jpg","130 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
9,Aloe Vera Shampoo,63,true,"https://m.media-amazon.com/images/I/61KiCS3rPpS.jpg","30 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
10,Aloe Vera Shampoo,63,false,"https://m.media-amazon.com/images/I/61KiCS3rPpS.jpg","530 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
11,Aloe Vera Shampoo,63,true,"https://m.media-amazon.com/images/I/61KiCS3rPpS.jpg","430 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
12,Aloe Vera Shampoo,63,false,"https://m.media-amazon.com/images/I/61KiCS3rPpS.jpg","330 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
13,Aloe Vera Shampoo,63,true,"https://m.media-amazon.com/images/I/61KiCS3rPpS.jpg","230 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
`;


const parseBenefits = (benefitsString) => {
  try {
    return JSON.parse(benefitsString.replace(/'/g, '"'));
  } catch (error) {
    console.error('Error parsing benefits:', error);
    return [];
  }
};

export const loadProducts = () => {
  const products = parse(productsCsv, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  }).data;

  const mappedProducts = products.map(product => ({
    id: product['Product ID'],
    name: product['Product Name'],
    price: parseFloat(product['Price']).toFixed(2),
    inStock: product['inStock'] === 'true' || product['inStock'] === true,
    image: product['image'],
    size: product['size'],
    benefits: parseBenefits(product['benefits'] || '[]'),
    quantity: product['Product Quantity']
  }));

  console.log("Parsed Products:", mappedProducts);
  return mappedProducts;
};
export const ProductList = () => {
  const [pincode, setPincode] = useState('');
  const [selectedSize, setSelectedSize] = useState(null); 
  const [provider, setProvider] = useState(null);
  const products = loadProducts();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={pincode}
        onChangeText={(text) => setPincode(text)}
        placeholder="Enter pincode"
      />
      <Button title="Set Provider" onPress={() => setProvider("Some Provider")} />

      <Text style={styles.breadcrumb}>Product List</Text>

      {products.length === 0 ? (
        <Text>Product not found</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={({ item: product }) => (
            <View key={product.id} style={styles.productItem}>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.price}>Price: ${product.price}</Text>
              <View style={styles.benefitsContainer}>
                {product.benefits.map((benefit, index) => (
                  <View key={index} style={styles.benefitBadge}>
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.imageContainer}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
              </View>
              <Text style={[styles.stock, { color: product.inStock ? '#2a9d8f' : '#000' }]}>{product.inStock ? 'In Stock' : 'Out of Stock'}</Text>

              {/* Size Selector */}
              <View style={styles.sizeQuantityContainer}>
                <Text style={styles.sizeLabel}>Size:</Text>
                <TouchableOpacity
                  style={styles.sizeBox}
                  onPress={() => {
                    setSelectedSize(product.size);  
                    console.log(`Selected size: ${product.size}`);
                  }}
                >
                  <Text style={styles.sizeText}>{product.size}</Text>
                </TouchableOpacity>
              </View>

              {/* Display size selection state */}
              {selectedSize && selectedSize === product.size ? (
                <Text style={styles.selectedSize}>Selected Size: {selectedSize}</Text>
              ) : null}

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.addToCartButton}>
                  <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyNowButton}>
                  <Text style={styles.buttonText}>Buy Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(product) => product.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
    backgroundColor: '#f9f9f9',
  },
  breadcrumb: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,  
    fontWeight: 'bold',
    marginBottom: 10,
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  benefitBadge: {
    backgroundColor: '#e0f7e9',
    padding: 6,
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
  },
  benefitText: {
    color: '#2a9d8f',
    fontSize: 12,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  productImage: {
    width: '80%',  // Make image width responsive
    height: undefined,  // Let height scale with width
    aspectRatio: 3 / 4,  // Maintain aspect ratio
    borderRadius: 8,
  },
  price: {
    fontSize: 18,
    color: '#333',
    marginVertical: 5,
  },
  stock: {
    fontSize: 14,
    marginBottom: 15,
  },
  sizeQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sizeLabel: {
    fontSize: 16,
    marginRight: 5,
  },
  sizeBox: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginRight: 20,
  },
  sizeText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#6c5ce7',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#e17055',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
});

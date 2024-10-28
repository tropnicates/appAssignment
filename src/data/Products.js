import { parse } from 'papaparse';
import React, { useState } from 'react';

const productsCsv = `
Product ID,Product Name,Price,inStock,image,size,benefits,Product Quantity
1,Aloe Vera Shampoo,63.54,true,"https://m.media-amazon.com/images/I/61KiCS3rPpS.jpg","30 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
2,Aloe Vera Shampoo,263.54,false,"https://theskinstory.in/cdn/shop/files/1_101b2734-5b84-4ccd-97c3-ea15e483f1f0.jpg?v=1704451340","300 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
3,Aloe Vera Shampoo,630.54,true,"https://naturali.co.in/cdn/shop/files/DSN_HFA_16527160-1c29-4aeb-8a90-d36f86fea34e.jpg?v=1715838431","130 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
4,Aloe Vera Shampoo,603.54,false,"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRqyFuqo7bd_Z0D605tGOLGS0PzbQl70Lh0hhvhfnN-n2mUTxkrRA9aytVq_0qh_IQrMsvcuDVervFB3n1hqOTiSXtlowxOCKVWg0m7XteR3R93Lr9HYDQr&usqp=CAE","30 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
5,Aloe Vera Shampoo,6003.54,false,"https://m.media-amazon.com/images/I/61KiCS3rPpS.jpg","30 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
6,Aloe Vera Shampoo,63.54,true,"https://m.media-amazon.com/images/I/61KiCS3rPpS.jpg","30 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
7,Aloe Vera Shampoo,63.54,false,"https://m.media-amazon.com/images/I/61KiCS3rPpS.jpg","30 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
8,Aloe Vera Shampoo,63.54,false,"https://m.media-amazon.com/images/I/61KiCS3rPpS.jpg","30 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
9,Aloe Vera Shampoo,63.54,true,"https://m.media-amazon.com/images/I/61KiCS3rPpS.jpg","30 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
10,Aloe Vera Shampoo,63.54,false,"https://m.media-amazon.com/images/I/61KiCS3rPpS.jpg","30 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
11,Aloe Vera Shampoo,63.54,true,"https://m.media-amazon.com/images/I/61KiCS3rPpS.jpg","30 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
12,Aloe Vera Shampoo,63.54,false,"https://m.media-amazon.com/images/I/61KiCS3rPpS.jpg","30 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
13,Aloe Vera Shampoo,63.54,true,"https://m.media-amazon.com/images/I/61KiCS3rPpS.jpg","30 ml","['Lightens Spots','Targets Pigmentation','Evens Skin Tone']",1
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
    quantity:product['Product Quantity']
  }));

  console.log("Parsed Products:", mappedProducts); 
  return mappedProducts;
};

export const ProductList = () => {
  const [pincode, setPincode] = useState('');
  const [provider, setProvider] = useState(null);
  const products = loadProducts();

  return (
    <div style={styles.container}>
      <input
        type="text"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        placeholder="Enter pincode"
      />
      <button onClick={() => setProvider("Some Provider")}>Set Provider</button>
      
      <h2 style={styles.breadcrumb}>Product List</h2>
      
      {products.length === 0 ? (
        <p>Product not found</p>
      ) : (
        <ul style={{ padding: 0 }}>
          {products.map(product => (
            <li key={product.id} style={{ listStyle: 'none', marginBottom: '20px' }}>
              <div style={styles.name}>{product.name}</div>
              <p style={styles.price}>Price: ${product.price}</p>
              <div style={styles.benefitsContainer}>
                {product.benefits.map((benefit, index) => (
                  <span key={index} style={styles.benefitBadge}>
                    <span style={styles.benefitText}>{benefit}</span>
                  </span>
                ))}
              </div>
              <div style={styles.imageContainer}>
                <img src={product.image} alt={product.name} style={styles.productImage} />
              </div>
              <p style={{ ...styles.stock, color: product.inStock ? '#2a9d8f' : '#000' }}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
              <div style={styles.sizeQuantityContainer}>
                <div style={styles.sizeLabel}>Size:</div>
                <div style={styles.sizeBox}>
                  <span style={styles.sizeText}>{product.size}</span>
                </div>
              </div>
              <div style={styles.buttonContainer}>
                <button style={styles.addToCartButton}>
                  <span style={styles.buttonText}>Add to Cart</span>
                </button>
                <button style={styles.buyNowButton}>
                  <span style={styles.buttonText}>Buy Now</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: { padding: 20, backgroundColor: '#f9f9f9' },
  breadcrumb: { fontSize: 14, color: '#888', marginBottom: 10 },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  benefitsContainer: { display: 'flex', flexWrap: 'wrap', marginBottom: 15 },
  benefitBadge: { backgroundColor: '#e0f7e9', padding: '6px 10px', borderRadius: 15, marginRight: 5, marginBottom: 5 },
  benefitText: { color: '#2a9d8f', fontSize: 12 },
  imageContainer: { display: 'flex', justifyContent: 'center', marginBottom: 15 },
  productImage: { width: 150, height: 200, borderRadius: 8 },
  price: { fontSize: 18, color: '#333', marginVertical: 5 },
  stock: { fontSize: 14, marginBottom: 15 },
  sizeQuantityContainer: { display: 'flex', alignItems: 'center', marginBottom: 20 },
  sizeLabel: { fontSize: 16, marginRight: 5 },
  sizeBox: { border: '1px solid #ddd', padding: '8px', borderRadius: 5, marginRight: 20 },
  sizeText: { fontSize: 16 },
  buttonContainer: { display: 'flex', justifyContent: 'space-between', marginTop: 20 },
  addToCartButton: { flex: 1, backgroundColor: '#6c5ce7', padding: '15px', borderRadius: 5, textAlign: 'center', marginRight: 10 },
  buyNowButton: { flex: 1, backgroundColor: '#ff6b6b', padding: '15px', borderRadius: 5, textAlign: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
};

import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import CategoryProductsScreen from './src/screens/CategoryProductsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ProductDetails from './src/screens/ProductDetailsScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import BuyNowScreen from './src/screens/buyNowScreen';
import 'react-native-gesture-handler';
import CartScreen from './src/screens/cartScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen name="Categories" component={CategoriesScreen} />
         <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name = "Cart" component={CartScreen} />
        <Stack.Screen name="CategoryProducts" component={CategoryProductsScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="BuyNowScreen" component={BuyNowScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// src/Navigation.js
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ProductDetails from './screens/ProductDetails';
import Checkout from './screens/Checkout';

const Stack = createStackNavigator();

export const AppNavigator = () => (
  <Stack.Navigator initialRouteName="/">
    <Stack.Screen 
      name="/" 
      component={HomeScreen} 
      options={{ headerShown: false }}  
    />
    <Stack.Screen 
      name="ProductDetails" 
      component={ProductDetails} 
      options={{ title: 'Product Details' }} 
    />
    <Stack.Screen 
      name="Checkout" 
      component={Checkout} 
      options={{ title: 'Checkout' }} 
    />
  </Stack.Navigator>
);

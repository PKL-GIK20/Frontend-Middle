import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import "react-native-gesture-handler";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from './component/HomeScreen';
import ShoppingList from './component/ShoppingList';
import AboutScreen from './component/AboutScreen';
import OrderSummary from './component/OrderSummary';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="ShoppingList" component={ShoppingList} options={{ title: 'Menu List' }} />
        <Stack.Screen name="OrderSummary" component={OrderSummary} options={{ title: 'Pesanan' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About Us' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;

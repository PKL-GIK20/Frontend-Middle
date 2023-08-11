import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './component/HomeScreen';
import ShoppingList from './component/ShoppingList';
import AboutScreen from './component/AboutScreen';
import OrderSummary from './component/OrderSummary';
import { Provider } from 'react-redux';
import store from './redux/store';



const Stack = createStackNavigator();

function App() {
  return (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ShoppingList" component={ShoppingList} options={{ title: 'Menu List' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About Us' }} />
        <Stack.Screen name="OrderSummary" component={OrderSummary} options={{ title: 'Pesanan' }} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  );
}

export default App;

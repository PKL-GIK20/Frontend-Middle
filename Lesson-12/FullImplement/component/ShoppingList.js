import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button } from 'react-native';
import MenuItem from './MenuItem';
import { useNavigation } from '@react-navigation/native';

function ShoppingList() {
  const navigation = useNavigation();

  const [menuItems, setMenuItems] = useState([
    { id: '1', name: 'Paha Bawah', description: 'Pedas/Crispy', price: 10000, image: require('../assets/menu/paha-bawah.png'), category: 'food' },
    { id: '2', name: 'Dada', description: 'Pedas', price: 12000, image: require('../assets/menu/dada.jpeg'), category: 'food' },
    { id: '3', name: 'Paha Atas', description: 'Pedas/Crispy', price: 10000, image: require('../assets/menu/paha-atas.jpeg'), category: 'food' },
    { id: '4', name: 'Sayap', description: 'Pedas/Crispy', price: 8000, image: require('../assets/menu/sayap.jpeg'), category: 'food' },
    { id: '5', name: 'Teh', description: 'Dingin/Panas', price: 5000, image: require('../assets/menu/teh.jpg'), category: 'drink' },
    { id: '6', name: 'Lemon', description: 'Dingin/Panas', price: 5000, image: require('../assets/menu/lemon.jpg'), category: 'drink' },
    { id: '7', name: 'Alpukat', description: 'Dingin', price: 10000, image: require('../assets/menu/alpukat.jpg'), category: 'drink' },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);

  const calculateTotal = () => {
    const total = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return total.toFixed(2);
  };

  const addItemToCart = (item) => {
    const existingItem = selectedItems.find((selectedItem) => selectedItem.id === item.id);
    if (existingItem) {
      changeItemQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const changeItemQuantity = (itemId, newQuantity) => {
    if (newQuantity >= 0) {
      setSelectedItems((prevItems) =>
        prevItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
      );
    }
  };

  const foodItems = menuItems.filter((item) => item.category === 'food');
  const drinkItems = menuItems.filter((item) => item.category === 'drink');

  useEffect(() => {
    navigation.setOptions({
      title: 'Daftar Belanja',
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>Makanan</Text>
      <FlatList
        data={foodItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MenuItem
            {...item}
            quantity={selectedItems.find((selectedItem) => selectedItem.id === item.id)?.quantity || 0}
            onQuantityChange={(newQuantity) => changeItemQuantity(item.id, newQuantity)}
            onAddToCart={() => addItemToCart(item)}
            onDeleteItem={() => DeleteItemToCart(item)}
          />
        )}
        style={styles.menuList}
      />
      <Text style={styles.categoryTitle}>Minuman</Text>
      <FlatList
        data={drinkItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MenuItem
            {...item}
            quantity={selectedItems.find((selectedItem) => selectedItem.id === item.id)?.quantity || 0}
            onQuantityChange={(newQuantity) => changeItemQuantity(item.id, newQuantity)}
            onAddToCart={() => addItemToCart(item)}
            onDeleteItem={() => DeleteItemToCart(item)}
          />
        )}
        style={styles.menuList}
      />
      <Text style={styles.total}>Total: Rp.{calculateTotal()}</Text>
      <Button
        title="Pesan Sekarang"
        onPress={() => {
          navigation.navigate('OrderSummary', { selectedItems });
        }}
      />    
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  menuList: {
    marginTop: 12,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    alignSelf: 'flex-end',
  },
});

export default ShoppingList;

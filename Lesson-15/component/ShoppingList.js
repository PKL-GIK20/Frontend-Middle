import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,Image,Button, StyleSheet } from 'react-native';
import MenuItem from './MenuItem';
import { useNavigation } from '@react-navigation/native';
import OrderSummary from './OrderSummary';


function ShoppingList() {
  const navigation = useNavigation();
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetchMenuItems(); // Fetch menu items from API
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/PKL-GIK20/Frontend-Middle/main/Lesson-15/shoppingList.json'); // Replace with your API URL
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

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

  const nonItems = menuItems.filter((item) => item.category === 'non');
  const coffeeItems = menuItems.filter((item) => item.category === 'coffee');

  useEffect(() => {
    navigation.setOptions({
      title: 'Daftar Pesanan',
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>Non-Coffee</Text>
      <FlatList
        data={nonItems}
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
      <Text style={styles.categoryTitle}>Coffee</Text>
      <FlatList
        data={coffeeItems}
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

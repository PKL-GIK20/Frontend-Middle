import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,Image, StyleSheet } from 'react-native';
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
    const total = selectedItems.reduce((acc, item) => acc + item.price, 0);
    return total.toFixed(2);
  };

  const toggleItemSelection = (item) => {
    const isSelected = selectedItems.some((selectedItem) => selectedItem.id === item.id);
    if (isSelected) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
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
            isSelected={selectedItems.some((selectedItem) => selectedItem.id === item.id)}
            onPress={() => toggleItemSelection(item)}
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
            isSelected={selectedItems.some((selectedItem) => selectedItem.id === item.id)}
            onPress={() => toggleItemSelection(item)}
          />
        )}
        style={styles.menuList}
      />
      <Text style={styles.total}>Total: Rp.{calculateTotal()}</Text>
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

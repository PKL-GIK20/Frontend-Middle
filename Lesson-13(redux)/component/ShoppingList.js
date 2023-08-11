import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addItem } from '../redux/action';
import MenuItem from './MenuItem';
import { useNavigation } from '@react-navigation/native';


function ShoppingList() {
  const navigation = useNavigation();

  const [menuItems, setMenuItems] = useState([
    { id: '1', name: 'Vanilla', description: 'Panas/Dingin',  image: require('../assets/menu/vanilla.jpeg'), category: 'non' },
    { id: '2', name: 'Cokelat', description: 'Panas/Dingin',  image: require('../assets/menu/cokelat.jpg'), category: 'non' },
    { id: '3', name: 'Tiramissu', description: 'Panas/Dingin',  image: require('../assets/menu/tiramisu.jpg'), category: 'non' },
    { id: '4', name: 'Green Tea', description: 'Panas/Dingin',  image: require('../assets/menu/greentea.jpeg'), category: 'non' },
    { id: '5', name: 'Kopi Susu', description: 'Panas/Dingin',  image: require('../assets/menu/kopisusu.jpeg'), category: 'coffee' },
    { id: '6', name: 'Americano', description: 'Panas/Dingin',  image: require('../assets/menu/americano.jpeg'), category: 'coffee' },
    { id: '7', name: 'Cappuccino', description: 'Panas/Dingin',  image: require('../assets/menu/cappucino.jpg'), category: 'coffee' },
    { id: '8', name: 'Cafe Latte', description: 'Panas/Dingin',  image: require('../assets/menu/caffelatte.jpg'), category: 'coffee' },
    { id: '9', name: 'Espresso', description: 'Panas/Dingin', image: require('../assets/menu/espresso.jpg'), category: 'coffee' },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);

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
    <TouchableOpacity
      style={styles.pesanSekarangButton}
      onPress={() => {
        navigation.navigate('OrderSummary', { selectedItems });
      }}
    >
    <Text style={styles.buttonText}>Pesan Sekarang</Text>
    </TouchableOpacity>
      </View>
  );
}

const mapStateToProps = (state) => ({
  selectedItems: state.selectedItems,
});

const mapDispatchToProps = {
  addItem,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5F2',
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
  pesanSekarangButton: {
    backgroundColor: '#8B6E49', 
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 20,
    alignItems: 'center', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);

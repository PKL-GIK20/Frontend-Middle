import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

function OrderSummary({ route }) {
  const { selectedItems } = route.params;
  const [items, setItems] = useState(selectedItems);
  const [removedItemIds, setRemovedItemIds] = useState([]);

  const handleItemDelivered = (itemId) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, delivered: true } : item
    );
    setItems(updatedItems);
    setRemovedItemIds([...removedItemIds, itemId]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(items.filter((item) => !removedItemIds.includes(item.id)));
    }, 3000);

    return () => clearTimeout(timer);
  }, [removedItemIds]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ringkasan Pesanan</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
              {item.delivered ? (
                <Text style={styles.statusTextDelivered}>Sudah Diantar</Text>
              ) : (
                <TouchableOpacity onPress={() => handleItemDelivered(item.id)}>
                  <Text style={styles.checkmarkText}>Belum Diantar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5F2',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#8B6E49',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  itemImage: {
    width: 70,
    height: 70,
    marginRight: 15,
    borderRadius: 5,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantityText: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  checkmarkText: {
    fontSize: 16,
    color: '#FF5733',
    marginTop: 5,
    fontWeight: 'bold',
  },
  statusTextDelivered: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 5,
    fontWeight: 'bold',
  },
});

export default OrderSummary;

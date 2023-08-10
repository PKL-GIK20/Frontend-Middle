import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

function OrderSummary({ route }) {
  const { selectedItems } = route.params;

  const calculateTotal = () => {
    const total = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return total.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ringkasan Pesanan</Text>
      <FlatList
        data={selectedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Rp.{(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          </View>
        )}
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
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 5,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    alignSelf: 'flex-end',
  },
});

export default OrderSummary;

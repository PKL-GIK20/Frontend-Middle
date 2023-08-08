import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

function OrderSummary({ route }) {
  const { selectedItems } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ringkasan Pesanan</Text>
      <FlatList
        data={selectedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Image source={item.image} style={styles.image} />
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text>Rp.{item.price.toFixed(2)}</Text>
            </View>
          </View>
        )}
      />
      <Text style={styles.total}>Total: Rp.{calculateTotal(selectedItems)}</Text>
    </View>
  );
}

const calculateTotal = (items) => {
  const total = items.reduce((acc, item) => acc + item.price, 0);
  return total.toFixed(2);
};

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
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 8,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 8,
  },
  itemName: {
    fontSize: 16,
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

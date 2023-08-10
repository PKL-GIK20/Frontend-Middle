import React, { useState } from 'react';
import { View, Text, FlatList, Button, TextInput, Image, StyleSheet } from 'react-native';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState('');

  const addProduct = () => {
    if (newProduct.trim() !== '' && newDescription.trim() !== '' && newPrice.trim() !== '' !== '') {
      const product = {
        id: products.length + 1,
        name: newProduct,
        description: newDescription,
        price: parseFloat(newPrice),
        image: require('../assets/menu/icon-drink.jpg'),
        quantity: 0,
      };
      setProducts([...products, product]);
      setNewProduct('');
      setNewDescription('');
      setNewPrice('');
    }
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter((item) => item.id !== productId);
    setProducts(updatedProducts);
  };

  return (
    <View style={styles.container}>
    <Text style={styles.label}>Product Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter product name"
        value={newProduct}
        onChangeText={(text) => setNewProduct(text)}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={newDescription}
        onChangeText={(text) => setNewDescription(text)}
      />
      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        value={newPrice}
        onChangeText={(text) => setNewPrice(text)}
      />
      <Button title="Add Product" onPress={addProduct} />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productText}>{item.description}</Text>
              <Text style={styles.productText}>Rp.{item.price.toFixed(2)}</Text>
            </View>
            <Button title="Delete" onPress={() => deleteProduct(item.id)} />
          </View>
        )}
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
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
  productText: {
    fontSize: 14,
    color: '#555',
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 10,
  }
});

export default ProductManagement;

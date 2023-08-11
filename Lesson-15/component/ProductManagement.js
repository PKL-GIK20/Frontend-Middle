import React, { useState } from 'react';
import { View, Text, FlatList, Button, TextInput, Image, StyleSheet,TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [viewType, setViewType] = useState('list');
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');


  const toggleViewType = () => {
    setViewType(viewType === 'list' ? 'grid' : 'list');
  };

  const renderGridProductItem = ({ item }) => (
    <View style={styles.productGridItem}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productText}>{item.description}</Text>
        <Text style={styles.productText}>Rp.{item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteProduct(item.id)}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
    </View>
  );

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productText}>{item.description}</Text>
        <Text style={styles.productText}>Rp.{item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteProduct(item.id)}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
    </View>
  );

  const addProduct = async () => {
    setNameError('');
    setDescriptionError('');
    setPriceError('');

    if (newProduct.trim() === '') {
      setNameError('Product name is required');
    }
    if (newDescription.trim() === '') {
      setDescriptionError('Description is required');
    }
    if (newPrice.trim() === '') {
      setPriceError('Price is required');
    }

    if (newProduct.trim() !== '' && newDescription.trim() !== '' && newPrice.trim() !== '') {
      setIsLoading(true); // Memulai loading indicator

      try {
        const product = {
          id: products.length + 1,
          name: newProduct,
          description: newDescription,
          price: parseFloat(newPrice),
          image: require('../assets/menu/icon-drink.jpg'),
          quantity: 0,
        };

        // Simulasi penundaan pemrosesan
        await new Promise(resolve => setTimeout(resolve, 1000));

        setProducts([...products, product]);
        setNewProduct('');
        setNewDescription('');
        setNewPrice('');
      } catch (error) {
        console.error('Error adding product:', error);
      } finally {
        setIsLoading(false); // Menghentikan loading indicator
      }
    }
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter((item) => item.id !== productId);
    setProducts(updatedProducts);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.viewToggleButton} onPress={toggleViewType}>
        <Icon name={viewType === 'list' ? 'grid' : 'view-list'} size={24} color="blue" />
      </TouchableOpacity>
      <Text style={styles.label}>Product Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter product name"
        value={newProduct}
        onChangeText={(text) => setNewProduct(text)}
      />
      {Boolean(nameError) && <Text style={styles.errorText}>{nameError}</Text>}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={newDescription}
        onChangeText={(text) => setNewDescription(text)}
      />
      {Boolean(descriptionError) && <Text style={styles.errorText}>{descriptionError}</Text>}
      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        value={newPrice}
        onChangeText={(text) => setNewPrice(text)}
      />
      {Boolean(priceError) && <Text style={styles.errorText}>{priceError}</Text>}
      <Button title="Add Product" onPress={addProduct} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
      ) : viewType === 'list' ? (
        <FlatList
          key={'list-'}
          data={products}
          keyExtractor={(item) => 'list-' + item.id.toString()}
          renderItem={renderProductItem}
        />
      ) : (
        <FlatList
          key={'grid-'}
          data={products}
          keyExtractor={(item) => 'grid-' + item.id.toString()}
          numColumns={2}
          renderItem={renderGridProductItem}
        />
      )}
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
  deleteButton: {
    backgroundColor: 'red', 
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
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
  },
  viewToggleButton: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
  },
  viewToggleText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  productGridItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
});

export default ProductManagement;

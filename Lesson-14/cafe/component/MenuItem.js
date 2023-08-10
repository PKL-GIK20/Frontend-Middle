import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';

function MenuItem({ id, name, description, price, image, quantity, onQuantityChange, onAddToCart, onDeleteItem }) {
  const [quantityValue] = useState(new Animated.Value(quantity));

  const increaseQuantity = () => {
    const newValue = quantity + 1;
    onQuantityChange(newValue);

    // Animasikan perubahan quantity menggunakan Animated.timing
    Animated.timing(quantityValue, {
      toValue: newValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      const newValue = quantity - 1;
      onQuantityChange(newValue);

      // Animasikan perubahan quantity menggunakan Animated.timing
      Animated.timing(quantityValue, {
        toValue: newValue,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>Rp.{price.toFixed(2)}</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Animated.Text style={[styles.quantityValue, { opacity: quantityValue }]}>
          {quantity}
        </Animated.Text>
        <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  selectedContainer: {
    backgroundColor: '#e0f0ff',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  quantityValue: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default MenuItem;
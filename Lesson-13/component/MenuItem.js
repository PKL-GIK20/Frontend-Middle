import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

function MenuItem({ id, name, description, price, image, isSelected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.container, isSelected ? styles.selectedContainer : null]}
      onPress={onPress}
    >
      <Image source={image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>Rp.{price}</Text>
      </View>
    </TouchableOpacity>
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
});

export default MenuItem;

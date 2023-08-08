import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  const navigateToShoppingList = () => {
    navigation.navigate('ShoppingList');
  };

  const navigateToAbout = () => {
    navigation.navigate('About');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Selamat Datang di Way's Chick</Text>
      <Text style={styles.subtitle}>Restaurant Ayam </Text>
      <TouchableOpacity style={styles.button} onPress={navigateToShoppingList}>
        <Text style={styles.buttonText}>Lihat Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToAbout}>
        <Text style={styles.buttonText}>Tentang Kami</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#777',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

import {React, useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated, Easing } from 'react-native';



function HomeScreen({ navigation }) {
  const navigateToShoppingList = () => {
    navigation.navigate('ShoppingList');
  };

  const navigateToAbout = () => {
    navigation.navigate('About');
  };

  // Membuat nilai animasi dengan nilai awal 0
  const value = new Animated.Value(0);

  // Menjalankan animasi timing dengan durasi 2 detik dan fungsi easing linear
  useEffect(() => {
    Animated.timing(value, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
    }).start();
  }, []);


  return (
    <View style={styles.container}>
       <Animated.Image source={require('../assets/logo.png')} style={[styles.logo, {opacity: value}]} />
      <Text style={styles.title}>Infinity Cafe</Text>
      <Text style={styles.subtitle}> Non Coffee & Coffee</Text>
      <TouchableOpacity
        style={[styles.button, styles.menuButton]}
        onPress={navigateToShoppingList}
      >
        <Text style={[styles.buttonText, styles.menuButtonText]}>Lihat Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.aboutButton]}
        onPress={navigateToAbout}
      >
        <Text style={[styles.buttonText, styles.aboutButtonText]}>Tentang Kami</Text>
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
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuButton: {
    backgroundColor: '#3498db',
  },
  menuButtonText: {
    color: 'white',
  },
  aboutButton: {
    backgroundColor: '#27ae60',
  },
  aboutButtonText: {
    color: 'white',
  },
});

export default HomeScreen;

import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet, Animated } from 'react-native';
import { useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const navigateToShoppingList = () => {
    navigation.navigate('ShoppingList');
  };

  const navigateToAbout = () => {
    navigation.navigate('About');
  };

  const [loaded] = useFonts({
    Pacifico: Pacifico_400Regular,
  });

  if (!loaded) {
    return null;
  }

  return (
    <ImageBackground
      source={require('../assets/bar.webp')}
      style={styles.backgroundImage}
    >
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Infinity Cafe</Text>
        <Text style={styles.subtitle}>Non Coffee & Coffee</Text>
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
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Pacifico',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  subtitle: {
    fontFamily: 'Pacifico',
    fontSize: 20,
    color: 'white',
    marginBottom: 250,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuButton: {
    backgroundColor: '#784A25',
    marginVertical: 10,
  },
  menuButtonText: {
    color: 'white',  
  },
  aboutButton: {
    backgroundColor: '#D1A054',
  },
  aboutButtonText: {
    color: 'white',
  },
});

export default HomeScreen;

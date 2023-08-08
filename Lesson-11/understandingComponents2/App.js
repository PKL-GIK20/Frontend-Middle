import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';

const App = () => {
  const handleButtonPress = () => {
    alert('Tombol ditekan!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contoh Aplikasi dengan Komponen</Text>
      <CustomButton title="Tekan Saya" onPress={handleButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;

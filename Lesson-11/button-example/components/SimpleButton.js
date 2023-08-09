import React from 'react';
import {Button, View, SafeAreaView} from 'react-native';

const SimpleButton = () => {
  // Fungsi yang akan dieksekusi ketika tombol ditekan
  const handlePress = () => {
    alert('Anda menekan tombol!');
  };

  return (
    <SafeAreaView>
      <View>
        {/* Membuat sebuah komponen Button dengan judul "Tekan Saya" dan onPress handler */}
        <Button title="Tekan Saya" onPress={handlePress} />
      </View>
    </SafeAreaView>
  );
};

export default SimpleButton;

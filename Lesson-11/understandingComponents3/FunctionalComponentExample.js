import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FunctionalComponentExample = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ini adalah contoh Functional Component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default FunctionalComponentExample;

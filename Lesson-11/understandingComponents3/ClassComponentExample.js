import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ClassComponentExample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Ini adalah contoh Class Component</Text>
      </View>
    );
  }
}

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

export default ClassComponentExample;

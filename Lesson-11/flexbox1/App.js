import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Text style={styles.text}>Box 1</Text>
      </View>
      <View style={styles.box2}>
        <Text style={styles.text}>Box 2</Text>
      </View>
      <View style={styles.box3}>
        <Text style={styles.text}>Box 3</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  box1: {
    flex: 1,
    width: 100,
    height: 100,
    backgroundColor: '#f00',
    margin: 10,
  },
  box2: {
    flex: 2,
    width: 100,
    height: 100,
    backgroundColor: '#0f0',
    margin: 10,
  },
  box3: {
    flex: 3,
    width: 100,
    height: 100,
    backgroundColor: '#00f',
    margin: 10,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;

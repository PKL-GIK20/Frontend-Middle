import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';

const TouchableButton = () => {
  const handlePress = () => {
    alert('Button pressed!');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>TouchableOpacity</Text>
      </TouchableOpacity>
      <TouchableHighlight onPress={handlePress} style={styles.button} underlayColor="yellow">
        <Text style={styles.buttonText}>TouchableHighlight</Text>
      </TouchableHighlight>
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableNativeFeedback onPress={handlePress} background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>TouchableNativeFeedback</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 50,
    margin: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default TouchableButton;

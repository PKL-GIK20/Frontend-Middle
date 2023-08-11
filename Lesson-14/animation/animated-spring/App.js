import React, { useState } from 'react';
import { StyleSheet, View, Button, Animated } from 'react-native';

export default function App() {
  const [moveValue] = useState(new Animated.Value(0));

  const moveBox = () => {
    Animated.spring(moveValue, {
      toValue: 200,
      speed: 20,
      bounciness: 15,
      useNativeDriver: true,
    }).start();
  };

  const resetBox = () => {
    Animated.spring(moveValue, {
      toValue: 0,
      speed: 20,
      bounciness: 15,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Button title="Move Box" onPress={moveBox} />
      <Button title="Reset Box" onPress={resetBox} />
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{ translateX: moveValue }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});

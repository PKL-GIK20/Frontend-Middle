import React, { useRef } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Text } from 'react-native';

const App = () => {
  const rubberValue = useRef(new Animated.Value(1)).current;

  const startRubberAnimation = () => {
    Animated.spring(rubberValue, {
      toValue: 1.2,
      friction: 2,
      tension: 60,
      useNativeDriver: false,
    }).start(() => {
      Animated.spring(rubberValue, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: false,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={startRubberAnimation}>
        <Animated.View style={[styles.rubberBand, { transform: [{ scale: rubberValue }] }]}>
          <Text style={styles.buttonText}>Rubber Band</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  rubberBand: {
    width: 200,
    height: 60,
    backgroundColor: 'blue',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;

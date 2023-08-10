import React from 'react';
import { View, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Box = () => {
  return (
    <View
      style={{
        width: width * 0.5,
        height: height * 0.2,
        backgroundColor: 'blue',
      }}
    />
  );
};

export default Box;

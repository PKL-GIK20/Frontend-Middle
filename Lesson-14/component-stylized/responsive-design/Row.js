import React from 'react';
import { View } from 'react-native';

const Row = () => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flex: 1, backgroundColor: 'red' }} />
      <View style={{ flex: 1, backgroundColor: 'green' }} />
      <View style={{ flex: 1, backgroundColor: 'blue' }} />
    </View>
  );
};

export default Row;

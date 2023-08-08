import React from 'react';
import { View } from 'react-native';
import FunctionalComponentExample from './FunctionalComponentExample';
import ClassComponentExample from './ClassComponentExample';

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <FunctionalComponentExample />
      <ClassComponentExample />
    </View>
  );
};

export default App;

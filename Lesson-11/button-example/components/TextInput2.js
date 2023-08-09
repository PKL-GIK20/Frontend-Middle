import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function TextInput2() {
  const [value, onChangeText] = React.useState('Useless Multiline Placeholder');

  return (
    <View style={styles.container}>
      <View style={{borderColor: 'gray', borderWidth: 1}}>
        <TextInput
          style={{ height: 100}}
          onChangeText={text => onChangeText(text)}
          value={value}
          multiline
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

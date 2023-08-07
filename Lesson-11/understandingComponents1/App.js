import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Data dummy daftar kontak
const dummyData = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Bob Johnson' },
  { id: '4', name: 'Alice Brown' },
  { id: '5', name: 'Mike Davis' },
];

// Komponen untuk menampilkan setiap item dalam daftar kontak
const ContactItem = ({ name }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{name}</Text>
    </View>
  );
};

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Daftar Kontak</Text>
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ContactItem name={item.name} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
});

export default App;

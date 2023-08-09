import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, FlatList } from 'react-native';

export default function App() {
  const [date, setDate] = useState('');
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);

  const handleAddEntry = () => {
    if (date && entry) {
      setEntries([...entries, { date, entry }]);
      setEntry('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Diary</Text>
      <Image style={styles.image} source={require('./assets/totoro.jpg')} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tanggal"
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Apa yang kamu rasakan?"
          value={entry}
          onChangeText={setEntry}
          multiline
        />
        <Button style={styles.button} title="Tambah" onPress={handleAddEntry} />
      </View>
      <FlatList
        style={styles.list}
        data={entries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.entryContainer}>
            <Text style={styles.entryDate}>{item.date}</Text>
            <Text style={styles.entryText}>{item.entry}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    margin: 10,
  },
  inputContainer: {
    flexDirection: 'column',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  button: {
    padding: 10,
    margin: 10,
  },
  list: {
    flex: 1,
    marginTop: 10,
  },
  entryContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  entryDate: {
    fontWeight: 'bold',
    color: '#333',
  },
  entryText: {
    color: '#333',
  },
});

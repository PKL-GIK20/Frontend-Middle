import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';

const FetchJoke = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any');
      const data = await response.json();
      if (data.error) {
        throw new Error(data.message);
      }
      if (data.type === 'single') {
        setJoke(data.joke);
      } else {
        setJoke(`${data.setup}\n\n${data.delivery}`);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={{ color: 'red' }}>{error}</Text>
      ) : (
        <Text style={{ fontSize: 18 }}>{joke}</Text>
      )}
      <Button title="Fetch another joke" onPress={fetchJoke} />
    </View>
  );
};

export default FetchJoke;

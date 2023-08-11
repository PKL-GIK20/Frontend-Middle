import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import StarRating from 'react-native-star-rating';

function AboutScreen({ navigation }) {
  const [rating, setRating] = useState(0);
  const onStarRatingPress = (rating) => {
    setRating(rating); 
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/TNI.jpg')} style={styles.image} />
      <Text style={styles.title}>Tentang Kami</Text>
      <Text style={styles.description}>Restoran yang berdiri sejak 2023, menyajikan hidangan ayam yang lezat.</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Rating: </Text>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={rating}
          selectedStar={(rating) => onStarRatingPress(rating)}
          starSize={20}
          fullStarColor="#f39c12"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 18,
    marginRight: 10,
  },
});

export default AboutScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native';
import StarRating from 'react-native-star-rating';
import ImagePicker from 'react-native-image-picker';

function AboutScreen({ navigation }) {
  const [rating, setRating] = useState(0);
  const [imageUri, setImageUri] = useState(null);

  const onStarRatingPress = (rating) => {
    setRating(rating);
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission to take pictures.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          launchCamera();
        } else {
          console.log('Camera permission denied');
        }
      } catch (error) {
        console.error('Error requesting camera permission:', error);
      }
    } else {
      launchCamera();
    }
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        console.log(Platform.OS)
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Gallery Permission',
            message: 'App needs gallery permission to access photos.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }
        );
        launchImageLibrary();
        console.log(granted)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        } else {
          console.log('Gallery permission denied');
        }
      } catch (error) {
        console.error('Error requesting gallery permission:', error);
      }
    } else {
      launchImageLibrary();
    }
  };

  const launchCamera = () => {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
      },
      (response) => {
        if (!response.didCancel && !response.error) {
          setImageUri(response.uri);
        }
      }
    );
  };

  const launchImageLibrary = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
      },
      (response) => {
        console.log(response);
        if (!response.didCancel && !response.error) {
          setImageUri(response.uri);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={requestCameraPermission}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={requestGalleryPermission}>
        <Text style={styles.buttonText}>Pilih Gambar</Text>
      </TouchableOpacity>
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
  buttonText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
});

export default AboutScreen;

import React from 'react';
import { StyleSheet, Text, View, PanResponder } from 'react-native';

export default function GestureRespondedSystem() {
  // Membuat objek PanResponder untuk menangani gestur
  const panResponder = React.useRef(
    PanResponder.create({
      // Menentukan apakah view ini akan menjadi responder saat gestur dimulai
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      // Menentukan apakah view ini akan menjadi responder saat gestur bergerak
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      // Memberikan feedback visual saat view ini menjadi responder
      onPanResponderGrant: (evt, gestureState) => {
        circle.current.setNativeProps({
          backgroundColor: 'green',
        });
      },
      // Mengubah posisi view sesuai dengan gerakan pengguna
      onPanResponderMove: (evt, gestureState) => {
        circle.current.setNativeProps({
          top: gestureState.moveY - 50,
          left: gestureState.moveX - 50,
        });
      },
      // Mengembalikan warna view saat gestur selesai
      onPanResponderRelease: (evt, gestureState) => {
        circle.current.setNativeProps({
          backgroundColor: 'blue',
        });
      },
      // Mengembalikan warna dan posisi view saat gestur dibatalkan
      onPanResponderTerminate: (evt, gestureState) => {
        circle.current.setNativeProps({
          backgroundColor: 'blue',
          top: 0,
          left: 0,
        });
      },
    })
  ).current;

  // Membuat ref untuk mengakses elemen native view
  const circle = React.useRef(null);

  return (
    <View style={styles.container}>
      <View
        ref={circle}
        style={styles.circle}
        // Menghubungkan objek PanResponder dengan view ini
        {...panResponder.panHandlers}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'blue',
    position: 'absolute',
  },
});

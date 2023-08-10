//Untuk menjalankan CSS in JS
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { lightTheme, darkTheme } from './css-in-js/theme.js';
import { Container, Title, Text, Button, ButtonText, Image } from './css-in-js/styled.js';

const App = () => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>Styled App</Title>
        <Text>Ini adalah aplikasi sederhana yang menggunakan styled components dan CSS-in-JS di React Native.</Text>
        <Button onPress={toggleTheme}>
          <ButtonText>Ubah Tema</ButtonText>
        </Button>
        <Image source={require('./assets/splash.png')} width={100} height={100} />
      </Container>
    </ThemeProvider>
  );
};

export default App;


//Untuk menjalankan Custom Styling Solutions
// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import Card from './components/Card.js';

// const App = () => {
//   return (
//     <View style={styles.container}>
//       <Card title="Judul Kartu 1" content="Isi konten kartu 1." />
//       <Card title="Judul Kartu 2" content="Isi konten kartu 2." />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
// });

// export default App;




// Untuk menjalankan subtopik ComponentStylized
// import ComponentStylized1 from './components/ComponentStylized1';

// export default function App() {
//   return (
//     <ComponentStylized1 />
//   );
// }
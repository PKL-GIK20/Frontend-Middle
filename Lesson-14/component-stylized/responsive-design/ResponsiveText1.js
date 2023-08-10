import React from 'react';
import { Text } from 'react-native';
import { useMediaQuery } from 'react-native-media-queries';

const ResponsiveText1 = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 400 });

  return (
    <Text style={{ fontSize: isSmallScreen ? 12 : 24 }}>
      Ini adalah teks responsif
    </Text>
  );
};

export default ResponsiveText1;

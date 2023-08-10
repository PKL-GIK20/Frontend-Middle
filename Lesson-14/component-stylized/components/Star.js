import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const Star = () => {
  const [angle] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(angle, {
        toValue: 360,
        duration: 3000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = angle.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <Svg height="100" width="100" viewBox="0 0 100 100">
        <Path
          fill="yellow"
          stroke="black"
          strokeWidth="2"
          d="M50 0 L65 35 L100 35 L75 60 L85 100 L50 75 L15 100 L25 60 L0 35 L35 35 Z"
        />
      </Svg>
    </Animated.View>
  );
};

export default Star;

import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const RNGradient = ({ children, colors, style, start, end, ...rest }) => {
  return (
    <LinearGradient
      colors={colors}
      start={start || { x: 0, y: 1 }}
      end={end || { x: 0, y: 0 }}
      style={style}
      {...rest}>
      {children}
    </LinearGradient>
  );
};

export default RNGradient;

import React from 'react';
import { Image } from 'react-native';
import RNStyles from './RNStyles';

const RNImage = ({ source, resizeMode, style, ...rest }) => {
  return (
    <Image
      source={source}
      resizeMode={resizeMode || 'contain'}
      style={[RNStyles.image100, style]}
      {...rest}
    />
  );
};

export default RNImage;

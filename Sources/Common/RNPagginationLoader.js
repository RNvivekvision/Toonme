import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Colors, hp } from '../Theme';
const RNPagginationLoader = ({ size, color, style }) => {
  return (
    <View style={[{ paddingVertical: hp(2) }, style]}>
      <ActivityIndicator
        size={size || 'large'}
        color={color || Colors.Primary}
      />
    </View>
  );
};
export default RNPagginationLoader;

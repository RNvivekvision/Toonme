import React from 'react';
import { StatusBar, View } from 'react-native';
import { Colors } from '../Theme';
import RNStyles from './RNStyles';
import RNLoader from './RNLoader';
import { useInset } from '../Hooks';

const RNContainer = ({ style, children, isLoading, useSafeArea }) => {
  const inset = useInset();

  return (
    <View
      style={[
        RNStyles.container,
        style,
        useSafeArea && { paddingBottom: inset.bottom },
      ]}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={Colors.Transparent}
      />
      <RNLoader visible={isLoading} />
      {children}
    </View>
  );
};

export default RNContainer;

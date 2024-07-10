import React, { useEffect, useState } from 'react';
import Reanimated, { SlideInUp, SlideOutUp } from 'react-native-reanimated';
import { StatusBar, StyleSheet } from 'react-native';
import { addEventListener } from '@react-native-community/netinfo';
import { Colors, FontFamily, hp, wp } from '../Theme';
import { useInset } from '../Hooks';
import RNText from './RNText';

const RNNoInternet = () => {
  const [State, setState] = useState({ hasInternet: null });
  const styles = useStyles();

  useEffect(() => {
    const unsubscribe = addEventListener(s => {
      setState(p => ({ ...p, hasInternet: s.isConnected }));
    });

    return unsubscribe;
  }, []);

  if (State.hasInternet === null) return null;
  return (
    !State.hasInternet && (
      <Reanimated.View
        entering={SlideInUp.duration(500)}
        exiting={SlideOutUp.delay(1000).duration(500)}
        style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <RNText style={styles.text}>
          {State.hasInternet ? 'Back Online' : 'No Internet Connection'}
        </RNText>
      </Reanimated.View>
    )
  );
};

const useStyles = () => {
  const inset = useInset();
  return StyleSheet.create({
    container: {
      paddingTop: inset.top + hp(2),
      paddingVertical: hp(2),
      paddingHorizontal: wp(4),
      backgroundColor: Colors.error,
      position: 'absolute',
      zIndex: 1,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    text: {
      color: Colors.White,
      fontFamily: FontFamily.Medium,
    },
  });
};

export default RNNoInternet;

import React, { useEffect } from 'react';
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { RNImage } from '../../Common';
import { Images } from '../../Constants';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { hp, wp } from '../../Theme';
import { useNavigation } from '@react-navigation/native';
import { NavRoutes } from '../../Navigation';
import { useUserClick } from '../../Hooks';

const BouncyCard = ({ containerStyle }) => {
  const bounce = useSharedValue(0.8);
  const { navigate } = useNavigation();
  const { incrementCount } = useUserClick();

  useEffect(() => {
    bounce.value = withRepeat(withTiming(1, { duration: 500 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: bounce.value }],
    };
  });

  const onPress = async () => {
    await incrementCount();
    navigate(NavRoutes.HotFeature);
  };

  return (
    <Reanimated.View style={[styles.container, containerStyle, animatedStyle]}>
      <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
        <RNImage source={Images.card} style={styles.img} />
      </TouchableOpacity>
    </Reanimated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(17),
    marginVertical: hp(1),
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  img: {
    resizeMode: 'cover',
    width: '95%',
    alignSelf: 'center',
    borderRadius: wp(4),
  },
});

export default BouncyCard;

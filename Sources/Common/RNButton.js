import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors, FontFamily, hp, wp } from '../Theme';
import RNPagginationLoader from './RNPagginationLoader';
import RNStyles from './RNStyles';
import RNText from './RNText';
import RNImage from './RNImage';
import { Images } from '../Constants';

const RNButton = ({
  title,
  style,
  textStyle,
  onPress,
  disable,
  icon,
  iconStyle,
  isLoading,
  doubleTicks = true,
}) => {
  const styles = useStyles({ disable });

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      disabled={disable}
      style={[styles.Container, style]}>
      {isLoading ? (
        <RNPagginationLoader size={'small'} color={Colors.White} />
      ) : (
        <>
          {icon && <RNImage source={icon} style={[styles.icon, iconStyle]} />}
          <View style={RNStyles.flexRowBetween}>
            <RNText style={[styles.buttonText, textStyle]}>{title}</RNText>
            {doubleTicks && (
              <RNImage source={Images.doubleTicks} style={styles.doubleTicks} />
            )}
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const iconSize = wp(6);
const useStyles = ({ disable }) => {
  return StyleSheet.create({
    Container: {
      ...RNStyles.center,
      ...RNStyles.flexRow,
      backgroundColor: disable ? Colors.Placeholder : Colors.Primary,
      paddingVertical: hp(2.5),
      paddingHorizontal: wp(4),
      marginHorizontal: wp(6),
      marginVertical: hp(1),
      borderRadius: wp(4),
    },
    buttonText: {
      flex: 1,
      fontFamily: FontFamily.SemiBold,
      color: Colors.Black,
      textAlign: 'center',
    },
    icon: {
      width: iconSize,
      height: iconSize,
      marginRight: wp(2),
    },
    doubleTicks: {
      ...RNStyles.icon,
    },
  });
};

export default RNButton;

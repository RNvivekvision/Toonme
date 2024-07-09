import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RNIcon, RNStyles, RNText, RNScrollView } from './index';
import { useInset } from '../Hooks';
import { Colors, FontFamily, FontSize, hp, wp } from '../Theme';
import { Images, Strings } from '../Constants';

const RNHeader = ({
  title,
  scrollProps,
  containerStyle,
  titleStyle,
  children,
  style,
  footer,
  noScroll,
  back,
  onSkipPress,
}) => {
  const navigation = useNavigation();
  const styles = useStyles();

  const onBackPress = async () => {
    navigation.goBack();
  };

  const skip = async () => {
    onSkipPress?.();
  };

  return (
    <View style={RNStyles.container}>
      <View style={[styles.Container, containerStyle]}>
        {back && (
          <RNIcon
            icon={Images.back}
            onPress={onBackPress}
            containerStyle={styles.icon}
          />
        )}
        <RNText style={[styles.title, titleStyle]}>{title}</RNText>
        {!onSkipPress && <View style={styles.icon} />}
        {onSkipPress && (
          <TouchableOpacity onPress={skip} style={styles.next}>
            <RNText family={FontFamily.Medium} size={FontSize.font14}>
              {Strings.Skip}
            </RNText>
          </TouchableOpacity>
        )}
      </View>
      {noScroll ? (
        children
      ) : (
        <RNScrollView style={style} scrollProps={scrollProps}>
          {children}
        </RNScrollView>
      )}
      {footer && <View style={styles.footer}>{footer}</View>}
    </View>
  );
};

const useStyles = () => {
  const inset = useInset();

  return StyleSheet.create({
    footer: {
      paddingBottom: inset.bottom,
    },
    Container: {
      ...RNStyles.flexRowBetween,
      backgroundColor: Colors.White,
      paddingHorizontal: wp(4),
      paddingTop: inset.top + hp(2),
      paddingVertical: hp(2),
    },
    icon: {
      ...RNStyles.center,
      width: size.iconContainer,
      height: size.iconContainer,
      borderRadius: wp(2),
      backgroundColor: Colors.White + '20',
    },
    title: {
      flex: 1,
      paddingHorizontal: hp(1),
      marginHorizontal: hp(1),
      fontSize: FontSize.font18,
      fontFamily: FontFamily.Medium,
      color: Colors.Black,
      textAlign: 'center',
    },
    next: {
      borderRadius: wp(2),
      backgroundColor: Colors.White + '20',
      paddingHorizontal: wp(3),
      paddingVertical: hp(1),
    },
  });
};

const size = { icon: wp(4), iconContainer: wp(7) };

export default RNHeader;

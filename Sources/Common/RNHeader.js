import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RNIcon, RNStyles, RNText, RNScrollView } from './index';
import { useInset, useUserClick } from '../Hooks';
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
  onSettigPress,
  onSharePress,
  onNextPress,
}) => {
  const { incrementCount } = useUserClick();
  const navigation = useNavigation();
  const styles = useStyles();

  const onBackPress = async () => {
    await incrementCount();
    navigation.goBack();
  };

  const share = async () => {
    await incrementCount();
    onSharePress?.();
  };

  const setting = async () => {
    await incrementCount();
    onSettigPress?.();
  };

  const next = async () => {
    await incrementCount();
    onNextPress?.();
  };

  return (
    <View style={RNStyles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={[styles.Container, containerStyle]}>
        {back && (
          <RNIcon
            icon={Images.back}
            onPress={onBackPress}
            containerStyle={styles.icon}
          />
        )}
        <RNText style={[styles.title, titleStyle]}>{title}</RNText>
        {onSharePress && (
          <RNIcon
            icon={Images.setting_8}
            iconStyle={{ tintColor: Colors.White }}
            onPress={share}
            containerStyle={[styles.icon, { marginRight: wp(4) }]}
          />
        )}
        {onSettigPress && (
          <RNIcon
            icon={Images.settingHeader}
            onPress={setting}
            containerStyle={styles.icon}
          />
        )}
        {onNextPress && (
          <TouchableOpacity onPress={next} style={styles.next}>
            <RNText
              color={Colors.White}
              family={FontFamily.SemiBold}
              size={FontSize.font12}>
              {Strings.Next}
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
      backgroundColor: Colors.Primary,
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
      paddingHorizontal: hp(1),
      marginHorizontal: hp(1),
      fontSize: FontSize.font18,
      fontFamily: FontFamily.Medium,
      color: Colors.White,
      flex: 1,
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

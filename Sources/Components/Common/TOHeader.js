import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RNIcon, RNStyles, RNText, RNScrollView } from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { togglePlans } from '../../Redux/Actions';
import { useInset, useUserClick } from '../../Hooks';
import { Images } from '../../Constants';

const TOHeader = ({
  title,
  titleStyle,
  children,
  style,
  containerStyle,
  noScroll,
  scrollProps,
}) => {
  const navigation = useNavigation();
  const { incrementCount } = useUserClick();
  const { subscriptionPurchase } = useSelector(
    ({ UserReducer }) => UserReducer,
  );
  const dispatch = useDispatch();
  const styles = useStyles();

  const onDrawerPress = async () => {
    await incrementCount();
    navigation.openDrawer();
  };

  const onCrownPress = () => {
    dispatch(togglePlans());
  };

  return (
    <View style={RNStyles.container}>
      <View style={[styles.Container, containerStyle]}>
        <RNIcon
          icon={Images.drawer}
          onPress={onDrawerPress}
          containerStyle={styles.iconContainer}
          iconStyle={styles.icon}
        />
        <RNText style={[styles.title, titleStyle]}>{title}</RNText>
        {/* {!subscriptionPurchase && (
          <RNIcon
            icon={Images.crown}
            onPress={onCrownPress}
            containerStyle={styles.iconContainer}
            iconStyle={styles.icon}
          />
        )} */}
      </View>
      {noScroll ? (
        children
      ) : (
        <RNScrollView style={style} scrollProps={scrollProps}>
          {children}
        </RNScrollView>
      )}
    </View>
  );
};

const useStyles = () => {
  const inset = useInset();

  return StyleSheet.create({
    Container: {
      ...RNStyles.flexRowBetween,
      backgroundColor: Colors.White,
      paddingHorizontal: wp(4),
      paddingTop: inset.top + hp(2),
      paddingVertical: hp(2),
    },
    iconContainer: {
      ...RNStyles.center,
      width: size.iconContainer,
      height: size.iconContainer,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: Colors.Primary,
      backgroundColor: Colors.White,
    },
    icon: {
      width: '40%',
      height: '40%',
    },
    title: {
      flex: 1,
      paddingHorizontal: hp(1),
      marginHorizontal: hp(1),
      fontSize: FontSize.font18,
      fontFamily: FontFamily.Medium,
      color: Colors.Black,
    },
    next: {
      borderRadius: wp(2),
      backgroundColor: Colors.White + '20',
      paddingHorizontal: wp(3),
      paddingVertical: hp(1),
    },
  });
};

const size = { icon: wp(4), iconContainer: wp(10) };

export default TOHeader;

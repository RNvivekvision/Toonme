import { StyleSheet, TouchableOpacity } from 'react-native';
import Reanimated, { BounceInRight } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { RNImage, RNStyles, RNText } from '../../Common';
import { Images } from '../../Constants';
import { NavRoutes } from '../../Navigation';

const HowToUse = () => {
  const { navigate } = useNavigation();

  return (
    <Reanimated.View
      entering={BounceInRight.delay(100)}
      style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => navigate(NavRoutes.Steps)}
        style={styles.button}>
        <RNImage source={Images.howToUse} style={RNStyles.icon} />
        <RNText
          pLeft={wp(3)}
          size={FontSize.font14}
          family={FontFamily.SemiBold}>
          {'How To Use'}
        </RNText>
      </TouchableOpacity>
    </Reanimated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.shadow,
    backgroundColor: Colors.howToUse,
    position: 'absolute',
    bottom: hp(25),
    right: -wp(1),
    borderWidth: wp(0.5),
    borderColor: Colors.White,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  button: {
    ...RNStyles.flexRow,
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
});

export default HowToUse;

import { StyleSheet, View } from 'react-native';
import { RNButton, RNContainer, RNImage, RNStyles, RNText } from '../Common';
import { Images, Strings } from '../Constants';
import { FontFamily, FontSize, hp, wp } from '../Theme';
import { NativeAd } from '../Components';
import { useInset } from '../Hooks';
import { NavRoutes } from '../Navigation';

const Onboarding = ({ navigation }) => {
  const styles = useStyles();

  const onContinuePress = () => {
    navigation.navigate(NavRoutes.Permissions);
  };

  return (
    <RNContainer style={styles.container}>
      <View style={RNStyles.container}>
        <View style={styles.imgContainer}>
          <RNImage
            source={Images.onboardingBackground}
            style={RNStyles.image100}
          />
          <RNImage source={Images.onboarding_0} style={styles.onboarding_0} />
        </View>
        <RNText style={styles.title}>{Strings.welcomeDescr}</RNText>
        <RNButton title={Strings.Continue} onPress={onContinuePress} />
      </View>
      <NativeAd />
    </RNContainer>
  );
};

const size = wp(40);
const useStyles = () => {
  const inset = useInset();
  return StyleSheet.create({
    container: {
      paddingBottom: inset.bottom,
    },
    imgContainer: {
      width: wp(80),
      height: hp(50),
      alignSelf: 'center',
    },
    onboarding_0: {
      width: size,
      height: size * 1.5,
      position: 'absolute',
      bottom: 0,
      alignSelf: 'center',
    },
    title: {
      fontSize: FontSize.font20,
      fontFamily: FontFamily.SemiBold,
      textAlign: 'center',
      paddingVertical: hp(3),
    },
  });
};

export default Onboarding;

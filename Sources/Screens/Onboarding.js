import { StyleSheet, View } from 'react-native';
import { RNButton, RNContainer, RNImage, RNStyles, RNText } from '../Common';
import { Images } from '../Constants';
import { FontFamily, FontSize, hp, wp } from '../Theme';

const Onboarding = () => {
  return (
    <RNContainer>
      <View style={styles.imgContainer}>
        <RNImage
          source={Images.onboardingBackground}
          style={RNStyles.image100}
        />
        <RNImage source={Images.onboarding_0} style={styles.onboarding_0} />
      </View>

      <RNText style={styles.title}>
        {'Welcome To Toonme,\nWhere We Turn Your Photos\nInto Lively Cartoons!'}
      </RNText>

      <RNButton title={'Continue'} />
    </RNContainer>
  );
};

const size = {};
const styles = StyleSheet.create({
  imgContainer: {
    width: '90%',
    height: '50%',
    alignSelf: 'center',
  },
  onboarding_0: {
    width: wp(40),
    height: wp(60),
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  title: {
    fontSize: FontSize.font20,
    fontFamily: FontFamily.SemiBold,
    textAlign: 'center',
    paddingVertical: hp(4),
  },
});

export default Onboarding;

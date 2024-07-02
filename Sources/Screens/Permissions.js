import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNButton, RNContainer, RNImage, RNStyles, RNText } from '../Common';
import { useInset } from '../Hooks';
import { Images } from '../Constants';
import { Colors, FontFamily, FontSize, hp, wp } from '../Theme';
import { NativeAd } from '../Components';
import { useState } from 'react';

const Permissions = ({ navigation }) => {
  const [State, setState] = useState({ termsAccepted: false });
  const styles = useStyles({ ...State });

  return (
    <RNContainer style={styles.container}>
      <View style={RNStyles.container}>
        <RNImage source={Images.onboarding_1} style={styles.img} />
        <RNText
          align={'center'}
          size={FontSize.font20}
          family={FontFamily.SemiBold}>
          {'Welcome To Toonme'}
        </RNText>
        <RNText align={'center'} size={FontSize.font14}>
          {'We value your privacy'}
        </RNText>

        <View style={styles.agreeContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() =>
              setState(p => ({ ...p, termsAccepted: !p.termsAccepted }))
            }
            style={styles.radioContainer}>
            <View style={styles.radio} />
          </TouchableOpacity>
          <View style={RNStyles.flexWrapHorizontal}>
            <RNText>{'I agree to the '}</RNText>
            <TouchableOpacity>
              <RNText style={styles.terms}>{'Terms of Use'}</RNText>
            </TouchableOpacity>
            <RNText>{' and '}</RNText>
            <RNText>{'acknowledge that I have read the '}</RNText>
            <TouchableOpacity>
              <RNText style={styles.terms}>{'privacy policy.'}</RNText>
            </TouchableOpacity>
          </View>
        </View>

        <RNButton disable={!State.termsAccepted} title={'Accept & Continue'} />
      </View>

      <NativeAd />
    </RNContainer>
  );
};

const size = { img: wp(70), true: wp(6) };
const useStyles = ({ termsAccepted }) => {
  const inset = useInset();
  return StyleSheet.create({
    container: {
      paddingTop: inset.top,
      paddingBottom: inset.bottom,
    },
    img: {
      width: size.img,
      height: size.img,
      alignSelf: 'center',
      marginVertical: hp(2),
    },
    agreeContainer: {
      flexDirection: 'row',
      paddingHorizontal: wp(6),
      marginVertical: hp(4),
    },
    radioContainer: {
      ...RNStyles.center,
      borderWidth: wp(0.2),
      borderColor: termsAccepted ? Colors.Primary : Colors.Black,
      width: size.true,
      height: size.true,
      borderRadius: wp(5),
      marginRight: wp(2),
      marginVertical: hp(0.3),
    },
    terms: {
      textDecorationLine: 'underline',
      fontFamily: FontFamily.SemiBold,
      color: Colors.Primary,
    },
    radio: {
      width: size.true * 0.7,
      height: size.true * 0.7,
      backgroundColor: termsAccepted ? Colors.Primary : Colors.Transparent,
      borderRadius: wp(5),
    },
  });
};

export default Permissions;

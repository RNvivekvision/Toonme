import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { RNImage, RNStyles, RNText } from '../../Common';
import { Images } from '../../Constants';
import { useInset } from '../../Hooks';

const DrawerContent = ({ navigation }) => {
  const styles = useStyles();

  return (
    <View style={RNStyles.container}>
      <View style={styles.logoContainer}>
        <RNText style={styles.title}>{'Toonme - Cartoons From Photos'}</RNText>
      </View>

      <View style={styles.screens}>
        <RNImage source={Images.appIcon} style={styles.logo} />
      </View>

      <TouchableOpacity style={styles.buttonContainer}>
        <View style={{ ...RNStyles.flexRow, flex: 1 }}>
          <RNImage source={Images.premium} style={styles.icon} />
          <RNText
            pLeft={wp(3)}
            family={FontFamily.SemiBold}
            size={FontSize.font14}>
            {'Get Premium'}
          </RNText>
        </View>
        <RNImage source={Images.right} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const size = { logo: wp(30), icon: wp(4) };
const useStyles = () => {
  const inset = useInset();

  return StyleSheet.create({
    container: {},
    logoContainer: {
      height: hp(23),
      backgroundColor: Colors.Primary,
      paddingTop: inset.top + hp(2),
    },
    title: {
      paddingHorizontal: wp(4),
      textAlign: 'center',
      fontSize: FontSize.font18,
      fontFamily: FontFamily.SemiBold,
    },
    logo: {
      width: size.logo,
      height: size.logo,
      alignSelf: 'center',
      position: 'absolute',
      top: -hp(8),
    },
    screens: {
      ...RNStyles.container,
      zIndex: 1,
    },
    icon: {
      width: size.icon,
      height: size.icon,
    },
    buttonContainer: {
      ...RNStyles.flexRow,
      backgroundColor: Colors.Primary,
      marginHorizontal: wp(4),
      marginVertical: hp(2),
      paddingVertical: hp(2),
      paddingHorizontal: wp(4),
      borderRadius: wp(3),
      marginBottom: inset.bottom + hp(2),
    },
  });
};

export default DrawerContent;

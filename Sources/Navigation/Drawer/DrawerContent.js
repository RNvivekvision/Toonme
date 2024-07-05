import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { RNImage, RNStyles, RNText } from '../../Common';
import { Images, Strings } from '../../Constants';
import { useInset } from '../../Hooks';
import { DummyData, Functions } from '../../Utils';
import { useDispatch } from 'react-redux';
import { togglePlans } from '../../Redux/Actions';

const { Drawer } = DummyData;

const DrawerContent = ({ navigation }) => {
  const dispatch = useDispatch();
  const styles = useStyles();

  return (
    <View style={RNStyles.container}>
      <View style={styles.logoContainer}>
        <RNText style={styles.title}>{Strings.ToonmeCartoonsFromPhotos}</RNText>
      </View>

      <View style={RNStyles.container}>
        <RNImage source={Images.appIcon} style={styles.logo} />
        <View style={{ paddingTop: hp(10) }}>
          {Drawer.map((v, i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={0.6}
              onPress={async () => await func[v.key]?.(navigation)}
              style={styles.renderDrawer}>
              <View style={RNStyles.flexRow1}>
                <RNImage source={Images['drawer_' + i]} style={RNStyles.icon} />
                <RNText
                  size={FontSize.font14}
                  family={FontFamily.SemiBold}
                  pLeft={wp(4)}>
                  {v.title}
                </RNText>
              </View>
              <RNImage source={Images.right} style={styles.icon} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => dispatch(togglePlans())}
        style={styles.buttonContainer}>
        <View style={RNStyles.flexRow1}>
          <RNImage source={Images.premium} style={styles.icon} />
          <RNText
            pLeft={wp(3)}
            family={FontFamily.SemiBold}
            size={FontSize.font14}>
            {Strings.GetPremium}
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
    renderDrawer: {
      ...RNStyles.flexRow,
      paddingHorizontal: wp(4),
      paddingVertical: hp(2),
      marginVertical: hp(1),
    },
  });
};

const func = {
  home: nav => nav?.closeDrawer(),
  privacy: () => privacy(),
  rateus: () => rateus(),
  share: () => share(),
};

const privacy = () => {
  console.log('Privacy Policy...');
};

const rateus = () =>
  Functions.RateUs({
    onSuccess: () => console.log('Success'),
    onError: () => console.error('Error'),
  });

const share = async () => {
  await Functions.ShareApp();
};

export default DrawerContent;

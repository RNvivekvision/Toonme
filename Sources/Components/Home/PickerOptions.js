import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Reanimated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { RNImage, RNStyles, RNText } from '../../Common';
import { setClickedImage } from '../../Redux/Actions';
import { Images, Strings } from '../../Constants';
import { NavRoutes } from '../../Navigation';
import { Functions } from '../../Utils';
import { useUserClick } from '../../Hooks';

const PickerOptions = () => {
  const { navigate } = useNavigation();
  const { incrementCount } = useUserClick();
  const dispatch = useDispatch();

  const onCameraPress = async () => {
    try {
      const img = await Functions.openCamera();
      dispatch(setClickedImage(img));
      await incrementCount();
      navigate(NavRoutes.Edit);
    } catch (e) {
      console.error('Error onCameraPress -> ', e);
    }
  };

  const onGalleryPress = async () => {
    try {
      const img = await Functions.openGallery();
      dispatch(setClickedImage(img));
      await incrementCount();
      navigate(NavRoutes.Edit);
    } catch (e) {
      console.error('Error onGalleryPress -> ', e);
    }
  };

  const onCollageMakerPress = async () => {
    try {
      const images = await Functions.openGallery({ multiple: true });
      if (images.length < 2) {
        return alert('Please select atlease 2 images');
      }
      await incrementCount();
      navigate(NavRoutes.CollageMaker, { images });
    } catch (e) {
      console.error('Error onCollageMakerPress -> ', e);
    }
  };

  return (
    <View style={styles.container}>
      <Option
        title={Strings.Camera}
        image={Images.camera}
        delay={150}
        onPress={onCameraPress}
      />
      <Option
        title={Strings.Gallery}
        image={Images.gallery}
        delay={300}
        onPress={onGalleryPress}
      />
      <Option
        title={Strings.CollageMaker}
        image={Images.collageMaker}
        delay={450}
        onPress={onCollageMakerPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...RNStyles.flexRow,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
  },
  content: {
    backgroundColor: Colors.Primary,
    flex: 1,
    marginHorizontal: wp(1),
    height: wp(20),
    borderRadius: wp(3),
  },
  button: {
    ...RNStyles.flexCenter,
    borderRadius: wp(3),
  },
  iconContainer: {
    ...RNStyles.center,
    width: wp(8),
    height: wp(8),
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: hp(0.8),
    backgroundColor: Colors.White,
  },
});

const Option = ({ title, image, delay, onPress }) => {
  return (
    <Reanimated.View entering={FadeInDown.delay(delay)} style={styles.content}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={styles.button}>
        <View style={styles.iconContainer}>
          <RNImage source={image} style={RNStyles.image50} />
        </View>
        <RNText size={FontSize.font10} family={FontFamily.SemiBold}>
          {title}
        </RNText>
      </TouchableOpacity>
    </Reanimated.View>
  );
};

export default PickerOptions;

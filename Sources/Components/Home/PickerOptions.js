import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RNImage, RNStyles, RNText } from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { Images } from '../../Constants';
import Reanimated, { FadeInDown } from 'react-native-reanimated';

const PickerOptions = () => {
  const onCameraPress = () => {};

  const onGalleryPress = () => {};

  const onCollageMakerPress = () => {};

  return (
    <View style={styles.container}>
      <Option
        title={'Camera'}
        image={Images.camera}
        delay={150}
        onPress={onCollageMakerPress}
      />

      <Option
        title={'Gallery'}
        image={Images.gallery}
        delay={300}
        onPress={onCollageMakerPress}
      />

      <Option
        title={'Collage Maker'}
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

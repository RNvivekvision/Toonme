import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import {
  RNButton,
  RNContainer,
  RNHeader,
  RNImage,
  RNImageLoader,
  RNStyles,
} from '../Common';
import { Colors, hp, wp } from '../Theme';
import { NativeAd } from '../Components';
import { Images, Strings } from '../Constants';
import { useState } from 'react';
import { Functions } from '../Utils';
import { useUserClick } from '../Hooks';

const Preview = ({ navigation }) => {
  const [State, setState] = useState({ imgLoading: false });
  const { clickedImage } = useSelector(({ UserReducer }) => UserReducer);
  const { incrementCount } = useUserClick();

  const onContinueEditingPress = async () => {
    await incrementCount();
    navigation.goBack();
  };

  const onSharePress = async () => {
    const url = clickedImage?.data
      ? `data:image/jpeg;base64,${clickedImage?.data}`
      : clickedImage?.path;
    try {
      await incrementCount();
      await Functions.ShareApp({
        message: 'Share this image to your friends.',
        url: url,
        subject: 'Share information from your application',
      });
    } catch (e) {
      console.log('Error onSharePress -> ', e);
    }
  };

  return (
    <RNContainer>
      <RNHeader title={Strings.Preview} back>
        <View style={styles.imgContainer}>
          <RNImageLoader visible={State.imgLoading} />
          <RNImage
            source={{ uri: clickedImage?.path }}
            onLoadStart={() => setState(p => ({ ...p, imgLoading: true }))}
            onLoadEnd={() => setState(p => ({ ...p, imgLoading: false }))}
          />
        </View>

        <View style={styles.buttonContainer}>
          <RNButton
            title={Strings.ContinueEditing}
            style={styles.button}
            doubleTicks={false}
            onPress={onContinueEditingPress}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onSharePress}
            style={styles.shareButton}>
            <RNImage source={Images.share} style={RNStyles.image50} />
          </TouchableOpacity>
        </View>
      </RNHeader>
      <NativeAd />
    </RNContainer>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    borderWidth: 1,
    borderColor: Colors.Placeholder,
    borderRadius: wp(3),
    overflow: 'hidden',
    width: wp(90),
    height: wp(90),
    alignSelf: 'center',
  },
  buttonContainer: {
    ...RNStyles.flexRowBetween,
    marginHorizontal: wp(6),
    paddingVertical: hp(2),
  },
  button: {
    marginRight: wp(2),
    marginLeft: 0,
    flex: 1,
  },
  shareButton: {
    ...RNStyles.center,
    width: wp(15),
    height: wp(13),
    backgroundColor: Colors.Primary,
    borderRadius: wp(3),
  },
});

export default Preview;

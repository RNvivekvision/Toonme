import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import ViewShot from 'react-native-view-shot';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Five, Four, NativeAd, Three, Two } from '../Components';
import { RNButton, RNContainer, RNHeader } from '../Common';
import { setClickedImage } from '../Redux/Actions';
import { NavRoutes } from '../Navigation';
import { Strings } from '../Constants';
import { hp, wp } from '../Theme';
import { useUserClick } from '../Hooks';

const CollageMaker = ({ navigation, route }) => {
  const viewRef = useRef();
  const dispatch = useDispatch();
  const { incrementCount } = useUserClick();
  const images = route?.params?.images;

  const onSavePress = async () => {
    try {
      const screenShot = await viewRef.current?.capture();
      await CameraRoll.saveAsset(screenShot, { type: 'photo' });
      dispatch(setClickedImage({ path: screenShot }));
      alert('Image saved to camera roll!');
      await incrementCount();
      navigation.navigate(NavRoutes.Preview);
    } catch (e) {
      console.error('Error on Saving Screen Shot -> ', e);
    }
  };

  return (
    <RNContainer useSafeArea>
      <RNHeader title={Strings.CollageMaker} back>
        <ViewShot ref={viewRef} style={styles.imgContainer}>
          {Tags[images.length]?.(images)}
        </ViewShot>
        <RNButton
          title={Strings.Save}
          doubleTicks={false}
          onPress={onSavePress}
        />
      </RNHeader>
      <NativeAd />
    </RNContainer>
  );
};

const size = { img: wp(90) };
const styles = StyleSheet.create({
  imgContainer: {
    marginVertical: hp(1),
    marginHorizontal: wp(4),
    width: size.img,
    height: size.img,
    borderRadius: wp(3),
    overflow: 'hidden',
  },
});

const Tags = {
  2: p => <Two images={p} />,
  3: p => <Three images={p} />,
  4: p => <Four images={p} />,
  5: p => <Five images={p} />,
};

export default CollageMaker;

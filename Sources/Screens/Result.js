import { StyleSheet, View } from 'react-native';
import {
  RNButton,
  RNContainer,
  RNHeader,
  RNImage,
  RNImageLoader,
  RNStyles,
  RNText,
} from '../Common';
import { FontFamily, FontSize, hp, wp } from '../Theme';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { URL } from '../Services';
import { NativeAd } from '../Components';
import { Strings } from '../Constants';
import { Functions } from '../Utils';
import { getFilteredResult } from '../Services';
import { useUserClick } from '../Hooks';

const Result = ({ navigation }) => {
  const [State, setState] = useState({
    isLoading: false,
    img: null,
    imgLoading: false,
    error: null,
  });
  const { clickedImage, selectedFilter } = useSelector(
    ({ UserReducer }) => UserReducer,
  );
  const { incrementCount } = useUserClick();

  useEffect(() => {
    getFilteredImage();
  }, []);

  const getFilteredImage = async () => {
    setState(p => ({ ...p, isLoading: true, error: null, img: null }));
    try {
      const response = await getFilteredResult({
        combo_id: selectedFilter,
        image: clickedImage,
      });
      console.log('response -> ', JSON.stringify(response, null, 2));
      if (response?.output_url) {
        setState(p => ({ ...p, img: response?.output_url }));
        return;
      }
      setState(p => ({ ...p, error: Strings.errorMsg }));
    } catch (e) {
      setState(p => ({ ...p, error: Strings.errorMsg }));
      console.error('Error getFilteredImage -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  const onRefresh = async () => {
    await incrementCount();
    await getFilteredImage();
  };

  const onSavePress = async () => {
    try {
      await incrementCount();
      await Functions.saveToCameraRoll(State.img);
    } catch (e) {
      console.error('Error onSavePress -> ', e);
    }
  };

  return (
    <RNContainer isLoading={State.isLoading} useSafeArea>
      <RNHeader title={Strings.Result} back>
        <View style={styles.imgContainer}>
          <RNImageLoader visible={State.imgLoading} />
          {State.img && (
            <RNImage
              source={{ uri: State.img }}
              onLoadStart={() => setState(p => ({ ...p, imgLoading: true }))}
              onLoadEnd={() => setState(p => ({ ...p, imgLoading: false }))}
            />
          )}
          {State.error && <RNText style={styles.error}>{State.error}</RNText>}
        </View>
        <View style={styles.buttonContainer}>
          {!State.isLoading && (
            <RNButton
              title={Strings.Refresh}
              doubleTicks={false}
              style={styles.button}
              onPress={onRefresh}
            />
          )}
          {State.img && (
            <RNButton
              title={Strings.Save}
              doubleTicks={false}
              style={styles.button}
              onPress={onSavePress}
            />
          )}
        </View>
      </RNHeader>
      <NativeAd />
    </RNContainer>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    ...RNStyles.center,
    borderRadius: wp(3),
    overflow: 'hidden',
    width: wp(90),
    height: wp(90),
    alignSelf: 'center',
  },
  buttonContainer: {
    ...RNStyles.flexRow1,
    marginHorizontal: wp(4),
    marginVertical: hp(2),
  },
  button: {
    flex: 1,
    marginHorizontal: wp(1),
  },
  error: {
    fontFamily: FontFamily.SemiBold,
    width: '70%',
    textAlign: 'center',
  },
});

export default Result;

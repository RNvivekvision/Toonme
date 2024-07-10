import { StyleSheet, View } from 'react-native';
import {
  RNButton,
  RNContainer,
  RNHeader,
  RNImage,
  RNImageLoader,
} from '../Common';
import { wp } from '../Theme';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { URL } from '../Services';
import { NativeAd } from '../Components';
import { Strings } from '../Constants';
import { Functions } from '../Utils';

const Result = () => {
  const [State, setState] = useState({
    isLoading: false,
    img: null,
    imgLoading: false,
  });
  const { clickedImage, selectedFilter } = useSelector(
    ({ UserReducer }) => UserReducer,
  );

  useEffect(() => {
    getFilteredImage();
  }, []);

  const getFilteredImage = async () => {
    setState(p => ({ ...p, isLoading: true }));
    try {
      const form = new FormData();
      form.append('combo_id', selectedFilter);
      form.append('image', {
        name: clickedImage?.filename,
        type: clickedImage?.mime || 'image/jpeg',
        uri: clickedImage?.path,
      });
      const responseJson = await fetch(URL.result, {
        method: 'POST',
        body: form,
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data',
        },
      });
      const response = await responseJson.json();
      if (response?.output_url) {
        setState(p => ({ ...p, img: response?.output_url }));
      }
      // console.log('response -> ', JSON.stringify(response, null, 2));
    } catch (e) {
      // alert('Something went wrong. Please try again.');
      console.error('Error getFilteredImage -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  const onSavePress = async () => {
    try {
      await Functions.saveToCameraRoll(State.img);
    } catch (e) {
      console.error('Error onSavePress -> ', e);
    }
  };

  return (
    <RNContainer isLoading={State.isLoading}>
      <RNHeader title={Strings.Result} back>
        {State.img && (
          <>
            <View style={styles.imgContainer}>
              <RNImageLoader visible={State.imgLoading} />
              <RNImage
                source={{ uri: State.img }}
                onLoadStart={() => setState(p => ({ ...p, imgLoading: true }))}
                onLoadEnd={() => setState(p => ({ ...p, imgLoading: false }))}
              />
            </View>
            <RNButton
              title={Strings.Save}
              doubleTicks={false}
              style={{ marginVertical: wp(4) }}
              onPress={onSavePress}
            />
          </>
        )}
      </RNHeader>
      <NativeAd />
    </RNContainer>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    // borderWidth: 1,
    // borderColor: Colors.Placeholder,
    borderRadius: wp(3),
    overflow: 'hidden',
    width: wp(90),
    height: wp(90),
    alignSelf: 'center',
  },
});

export default Result;

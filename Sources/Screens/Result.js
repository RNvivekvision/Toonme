import { StyleSheet, View } from 'react-native';
import { RNContainer, RNHeader, RNImage } from '../Common';
import { Colors, wp } from '../Theme';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { URL } from '../Services';
import { NativeAd } from '../Components';
import { Strings } from '../Constants';

const Result = () => {
  const { clickedImage, selectedFilter } = useSelector(
    ({ UserReducer }) => UserReducer,
  );

  useEffect(() => {
    getFilteredImage();
  }, []);

  const getFilteredImage = async () => {
    try {
      const form = new FormData();
      form.append('combo_id', selectedFilter);
      form.append('image', clickedImage?.data);
      // console.log(
      //   'payload -> ',
      //   JSON.stringify(
      //     {
      //       url: URL.result,
      //       method: 'POST',
      //       body: form,
      //       headers: {
      //         Accept: '*/*',
      //         'Content-Type': 'multipart/form-data',
      //       },
      //     },
      //     null,
      //     2,
      //   ),
      // );
      const responseJson = await fetch(URL.result, {
        method: 'POST',
        body: form,
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data',
        },
      });
      const response = await responseJson.json();
      console.log('response -> ', JSON.stringify(response, null, 2));
    } catch (e) {
      console.error('Error getFilteredImage -> ', e);
    }
  };

  // console.log({ selectedFilter, clickedImage });

  return (
    <RNContainer>
      <RNHeader title={Strings.Result} back>
        <View style={styles.imgContainer}>
          <RNImage source={{ uri: clickedImage.path }} resizeMode={'cover'} />
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
});

export default Result;

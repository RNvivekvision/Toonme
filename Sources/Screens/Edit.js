import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  RNButton,
  RNContainer,
  RNHeader,
  RNImage,
  RNImageLoader,
  RNStyles,
} from '../Common';
import { Colors, hp, isIOS, wp } from '../Theme';
import { NativeAd } from '../Components';
import { NavRoutes } from '../Navigation';
import { Strings } from '../Constants';
import PhotoEditor from '@baronha/react-native-photo-editor';
import { setClickedImage } from '../Redux/Actions';
import { useState } from 'react';

const Edit = ({ navigation }) => {
  const [State, setState] = useState({ imgLoading: false });
  const { clickedImage } = useSelector(({ UserReducer }) => UserReducer);
  const dispatch = useDispatch();

  const onEditPress = async () => {
    const path = await PhotoEditor.open({
      path: 'file://' + clickedImage?.path,
      stickers: [],
    });
    const img = isIOS ? path.replace('file://', '') : path;
    dispatch(setClickedImage({ ...clickedImage, path: img }));
  };

  const onCartoonPress = () => {
    navigation.navigate(NavRoutes.SelectCartoon);
  };

  return (
    <RNContainer>
      <RNHeader title={Strings.Edit} back>
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
            title={Strings.Edit}
            style={styles.button}
            doubleTicks={false}
            onPress={onEditPress}
          />
          <RNButton
            title={Strings.Cartoon}
            style={styles.button}
            doubleTicks={false}
            onPress={onCartoonPress}
          />
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
    width: wp(40),
    marginHorizontal: 0,
  },
});

export default Edit;

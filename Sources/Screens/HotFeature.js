import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  RNButton,
  RNContainer,
  RNHeader,
  RNImage,
  RNStyles,
  RNText,
} from '../Common';
import { Colors, FontFamily, FontSize, hp, isIOS, wp } from '../Theme';
import { NativeAd } from '../Components';
import { Strings } from '../Constants';
import { Functions } from '../Utils';
import { URL } from '../Services';
import { useSelector } from 'react-redux';

const HotFeature = ({ navigation }) => {
  const [State, setState] = useState({
    isMale: -1,
    img: null,
    isLoading: false,
    cartoons: [],
  });
  const styles = useStyles({ ...State });

  const onPlusPress = async () => {
    try {
      const img = await Functions.openGallery();
      setState(p => ({ ...p, img: img }));
    } catch (e) {
      console.error('Error onPlusPress -> ', e);
    }
  };

  const onNextPress = async () => {
    try {
      setState(p => ({ ...p, isLoading: true }));
      const response = await getCartoonImages();
      console.log('response -> ', JSON.stringify(response, null, 2));
    } catch (e) {
      console.error('Error onNextPress -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  const getCartoonImages = async () => {
    const form = new FormData();
    form.append('gender', State.isMale == 0 ? 'male' : 'female');
    form.append('image', {
      name: State.img?.filename,
      type: State.img?.mime || 'image/jpeg',
      uri: State.img?.path,
    });
    const responseJson = await fetch(URL.feature, {
      method: 'POST',
      body: form,
      headers: {
        Accept: '*/*',
        'Content-Type': 'multipart/form-data',
      },
    });
    const response = await responseJson.json();
    return response;
  };

  return (
    <RNContainer isLoading={State.isLoading}>
      <RNHeader title={Strings.HotFeature} back>
        <View style={styles.content}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPlusPress}
            style={styles.imgContainer}>
            {State.img === null ? (
              <RNText size={FontSize.font40} color={Colors.error}>
                +
              </RNText>
            ) : (
              <RNImage source={{ uri: State.img?.path }} resizeMode={'cover'} />
            )}
          </TouchableOpacity>
          <View style={styles.genderContainer}>
            <RNText>{Strings.SelectGender + ':'}</RNText>
            <View style={RNStyles.flexRow1}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setState(p => ({ ...p, isMale: 0 }))}
                style={RNStyles.flexRow1}>
                <View style={styles.radioContainer}>
                  {State.isMale === 0 && <View style={styles.radio} />}
                </View>
                <RNText size={FontSize.font14}>{Strings.Male}</RNText>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setState(p => ({ ...p, isMale: 1 }))}
                style={RNStyles.flexRow1}>
                <View style={styles.radioContainer}>
                  {State.isMale === 1 && <View style={styles.radio} />}
                </View>
                <RNText size={FontSize.font14}>{Strings.Female}</RNText>
              </TouchableOpacity>
            </View>
            <RNButton
              title={Strings.Next}
              doubleTicks={false}
              style={styles.button}
              textStyle={styles.buttonText}
              onPress={onNextPress}
            />
          </View>
        </View>

        <NativeAd />

        <RNText
          size={FontSize.font18}
          family={FontFamily.SemiBold}
          pVertical={hp(1)}
          pHorizontal={wp(4)}>
          {Strings.HotCartoons}
        </RNText>
      </RNHeader>
    </RNContainer>
  );
};

const size = { img: wp(30), radio: wp(6) };
const useStyles = ({ img }) => {
  return StyleSheet.create({
    content: {
      ...RNStyles.flexRow,
      backgroundColor: Colors.Primary + '99',
      marginHorizontal: wp(4),
      marginVertical: hp(1),
      borderRadius: wp(3),
      paddingVertical: hp(2),
      paddingHorizontal: wp(4),
      height: wp(36),
    },
    imgContainer: {
      ...RNStyles.center,
      width: size.img,
      height: size.img,
      borderRadius: wp(2),
      overflow: 'hidden',
      borderWidth: img ? 0 : wp(0.5),
      borderColor: Colors.Black,
      borderStyle: 'dashed',
    },
    genderContainer: {
      flex: 1,
      height: '100%',
      paddingHorizontal: wp(4),
      justifyContent: 'space-between',
    },
    button: {
      width: wp(20),
      paddingHorizontal: 0,
      paddingVertical: hp(1),
      alignSelf: 'flex-end',
      marginHorizontal: 0,
      marginBottom: 0,
    },
    buttonText: {
      fontSize: FontSize.font14,
    },
    radioContainer: {
      ...RNStyles.center,
      width: size.radio,
      height: size.radio,
      borderWidth: wp(0.5),
      borderColor: Colors.Primary,
      borderRadius: 100,
      marginRight: wp(2),
    },
    radio: {
      width: size.radio * 0.6,
      height: size.radio * 0.6,
      backgroundColor: Colors.Primary,
      borderRadius: 100,
    },
  });
};

export default HotFeature;

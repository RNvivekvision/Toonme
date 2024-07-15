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
import { Colors, FontSize, hp, wp } from '../Theme';
import { Cartoons, NativeAd, SaveCartoon, UnlockPremium } from '../Components';
import { Strings } from '../Constants';
import { Functions } from '../Utils';
import { getCartoonImages } from '../Services';
import { useDispatch, useSelector } from 'react-redux';
import { setClickedImage, togglePremium } from '../Redux/Actions';
import { NavRoutes } from '../Navigation';
import { useUserClick } from '../Hooks';

const HotFeature = ({ navigation }) => {
  const { showPremium } = useSelector(({ UserReducer }) => UserReducer);
  const dispatch = useDispatch();
  const { incrementCount } = useUserClick();
  const [State, setState] = useState({
    isMale: 0,
    img: null,
    isLoading: false,
    cartoons: [],
    showSaveCartoon: false,
    selectedCartoon: null,
  });
  const styles = useStyles({ ...State });

  const onPlusPress = async () => {
    try {
      const img = await Functions.openGallery();
      setState(p => ({ ...p, img: img }));
      await incrementCount();
    } catch (e) {
      console.error('Error onPlusPress -> ', e);
    }
  };

  const onNextPress = async () => {
    try {
      await incrementCount();
      setState(p => ({ ...p, isLoading: true }));
      const response = await getCartoonImages({
        gender: State.isMale == 0 ? 'male' : 'female',
        image: State.img,
      });
      // console.log('response -> ', JSON.stringify(response, null, 2));
      if (response?.timeout) {
        alert('Something went wrong. Please try again.');
      } else if (response?.output_url?.length > 0) {
        setState(p => ({ ...p, cartoons: response?.output_url }));
      }
    } catch (e) {
      console.error('Error onNextPress -> ', e);
    } finally {
      setState(p => ({ ...p, isLoading: false }));
    }
  };

  const onCartoonPress = async (cartoon, show) => {
    setState(p => ({
      ...p,
      selectedCartoon: cartoon,
      showSaveCartoon: show ?? true,
    }));
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

        <Cartoons images={State.cartoons} onPress={onCartoonPress} />

        <SaveCartoon
          visible={State.showSaveCartoon}
          cartoon={State.selectedCartoon}
          onClose={() => setState(p => ({ ...p, showSaveCartoon: false }))}
          onSave={() => {
            dispatch(setClickedImage({ path: State.selectedCartoon }));
            navigation.navigate(NavRoutes.Preview);
          }}
        />

        <UnlockPremium
          visible={showPremium}
          onClose={() => dispatch(togglePremium())}
          isHotFeature={true}
          onHotFeature={() => setState(p => ({ ...p, showSaveCartoon: true }))}
        />
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
      borderWidth: wp(0.2),
      borderColor: Colors.Black,
      borderRadius: 100,
      marginRight: wp(2),
    },
    radio: {
      width: size.radio * 0.6,
      height: size.radio * 0.6,
      backgroundColor: Colors.Black,
      borderRadius: 100,
    },
  });
};

export default HotFeature;

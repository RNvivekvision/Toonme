import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RNButton, RNImage, RNStyles, RNText } from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { Images, Strings } from '../../Constants';
import { Functions } from '../../Utils';
import { setClickedImage, setSelectedFilter } from '../../Redux/Actions';
import { NavRoutes } from '../../Navigation';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const UnlockPremium = ({ visible, onClose, isHome }) => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const onWatchPress = async () => {
    if (!isHome) {
      navigate(NavRoutes.Result);
      onClose?.();
      return;
    }

    try {
      const img = await Functions.openGallery();
      dispatch(setClickedImage(img));
      navigate(NavRoutes.Result);
      onClose?.();
    } catch (e) {
      console.error('Error onWatchPress -> ', e);
    }
  };

  const onClosing = () => {
    dispatch(setSelectedFilter(null));
    onClose?.();
  };

  return (
    <Modal
      visible={visible}
      animationType={'fade'}
      transparent={true}
      onRequestClose={onClosing}>
      <TouchableWithoutFeedback onPress={onClosing}>
        <View style={styles.overlay}>
          <View style={styles.content}>
            <RNImage source={Images.onboarding_1} style={styles.img} />
            <RNText
              align={'center'}
              size={FontSize.font24}
              family={FontFamily.SemiBold}>
              {Strings.UnlockPremium}
            </RNText>
            <RNText align={'center'}>{Strings.UnlockPremiumDesc}</RNText>
            <RNButton
              title={Strings.WatchVideo}
              doubleTicks={false}
              icon={Images.watchVideo}
              style={styles.button}
              textStyle={{ paddingLeft: wp(4) }}
              onPress={onWatchPress}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...RNStyles.center,
    ...RNStyles.container,
    backgroundColor: Colors.Black + '40',
  },
  content: {
    backgroundColor: Colors.White,
    width: wp(90),
    borderRadius: wp(4),
  },
  img: {
    width: wp(50),
    height: wp(50),
    marginVertical: hp(2),
    marginTop: hp(4),
    alignSelf: 'center',
  },
  button: {
    marginVertical: hp(3),
    marginHorizontal: wp(12),
  },
});

export default UnlockPremium;

import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RNButton, RNImage, RNLoader, RNStyles, RNText } from '../../Common';
import { Colors, FontFamily, FontSize, hp, wp } from '../../Theme';
import { Images, Strings } from '../../Constants';
import { Functions } from '../../Utils';
import {
  setClickedImage,
  setSelectedFilter,
  togglePlans,
  togglePremium,
} from '../../Redux/Actions';
import { NavRoutes } from '../../Navigation';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useGoogleAds, useUserClick } from '../../Hooks';
import { useEffect, useState } from 'react';

const UnlockPremium = ({
  visible,
  onClose,
  isHome,
  isSelectCartoon,
  isHotFeature,
  onHotFeature,
}) => {
  const { navigate } = useNavigation();
  const { showRewardAd } = useGoogleAds();
  const [State, setState] = useState({ showRewardAd: true, isLoading: false });
  const dispatch = useDispatch();

  const resetState = () => {
    setState(p => ({ ...p, isLoading: false, showRewardAd: true }));
  };

  useEffect(() => {
    if (visible) {
      resetState();
    }
  }, [visible]);

  const onWatchPress = async () => {
    if (State.showRewardAd) {
      setState(p => ({ ...p, isLoading: true }));
      await showRewardAd();
      setState(p => ({ ...p, isLoading: false, showRewardAd: false }));
      return;
    }

    setState(p => ({ ...p, showRewardAd: true }));
    if (isHotFeature) {
      onClose?.();
      onHotFeature?.();
      return;
    }

    if (isSelectCartoon) {
      navigate(NavRoutes.Result);
      onClose?.();
      return;
    }

    if (isHome) {
      try {
        const img = await Functions.openGallery();
        dispatch(setClickedImage(img));
        navigate(NavRoutes.Result);
        onClose?.();
      } catch (e) {
        console.error('Error onWatchPress -> ', e);
      }
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
          <RNLoader visible={State.isLoading} />
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
              title={
                State.showRewardAd ? Strings.WatchVideo : Strings.SelectImage
              }
              doubleTicks={!State.showRewardAd}
              icon={State.showRewardAd ? Images.watchVideo : null}
              style={[styles.button, { marginTop: hp(4) }]}
              textStyle={{ paddingLeft: State.showRewardAd ? wp(4) : 0 }}
              onPress={onWatchPress}
            />
            <RNButton
              title={Strings.Subscribe}
              textStyle={{ paddingLeft: wp(4) }}
              style={styles.button}
              onPress={() => {
                dispatch(togglePremium());
                dispatch(togglePlans());
              }}
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
    paddingBottom: hp(2),
  },
  img: {
    width: wp(50),
    height: wp(50),
    marginVertical: hp(2),
    marginTop: hp(4),
    alignSelf: 'center',
  },
  button: {
    marginHorizontal: wp(10),
  },
});

export default UnlockPremium;

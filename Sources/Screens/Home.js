import { useDispatch, useSelector } from 'react-redux';
import { RefreshControl } from 'react-native';
import {
  setClickedImage,
  setSelectedFilter,
  togglePlans,
  togglePremium,
} from '../Redux/Actions';
import {
  NativeAd,
  TOHeader,
  TryForFree,
  PickerOptions,
  ImageOptions,
  HowToUse,
  BouncyCard,
  UnlockPremium,
} from '../Components';
import { RNContainer } from '../Common';
import { Strings } from '../Constants';
import { Functions } from '../Utils';
import { NavRoutes } from '../Navigation';
import { useState } from 'react';
import { Colors } from '../Theme';
import { useUserClick } from '../Hooks';
import { getAdData, getFilters } from '../Redux/ExtraReducers';

const Home = ({ navigation }) => {
  const [State, setState] = useState({ refreshing: false });
  const { showPremium } = useSelector(({ UserReducer }) => UserReducer);
  const dispatch = useDispatch();
  const { incrementCount } = useUserClick();

  const onFilterPress = async filter => {
    try {
      const img = await Functions.openGallery();
      dispatch(setClickedImage(img));
      dispatch(setSelectedFilter(filter?.combo_id));
      await incrementCount();
      navigation.navigate(NavRoutes.Result);
    } catch (e) {
      console.error('Error onFilterPress -> ', e);
      Functions.galleryErrorAlert(e);
    }
  };

  const onRefresh = () => {
    setState(p => ({ ...p, refreshing: true }));
    dispatch(getAdData());
    dispatch(getFilters());
    setTimeout(() => {
      setState(p => ({ ...p, refreshing: false }));
    }, 1000);
  };

  return (
    <RNContainer useSafeArea>
      <TOHeader
        title={Strings.ToonMe}
        scrollProps={{
          refreshControl: (
            <RefreshControl
              refreshing={State.refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.Primary}
              colors={[Colors.Primary]}
            />
          ),
        }}>
        {/* <TryForFree /> */}
        <PickerOptions />
        <NativeAd />
        <ImageOptions onFilterPress={onFilterPress} />
      </TOHeader>
      <BouncyCard />
      <HowToUse />
      <UnlockPremium
        visible={showPremium}
        onClose={() => dispatch(togglePremium())}
        isHome={true}
      />
    </RNContainer>
  );
};

export default Home;

import { useDispatch, useSelector } from 'react-redux';
import {
  setClickedImage,
  setSelectedFilter,
  togglePlans,
  togglePremium,
} from '../Redux/Actions';
import { RNContainer } from '../Common';
import {
  NativeAd,
  TOHeader,
  TryForFree,
  Plans,
  PickerOptions,
  ImageOptions,
  HowToUse,
  BouncyCard,
  UnlockPremium,
} from '../Components';
import { Strings } from '../Constants';
import { Functions } from '../Utils';
import { NavRoutes } from '../Navigation';

const Home = ({ navigation }) => {
  const { showPlans, showPremium } = useSelector(
    ({ UserReducer }) => UserReducer,
  );
  const dispatch = useDispatch();

  const onFilterPress = async filter => {
    const img = await Functions.openGallery();
    dispatch(setClickedImage(img));
    dispatch(setSelectedFilter(filter?.combo_id));
    navigation.navigate(NavRoutes.Result);
  };

  return (
    <RNContainer useSafeArea>
      <TOHeader title={Strings.ToonMe}>
        <TryForFree />
        <PickerOptions />
        <NativeAd />
        <ImageOptions onFilterPress={onFilterPress} />
      </TOHeader>
      <BouncyCard />
      <HowToUse />
      <Plans visible={showPlans} onClose={() => dispatch(togglePlans())} />
      <UnlockPremium
        visible={showPremium}
        onClose={() => dispatch(togglePremium())}
        isHome={true}
      />
    </RNContainer>
  );
};

export default Home;

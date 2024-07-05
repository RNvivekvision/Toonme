import { useDispatch, useSelector } from 'react-redux';
import { togglePlans } from '../Redux/Actions';
import { RNContainer } from '../Common';
import {
  NativeAd,
  TOHeader,
  TryForFree,
  Plans,
  PickerOptions,
  ImageOptions,
  HowToUse,
} from '../Components';

const Home = () => {
  const { showPlans } = useSelector(({ UserReducer }) => UserReducer);
  const dispatch = useDispatch();

  return (
    <RNContainer useSafeArea>
      <TOHeader title={'Toon Me'}>
        <TryForFree />
        <PickerOptions />
        <ImageOptions />
      </TOHeader>
      <HowToUse />
      <NativeAd />
      <Plans visible={showPlans} onClose={() => dispatch(togglePlans())} />
    </RNContainer>
  );
};

export default Home;

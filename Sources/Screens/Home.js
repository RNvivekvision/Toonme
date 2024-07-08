import { useDispatch, useSelector } from 'react-redux';
import { togglePlans, toggleCamera } from '../Redux/Actions';
import { RNContainer } from '../Common';
import {
  NativeAd,
  TOHeader,
  TryForFree,
  Plans,
  PickerOptions,
  ImageOptions,
  HowToUse,
  CameraModal,
} from '../Components';
import { Strings } from '../Constants';

const Home = () => {
  const { showPlans, showCamera } = useSelector(
    ({ UserReducer }) => UserReducer,
  );
  const dispatch = useDispatch();

  return (
    <RNContainer useSafeArea>
      <TOHeader title={Strings.ToonMe}>
        <TryForFree />
        <PickerOptions />
        <ImageOptions />
      </TOHeader>
      <HowToUse />
      <NativeAd />
      <Plans visible={showPlans} onClose={() => dispatch(togglePlans())} />
      <CameraModal
        visible={showCamera}
        onClose={() => dispatch(toggleCamera())}
      />
    </RNContainer>
  );
};

export default Home;

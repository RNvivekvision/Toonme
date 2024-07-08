import { useDispatch } from 'react-redux';
import { increaseCount } from '../Redux/Actions';
import useGoogleAds from './useGoogleAds';

const useUserClick = () => {
  const dispatch = useDispatch();
  const { showInterstitialAd } = useGoogleAds();

  const incrementCount = async onboard => {
    dispatch(increaseCount());
    await showInterstitialAd(onboard);
  };

  return { incrementCount };
};

export default useUserClick;

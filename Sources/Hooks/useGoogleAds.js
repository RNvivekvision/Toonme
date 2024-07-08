import { useDispatch, useSelector } from 'react-redux';
import {
  AppOpenAd,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';
import { showAdLoader } from '../Redux/Actions';
import { Functions } from '../Utils';

const useGoogleAds = () => {
  const { clickAds, adData, Admob, Admanager1, Admanager2 } = useSelector(
    ({ UserReducer }) => UserReducer,
  );
  const methods = [Admob, Admanager1, Admanager2];
  const dispatch = useDispatch();

  const showAds = async ({
    adType = InterstitialAd,
    testAdId = TestIds.INTERSTITIAL,
    method = methods[0],
    key = 'interstitial',
    count = 0,
    condition,
  }) => {
    try {
      if (!condition) return;

      const AdId = Functions.isDev ? testAdId : method[key];
      const Ad = adType.createForAdRequest(AdId); // initialization...

      console.log('\n\nshowing loader...');
      dispatch(showAdLoader(true)); // Show loader...

      console.log('start loading ad...');
      Ad.load();
      await Functions.wait(2000); // wait for 2 seconds to load ad...

      count++;
      if (!Ad.loaded) {
        console.log('Not Loaded...');
        if (count >= methods.length) {
          console.log('return all methods...');
          return dispatch(showAdLoader(false));
        } else {
          console.log('go to next method...');
          return showAds({
            adType,
            testAdId,
            method: methods[count],
            count,
            key,
            condition,
          });
        }
      } else {
        console.log('ad loaded and condition fulfilled...');
        dispatch(showAdLoader(false));
        return await Ad.show();
      }
    } catch (e) {
      dispatch(showAdLoader(false));
      console.log('Error show Ads -> ', e);
    }
  };

  if (adData?.showAdInApp) {
    return {
      showAppOpenAd: () =>
        showAds({
          adType: AppOpenAd,
          key: 'appOpen',
          testAdId: TestIds.APP_OPEN,
          condition: adData?.splashAd,
        }),
      showInterstitialAd: onboard =>
        showAds({
          adType: InterstitialAd,
          key: 'interstitial',
          testAdId: TestIds.INTERSTITIAL,
          condition: clickAds || onboard,
        }),
      showRewardAd: () => {},
    };
  }

  return {
    showAppOpenAd: () => console.log('showAdInApp: ', adData?.showAdInApp),
    showInterstitialAd: () => console.log('showAdInApp: ', adData?.showAdInApp),
    showRewardAd: () => console.log('showAdInApp: ', adData?.showAdInApp),
  };
};

export default useGoogleAds;

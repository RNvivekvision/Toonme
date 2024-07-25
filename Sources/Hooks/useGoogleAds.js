import { useDispatch, useSelector } from 'react-redux';
import {
  AppOpenAd,
  InterstitialAd,
  RewardedAd,
  TestIds,
} from 'react-native-google-mobile-ads';
import { showAdLoader } from '../Redux/Actions';
import { Functions } from '../Utils';

const useGoogleAds = () => {
  const {
    clickAds,
    adData,
    Admob,
    Admanager1,
    Admanager2,
    subscriptionPurchase,
  } = useSelector(({ UserReducer }) => UserReducer);
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

      console.log('showing ads loader...');
      dispatch(showAdLoader(true)); // Show loader...

      console.log('start loading ads...');
      Ad.load();
      await Functions.wait(2000); // wait for 2 seconds to load ad...

      count++;
      if (!Ad.loaded) {
        console.log('Ads Not Loaded...');
        if (count >= methods.length) {
          console.log('return all Ads methods...');
          return dispatch(showAdLoader(false));
        } else {
          console.log('go to next method of Ads...');
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
        console.log('Ads loaded and condition fulfilled...');
        dispatch(showAdLoader(false));
        await Ad.show();
        return true; // return true especially for reward ads because when user earn reward and then gallery will be open for Toonme App
      }
    } catch (e) {
      dispatch(showAdLoader(false));
      console.log('Error Show Ads -> ', e);
    }
  };

  if (adData?.showAdInApp && !subscriptionPurchase) {
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
      showRewardAd: () =>
        showAds({
          adType: RewardedAd,
          key: 'rewarded',
          testAdId: TestIds.REWARDED,
          condition: true,
        }),
    };
  }

  return {
    showAppOpenAd: () => console.log('showAdInApp: ', adData?.showAdInApp),
    showInterstitialAd: () => console.log('showAdInApp: ', adData?.showAdInApp),
    showRewardAd: () => {
      console.log('showAdInApp: ', adData?.showAdInApp);
      return false; // return false because when there is no ads then user has not to wait for open gallery in UnlockPremium Component
    },
  };
};

export default useGoogleAds;

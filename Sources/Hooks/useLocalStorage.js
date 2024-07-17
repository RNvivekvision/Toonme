import { useEffect, useState } from 'react';
import { Functions } from '../Utils';
import { useDispatch } from 'react-redux';
import { setSubscriptionPurchase } from '../Redux/Actions';

const useLocalStorage = () => {
  const [State, setState] = useState({ localdata: null });
  const dispatch = useDispatch();

  // console.log('useLocalStorage -> ', JSON.stringify(State, null, 2));

  useEffect(() => {
    getDataFromLocalStorage();
    // getDataFromKeychain();
  }, []);

  const getDataFromLocalStorage = async () => {
    try {
      const appdata = await Functions.getAppData('appdata');
      if (appdata !== null) {
        setState(p => ({ ...p, localdata: appdata }));
        // dispatch(setLocalData(appdata));
      }
    } catch (e) {
      console.error('Error getDataFromLocalStorage -> ', e);
    }
  };

  const getDataFromKeychain = async () => {
    try {
      const oldPurchase = await Functions.getSubscription();
      const expiry = oldPurchase?.expiry;
      const currentDate = new Date().getTime();
      const d1 = new Date(expiry);
      const d2 = new Date(currentDate);
      console.log({ d1, d2 });
      // const hasSubscription = purchasedTimestamp < currentDate;
      // dispatch(setSubscriptionPurchase(hasSubscription));
    } catch (e) {
      dispatch(setSubscriptionPurchase(false));
      console.error('Error getDataFromLocalStorage -> ', e);
    }
  };

  return State;
};

export default useLocalStorage;

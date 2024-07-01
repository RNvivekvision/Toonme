import { useEffect, useState } from 'react';
import { Functions } from '../Utils';
// import { useDispatch } from 'react-redux';
// import { setLocalData } from '../Redux/Actions';

const useLocalStorage = () => {
  const [State, setState] = useState({ localdata: null });
  // const dispatch = useDispatch();

  // console.log('useLocalStorage -> ', JSON.stringify(State, null, 2));

  useEffect(() => {
    getDataFromLocalStorage();
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

  return State;
};

export default useLocalStorage;

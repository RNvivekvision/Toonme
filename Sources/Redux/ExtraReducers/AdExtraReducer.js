import DeviceInfo from 'react-native-device-info';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchMethod, URL } from '../../Services';
import { DummyData, Functions } from '../../Utils';
import { getIp } from '@mobeuv/react-native-check-ip';
import { getAllFilters } from '../../Services';
import { Strings } from '../../Constants';

const { appInfo } = DummyData;

const getAdData = createAsyncThunk('getAdData', async () => {
  try {
    const result = await getIp();
    const device = await DeviceInfo.getAndroidId();
    const version = await DeviceInfo.getVersion();

    const Params = {
      logo: appInfo.appIconBase64,
      appName: appInfo.appName,
      packageName: appInfo.packageName,
      apiKeyText: appInfo.appName,
      device: device === 'unknown' ? '84361f1427227255' : device, // unknown means Simulator or Emulator device.
      keyForm: Functions.isDev ? 'Debug' : 'Release',
      ipaddress: result.ipv4,
      version: version,
    };
    // console.log('Params -> ', JSON.stringify(Params, null, 2));

    const response = await FetchMethod.POST({
      EndPoint: URL.createAppRequest,
      NeedToken: false,
      Params: Params,
    });
    // console.log('getAdData -> ', JSON.stringify(response, null, 2));
    if (response?.isSuccess) {
      return response?.data;
    }
  } catch (e) {
    console.error('Error getAdData -> ', e);
    return { error: Strings.errorMsg };
  }
});

const getFilters = createAsyncThunk('getFilters', async () => {
  try {
    const response = await getAllFilters();
    const categories = response?.categories?.sort((a, b) => {
      if (a.category_name < b.category_name) return -1;
      if (a.category_name > b.category_name) return 1;
      return 0;
    });
    return categories;
  } catch (e) {
    console.error('Error getAdData -> ', e);
    return { error: Strings.errorMsg };
  }
});

export { getAdData, getFilters };

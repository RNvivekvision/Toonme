import { Alert, Linking } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const isDev = __DEV__;

const ALERT = ({ Title, Text, Buttons }) => Alert.alert(Title, Text, Buttons);
const wait = ms => new Promise(r => setTimeout(r, ms));
const OpenUrl = url => Linking.openURL(url);

const setAppData = async data => {
  const previousValue = await getAppData();
  if (previousValue) {
    await AsyncStorage.setItem(
      'appdata',
      JSON.stringify({ ...previousValue, ...data }),
    );
  } else {
    await AsyncStorage.setItem('appdata', JSON.stringify(data));
  }
};

const getAppData = async () => {
  const value = await AsyncStorage.getItem('appdata');
  return JSON.parse(value);
};

const Functions = {
  isDev,
  ALERT,
  OpenUrl,
  setAppData,
  getAppData,
  wait,
};

export default Functions;

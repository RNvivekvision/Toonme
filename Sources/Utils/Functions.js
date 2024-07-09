import { Alert, Linking, Platform, Share } from 'react-native';
import Rate, { AndroidMarket } from 'react-native-rate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageCropPicker from 'react-native-image-crop-picker';

const isDev = __DEV__;
const androidPackage = 'com.toonme';
const iosAppId = '6505100117';
const appLink = Platform.select({
  android: `https://play.google.com/store/apps/details?id=${androidPackage}`,
  ios: `https://apps.apple.com/in/app/id${iosAppId}`,
});
const splited = appLink.split('/');
const AppleAppID = splited[splited.length - 1].substring(2);

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

const openCamera = async p => {
  const img = await ImageCropPicker.openCamera({
    width: 300,
    height: 400,
    cropping: true,
    mediaType: 'photo',
    includeBase64: true,
    ...p,
  });
  return img;
};

const openGallery = async p => {
  const img = await ImageCropPicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
    mediaType: 'photo',
    includeBase64: true,
    ...p,
  });
  return img;
};

const RateUs = ({ onSuccess, onError } = {}) => {
  const options = {
    AppleAppID: AppleAppID,
    GooglePackageName: androidPackage,
    AmazonPackageName: androidPackage,
    preferredAndroidMarket: AndroidMarket.Google,
    preferInApp: true,
    openAppStoreIfInAppFails: true,
    fallbackPlatformURL: appLink,
    inAppDelay: 1000,
  };
  Rate.rate(options, (success, error) => {
    if (error) return onError?.(error);
    return onSuccess?.(success);
  });
};

const ShareApp = async ({ title, message, url } = {}) => {
  const Title = 'Toonme - Cartoon From Photos';
  const Message = `Share ${Title} app to your friends. by clicking the following url`;

  await Share.share({
    title: title ?? Title,
    message: message ?? Message,
    url: url ?? appLink,
  });
};

const Functions = {
  isDev,
  ALERT,
  OpenUrl,
  setAppData,
  getAppData,
  openCamera,
  openGallery,
  wait,
  RateUs,
  ShareApp,
};

export default Functions;

import { Alert, Linking, Platform, Share } from 'react-native';
import Rate, { AndroidMarket } from 'react-native-rate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageCropPicker from 'react-native-image-crop-picker';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import RNFS from 'react-native-fs';
import * as Keychain from 'react-native-keychain';

const isDev = __DEV__;
const androidPackage = 'com.cartoon.photo.editor.toonmeapp';
const iosBundleId = 'com.cartoon.photo.editor.toonmeapp';
const iosAppId = '6532614368';
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

const setSubscription = async value => {
  try {
    await Keychain.setGenericPassword('subscription', JSON.stringify(value), {
      service: iosBundleId,
    });
    // await Keychain.resetGenericPassword({
    //   service: iosBundleId,
    // });
    console.log('subscription added in Keychain...');
  } catch (e) {
    console.error('Error setSubscription -> ', e);
  }
};

const getSubscription = async () => {
  try {
    const pass = await Keychain.getGenericPassword({
      service: iosBundleId,
    });
    return JSON.parse(pass.password);
  } catch (e) {
    console.error('Error getSubscription -> ', e);
  }
};

const size = 5000;
const openCamera = async p => {
  const img = await ImageCropPicker.openCamera({
    width: size,
    height: size,
    cropping: true,
    mediaType: 'photo',
    compressImageQuality: 1,
    useFrontCamera: true,
    includeBase64: true,
    ...p,
  });
  return img;
};

const openGallery = async p => {
  const img = await ImageCropPicker.openPicker({
    width: size,
    height: size,
    cropping: true,
    mediaType: 'photo',
    compressImageQuality: 1,
    includeBase64: true,
    ...p,
  });
  return img;
};

const updateImage = async (index, state) => {
  const img = await openGallery();
  const update = state.images?.map((v, i) => (i == index ? img : v));
  return update;
};

const saveToCameraRoll = async cartoon => {
  const downloadDest = `${RNFS.DocumentDirectoryPath}/toonme${Date.now()}.jpg`;
  await RNFS.downloadFile({ fromUrl: cartoon, toFile: downloadDest }).promise;
  await CameraRoll.saveAsset(downloadDest, { type: 'photo' });
  alert('Image saved to camera roll!');
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

const ShareApp = async ({ title, message, url, ...rest } = {}) => {
  const Title = 'Toonme - Cartoon From Photos';
  const Message = `Share ${Title} app to your friends. by clicking the following url`;

  await Share.share({
    title: title ?? Title,
    message: message ?? Message,
    url: url ?? appLink,
    ...rest,
  });
};

const Functions = {
  isDev,
  ALERT,
  OpenUrl,
  setAppData,
  setSubscription,
  getAppData,
  getSubscription,
  openCamera,
  openGallery,
  updateImage,
  saveToCameraRoll,
  wait,
  RateUs,
  ShareApp,
};

export default Functions;

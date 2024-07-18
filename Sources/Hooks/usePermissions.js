import { Platform } from 'react-native';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';

const permissions = Platform.select({
  android: [
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.RECORD_AUDIO,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  ],
  ios: [
    PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY,
    PERMISSIONS.IOS.CAMERA,
    PERMISSIONS.IOS.PHOTO_LIBRARY,
    PERMISSIONS.IOS.MICROPHONE,
  ],
});

const checkPermission = async permission => {
  try {
    const status = await check(permission);
    return status === RESULTS.GRANTED;
  } catch (error) {
    console.error(`Error checking permission ${permission}:`, error);
    return false;
  }
};

const requestPermission = async permission => {
  try {
    const status = await request(permission);
    return status === RESULTS.GRANTED;
  } catch (error) {
    console.error(`Error requesting permission ${permission}:`, error);
    return false;
  }
};

const usePermissions = () => {
  const checkPermissions = async () => {
    const statuses = await Promise.all(permissions.map(checkPermission));
    return statuses.every(status => status);
  };

  const requestPermissions = async () => {
    const statuses = await Promise.all(permissions.map(requestPermission));
    return statuses.every(status => status);
  };

  return { checkPermissions, requestPermissions };
};

export default usePermissions;

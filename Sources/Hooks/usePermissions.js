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

const usePermissions = () => {
  const checkPermission = async () => {
    try {
      const status1 = await check(permissions[0]);
      const status2 = await check(permissions[1]);
      const status3 = await check(permissions[2]);
      const status4 = await request(permissions[3]);
      const isGranted = [status1, status2, status3, status4].every(
        s => s === RESULTS.GRANTED,
      );
      // console.log('check permission -> ', isGranted);
      return isGranted;
    } catch (error) {
      console.error('Error checking usePermission:', error);
      return false;
    }
  };

  const requestPermission = async () => {
    try {
      const status1 = await request(permissions[0]);
      const status2 = await request(permissions[1]);
      const status3 = await request(permissions[2]);
      const status4 = await request(permissions[3]);
      const isGranted = [status1, status2, status3, status4].every(
        s => s === RESULTS.GRANTED,
      );
      // console.log('request permission -> ', isGranted);
      return isGranted;
    } catch (error) {
      console.error('Error requesting usePermission:', error);
      return false;
    }
  };

  return { checkPermission, requestPermission };
};

export default usePermissions;

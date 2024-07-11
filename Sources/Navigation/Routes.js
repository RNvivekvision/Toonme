import { useCallback, useEffect } from 'react';
import Splash from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { NavConfigs, NavRoutes } from './index';
import { useLocalStorage, usePermissions } from '../Hooks';
import { getAdData, getFilters } from '../Redux/ExtraReducers';
import Drawer from './Drawer';
import {
  Onboarding,
  Permissions,
  Steps,
  Preview,
  SelectCartoon,
  Result,
  HotFeature,
  Edit,
  CollageMaker,
} from '../Screens';
import { RNNoInternet } from '../Common';

const Stack = createStackNavigator();

const Routes = () => {
  const { requestPermission } = usePermissions();
  const { localdata } = useLocalStorage();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdData());
    dispatch(getFilters());
    setTimeout(() => {
      Splash.hide();
    }, 2000);
    init();
  }, []);

  const init = async () => {
    await requestPermission();
  };

  const Screens = useCallback(() => {
    return (
      <Stack.Navigator
        initialRouteName={
          localdata?.hasUser ? NavRoutes.Home : NavRoutes.OnBoarding
        }
        screenOptions={NavConfigs.screenOptions}>
        <Stack.Screen name={NavRoutes.OnBoarding} component={Onboarding} />
        <Stack.Screen name={NavRoutes.Permissions} component={Permissions} />
        <Stack.Screen name={NavRoutes.Home} component={Drawer} />
        <Stack.Screen name={NavRoutes.Steps} component={Steps} />
        <Stack.Screen name={NavRoutes.Edit} component={Edit} />
        <Stack.Screen name={NavRoutes.Preview} component={Preview} />
        <Stack.Screen
          name={NavRoutes.SelectCartoon}
          component={SelectCartoon}
        />
        <Stack.Screen name={NavRoutes.Result} component={Result} />
        <Stack.Screen name={NavRoutes.HotFeature} component={HotFeature} />
        <Stack.Screen name={NavRoutes.CollageMaker} component={CollageMaker} />
      </Stack.Navigator>
    );
  }, [localdata]);

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <NavigationContainer>
        <RNNoInternet />
        <Screens />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Routes;

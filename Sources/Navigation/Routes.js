import { useCallback, useEffect } from 'react';
import Splash from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavConfigs, NavRoutes } from './index';
import { Onboarding, Permissions, Steps } from '../Screens';
import { useLocalStorage, usePermissions } from '../Hooks';
import Drawer from './Drawer';
import { useDispatch } from 'react-redux';
import { getAdData } from '../Redux/ExtraReducers';

const Stack = createStackNavigator();

const Routes = () => {
  const { requestPermission } = usePermissions();
  const { localdata } = useLocalStorage();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdData());
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
      </Stack.Navigator>
    );
  }, [localdata]);

  return (
    <NavigationContainer>
      <Screens />
    </NavigationContainer>
  );
};

export default Routes;

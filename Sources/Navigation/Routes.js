import { useEffect } from 'react';
import Splash from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavConfigs, NavRoutes } from './index';
import { Onboarding, Permissions } from '../Screens';
import Drawer from './Drawer';

const Stack = createStackNavigator();

const Routes = () => {
  useEffect(() => {
    setTimeout(() => {
      Splash.hide();
    }, 2000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={NavConfigs.screenOptions}>
        <Stack.Screen name={NavRoutes.Home} component={Drawer} />
        <Stack.Screen name={NavRoutes.OnBoarding} component={Onboarding} />
        <Stack.Screen name={NavRoutes.Permissions} component={Permissions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

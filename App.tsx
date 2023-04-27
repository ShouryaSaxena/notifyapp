/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserRegister from './src/screens/UserRegister';
import UserLogin from './src/screens/UserLogin';
import HomeScreen from './src/screens/HomeScreen';
import {usePushNotification} from './src/hooks/usePushNotification';
import { Text } from 'react-native/types';

const Stack = createNativeStackNavigator();

export default function App () {
  console.log('index file running');
  const {
    // requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotification();

  // console.log('index file running');

  useEffect(() => {
    const listenToNotifications = () => {
      try {
        // requestUserPermission();
        getFCMToken();
        listenToBackgroundNotifications();
        listenToForegroundNotifications();
        onNotificationOpenedAppFromBackground();
        onNotificationOpenedAppFromQuit();
      } catch (error) {
        console.log(error);
      }
    };

    listenToNotifications();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={UserLogin} />
        <Stack.Screen name="Register" component={UserRegister} />
      </Stack.Navigator>
    </NavigationContainer>
    // <Text>New App</Text>
  );
}


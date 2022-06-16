import React, {useEffect, useState} from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';

import MainNavigation from './src/screens/MainNavigation';
import AuthNavigation from './src/screens/AuthNavigation';
import AsyncStorage from '@react-native-community/async-storage';

export default function App() {
  const Stack = createStackNavigator();
  const [accessToken, setAccessToken] = useState<string | null>('');
  const getAccessToken = async () => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      setAccessToken(token);
    } catch (e) {
      console.log(e); //리액트쿼리써서 하자
      //리프레시 토근으로 다시 재요청.
    }
  };

  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
        void getAccessToken();
      }, 2000); //스플래시 활성화 시간 2초
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {accessToken == null ? (
              <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
            ) : (
              <Stack.Screen name="MainNavigation" component={MainNavigation} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({});

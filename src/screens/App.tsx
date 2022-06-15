import React, {useEffect} from 'react';
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
import SplashScreen from 'react-native-splash-screen';
import MainNavigation from './src/screens/MainNavigation';
import AuthNavigation from './src/screens/AuthNavigation';

export default function App() {
  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000); //스플래시 활성화 시간 2초
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <NavigationContainer>
          <AuthNavigation />
          {/* <MainNavigation /> */}
        </NavigationContainer>
      </SafeAreaProvider>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({});

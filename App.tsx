import React, {useEffect, useState} from 'react';
//prettier-ignore
import {RecoilRoot, atom, selector, useRecoilState, useRecoilValue} from 'recoil';
//prettier-ignore
import {useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider} from 'react-query';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {RootStackParamList} from './src/screens/navigator/navigationStackTypes';
import {MainNavigator, StackNavigator} from './src/screens/navigator';
//checkTokens
const queryClient = new QueryClient();
export default function App() {
  const Stack = createStackNavigator<RootStackParamList>();
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
      void getAccessToken();
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000); //스플래시 활성화 시간 2초
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
            {accessToken ? <MainNavigator /> : <StackNavigator />}
          </NavigationContainer>
        </SafeAreaView>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

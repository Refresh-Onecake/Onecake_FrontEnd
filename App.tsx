import React, {useEffect, useState} from 'react';
//prettier-ignore
import {RecoilRoot, atom, selector, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
//prettier-ignore
import {useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider, QueryCache, MutationCache} from 'react-query';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';

import {RootStackParamList} from './src/screens/navigator/navigationStackTypes';
import {MainNavigator, StackNavigator} from './src/screens/navigator';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {appKeys, queryKeys} from './src/enum';
import {IRefreshTokenData} from './src/services';

interface IError {
  message: string;
}
const getMultipleData = async () => {
  try {
    const savedData = await AsyncStorage.multiGet([
      appKeys.accessTokenKey,
      appKeys.refreshTokenKey,
    ]);
    return savedData;
  } catch (error) {
    console.log(error);
  }
};
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: async (err, query) => {
      const response = err as IError;
      const tokens = await getMultipleData();
      if (tokens) {
        if (response.message === '401') {
          await fetch('http://15.165.27.120:8080/api/v1/auth/reissue', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              accessToken: tokens[0][1],
              refreshToken: tokens[1][1],
            }),
          })
            .then(res => res.json())
            .then(async (data: IRefreshTokenData) => {
              await AsyncStorage.multiSet(
                [
                  [appKeys.accessTokenKey, data.accessToken],
                  [appKeys.refreshTokenKey, data.refreshToken],
                ],
                () => {
                  console.log('기존 토큰 리프레쉬');
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                  console.log(`호출 api ${query.queryHash}`);
                },
              );
            });
        }
      }
    },
  }),
});

export default function App() {
  const RootStack = createStackNavigator<RootStackParamList>();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStack.Navigator
              initialRouteName="StackNavigator"
              screenOptions={{
                headerShown: false,
              }}>
              <RootStack.Screen
                name="MainNavigator"
                component={MainNavigator}
              />

              <RootStack.Screen
                name="StackNavigator"
                component={StackNavigator}
              />
            </RootStack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

import React, {ReactNode, useEffect, useState} from 'react';
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
import {appKeys} from './src/enum';
import {refetchToken} from './src/api';
import {StatusBar} from 'react-native';
import codePush from 'react-native-code-push';

interface IError {
  message: string;
}
export const getMultipleData = async () => {
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
          await refetchToken(tokens, query);
        }
      }
    },
  }),
});

const App: () => ReactNode = () => {
  const RootStack = createStackNavigator<RootStackParamList>();
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SafeAreaProvider>
          <StatusBar barStyle="dark-content" />
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
};

export default codePush(App);

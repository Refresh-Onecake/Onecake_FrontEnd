import React, {useEffect, useState} from 'react';
//prettier-ignore
import {RecoilRoot, atom, selector, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
//prettier-ignore
import {useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider, QueryCache} from 'react-query';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';

import {RootStackParamList} from './src/screens/navigator/navigationStackTypes';
import {MainNavigator, StackNavigator} from './src/screens/navigator';

const queryClient = new QueryClient();

export default function App() {
  const RootStack = createStackNavigator<RootStackParamList>();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SafeAreaView style={{flex: 1}}>
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
        </SafeAreaView>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import SignUp from '../auth/SignUp';
import SignIn from '../auth/SignIn';
import SelectUserType from '../auth/SelectUserType';
import FindPwd from '../auth/FindPwd';

import {EnterStore, EnterComplete, EnterStart} from '../enterStore';
import {RootStackParamList} from './navigationStackTypes';
import {MainNavigator} from './MainNavigator';
import {EnterMenuSheet} from '../enterMenu/EnterMenuSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EnterMenu} from '../enterMenu';

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{headerShown: false, headerTitleAlign: 'center'}}>
      {/* 회원 가입 및 로그인 관련*/}
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SelectUserType" component={SelectUserType} />
      <Stack.Screen name="FindPwd" component={FindPwd} />
      <Stack.Screen name="MainNavigator" component={MainNavigator} />
      {/* 판매자 입점 신청 screens */}
      <Stack.Screen
        name="EnterStore"
        component={EnterStore}
        options={{
          headerShown: true,
          headerTitle: '가게 등록',
          headerTitleStyle: styles.headerTitle,
          headerTitleContainerStyle: styles.headerTitleContainer,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen name="EnterComplete" component={EnterComplete} />
      <Stack.Screen name="EnterStart" component={EnterStart} />
      {/* 가게 */}
      <Stack.Screen
        name="EnterMenu"
        component={EnterMenu}
        options={{
          headerShown: true,
          headerTitle: '메뉴 등록',
          headerTitleStyle: styles.headerTitle,
          headerTitleContainerStyle: styles.headerTitleContainer,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="EnterMenuSheet"
        component={EnterMenuSheet}
        options={{
          headerShown: true,
          headerTitle: '주문서 등록',
          headerTitleStyle: styles.headerTitle,
          headerTitleContainerStyle: styles.headerTitleContainer,
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

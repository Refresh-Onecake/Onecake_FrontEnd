import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import SignUp from '../auth/SignUp';
import SignIn from '../auth/SignIn';
import SelectUserType from '../auth/SelectUserType';
import FindPwd from '../auth/FindPwd';

import {EnterStore, EnterComplete, EnterMenu, EnterSheet} from '../enterStore';
import {RootStackParamList} from './navigationStackTypes';
import {MainNavigator} from './MainNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, headerTitleAlign: 'center'}}>
      {/* 회원 가입 및 로그인 관련*/}
      <Stack.Group>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SelectUserType" component={SelectUserType} />
        <Stack.Screen name="FindPwd" component={FindPwd} />
        <Stack.Screen name="MainNavigation" component={MainNavigator} />
      </Stack.Group>
      {/* 판매자 입점 신청 screens */}
      <Stack.Group>
        <Stack.Screen
          name="EnterStore"
          component={EnterStore}
          options={{
            headerShown: true,
            headerTitle: '가게 등록',
            headerTitleStyle: styles.headerTitle,
            headerTitleContainerStyle: styles.headerTitleContainer,
          }}
        />
        <Stack.Screen name="EnterMenu" component={EnterMenu} />
        <Stack.Screen name="EnterSheet" component={EnterSheet} />
        <Stack.Screen name="EnterComplete" component={EnterComplete} />
      </Stack.Group>
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

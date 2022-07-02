import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../auth/SignIn';
import {SignUp, SelectUserType, FindPwd} from '../auth';
import {StoreDetail} from '../store';
import {RootStackParamList} from './navigationStackTypes';
import {MainNavigator} from './MainNavigator';
import {EnterMenuSheet} from '../enterMenu/EnterMenuSheet';
import {EnterStore, EnterComplete, EnterStart} from '../enterStore';
import {EnterMenu} from '../enterMenu';
import {OrderManageList} from '../sellerOrder/OrderManageList';
import {OrderSheet} from '../sellerOrder/OrderSheet';

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
      <Stack.Screen name="StoreDetail" component={StoreDetail} />
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
      {/* 사장님 주문서 */}
      <Stack.Screen name="OrderManageList" component={OrderManageList} />
      <Stack.Screen name="OrderSheet" component={OrderSheet} />
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

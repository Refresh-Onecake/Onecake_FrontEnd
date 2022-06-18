import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import SignUp from '../auth/SignUp';
import SignIn from '../auth/SignIn';
import SelectUserType from '../auth/SelectUserType';
import FindPwd from '../auth/FindPwd';
import MainNavigation from '../MainNavigation';
import {RootStackParamList} from '../../types';

const Stack = createStackNavigator<RootStackParamList>();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SelectUserType" component={SelectUserType} />
      <Stack.Screen name="FindPwd" component={FindPwd} />
      <Stack.Screen name="MainNavigation" component={MainNavigation} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import SignUp from './SignUp';
import SignIn from './SignIn';
import MainNavigation from './MainNavigation';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="MainNavigation" component={MainNavigation} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});

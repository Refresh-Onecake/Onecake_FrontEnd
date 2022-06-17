import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import SignUp from '../auth/SignUp';
import SignIn from '../auth/SignIn';
import SelectUserType from '../auth/SelectUserType';
import FindPwd from '../auth/FindPwd';
import MainNavigation from '../MainNavigation';

const Stack = createStackNavigator();

const AuthNavigation = ({navigation}: {navigation: any}, userType: string) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignIn} navigation={navigation} />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        navigation={navigation}
        userType={userType}
      />
      <Stack.Screen
        name="SelectUserType"
        component={SelectUserType}
        navigation={navigation}
      />
      <Stack.Screen
        name="FindPwd"
        component={FindPwd}
        navigation={navigation}
      />
      <Stack.Screen name="MainNavigation" component={MainNavigation} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});

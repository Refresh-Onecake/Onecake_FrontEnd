import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../styles/AppStyles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList} from './navigator';
import {StackScreenProps} from '@react-navigation/stack';
import {StackActions, useNavigation} from '@react-navigation/native';

const MyPage = () => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('AccessToken');
    } catch (exception) {
      return false;
    }
  };
  return (
    <SafeAreaView style={styles.view}>
      <TouchableOpacity onPress={handleLogout} style={{padding: 10}}>
        <Text style={{fontSize: 40}}>로그아웃</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: AppStyles.color.white},
});

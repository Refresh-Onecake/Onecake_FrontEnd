import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {AppStyles} from '../styles/AppStyles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList} from './navigator';
import {StackScreenProps} from '@react-navigation/stack';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useAsync} from '../hooks';
import {getStringValueFromAsyncStorage} from '../utils';
import {appKeys} from '../enum';
import {SettingSeller} from '../components/seller/SettingSeller';

const MyPage = () => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
    } catch (exception) {
      return false;
    }
  };
  const [role, setRole] = useState<string>();
  const [error, resetError] = useAsync(async () => {
    resetError();
    const fetchData = await getStringValueFromAsyncStorage(
      appKeys.roleTokenKey,
    );
    if (fetchData) {
      setRole(fetchData);
    }
  });
  return (
    <SafeAreaView style={styles.view}>
      {role === appKeys.seller ? (
        <View>
          <SettingSeller />
        </View>
      ) : (
        <View>
          <SettingSeller />
        </View>
      )}
    </SafeAreaView>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: AppStyles.color.white},
});

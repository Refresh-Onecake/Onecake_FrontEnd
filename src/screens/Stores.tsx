import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppStyles} from '../styles/AppStyles';
import {MenuList} from '../components';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from './navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appKeys} from '../enum';
import {useAsync} from '../hooks';
import {getStringValueFromAsyncStorage} from '../utils';

const Stores = ({navigation}: StackScreenProps<RootStackParamList>) => {
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
      {role === 'SELLER' ? (
        // TODO: 사장님 페이지
        <>
          <MenuList />
        </>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default Stores;

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: AppStyles.color.white},
});

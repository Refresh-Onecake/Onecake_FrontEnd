import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppStyles} from '../styles/AppStyles';
import {MenuList} from '../components';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from './navigator';

const Stores = ({navigation}: StackScreenProps<RootStackParamList>) => {
  //FIXME: 하드코딩 부분 이후 로그인 고칠 부분
  const role = 'SELLER';
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

import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppStyles} from '../styles/AppStyles';

const MyPage = () => {
  return (
    <SafeAreaView style={styles.view}>
      <Text>MyPage</Text>
    </SafeAreaView>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: AppStyles.color.white},
});

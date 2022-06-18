import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppStyles} from '../../styles/AppStyles';

export const EnterComplete = () => {
  return (
    <SafeAreaView style={styles.view}>
      <Text>EnterSheet</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
  },
});

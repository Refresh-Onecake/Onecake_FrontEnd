import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppStyles} from '../../styles/AppStyles';

export const EnterStore = () => {
  return (
    <SafeAreaView style={styles.view}>
      <Text>enterStore</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
  },
});

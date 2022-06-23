import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppStyles} from '../styles/AppStyles';

const Stores = () => {
  return (
    <SafeAreaView style={styles.view}>
      <Text>Store</Text>
    </SafeAreaView>
  );
};

export default Stores;

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: AppStyles.color.white},
});

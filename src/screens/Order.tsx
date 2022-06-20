import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppStyles} from '../styles/AppStyles';

const Order = () => {
  return (
    <SafeAreaView style={styles.view}>
      <Text>Order</Text>
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: AppStyles.color.white},
});

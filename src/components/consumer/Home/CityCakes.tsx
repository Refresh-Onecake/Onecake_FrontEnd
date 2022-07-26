import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../styles/AppStyles';

export const CityCakes = () => {
  return (
    <>
      <Text style={styles.title}>우리 동네 케이크</Text>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 35,
    marginLeft: 16,
    fontWeight: '800',
    color: AppStyles.color.black,
    fontSize: 19,
  },
});

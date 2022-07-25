import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../styles/AppStyles';

export const AnniversaryCakes = () => {
  return (
    <>
      <Text style={styles.title}>내가 찾는 기념일 케이크</Text>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '800',
    color: AppStyles.color.black,
    fontSize: 19,
  },
});

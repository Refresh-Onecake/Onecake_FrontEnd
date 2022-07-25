import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../styles/AppStyles';

export const HotCakes = () => {
  return (
    <>
      <TouchableOpacity>
        <Text style={styles.location}>마포구</Text>
      </TouchableOpacity>
      <Image
        style={styles.image}
        source={require('../../../asset/cake.png')}></Image>
      <Text style={styles.mainMent}>이번주 HOT한 케이크</Text>
      <Text style={styles.subMent}>
        오늘의 가장 인기있는 케이크를 찾아보세요!
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  location: {
    fontSize: 18,
    // color: AppStyles.color.white,
  },
  image: {
    width: 376,
    height: 447,
    backgroundColor: 'green',
  },
  mainMent: {
    // position: 'absolute',
    // color: AppStyles.color.white,
    fontWeight: '800',
    fontSize: 25,
  },
  subMent: {
    // position: 'absolute',
    // color: AppStyles.color.white,
    fontSize: 13,
  },
});

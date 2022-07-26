import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
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
      <View style={styles.text}>
        <Text style={styles.mainMent}>이번주 HOT한 케이크</Text>
        <Text style={styles.subMent}>
          오늘의 가장 인기있는 케이크를 찾아보세요!
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  location: {
    fontSize: 18,
    alignSelf: 'center',
    position: 'relative',
    // color: AppStyles.color.white,
  },
  image: {
    width: '100%',
    height: 447,
    backgroundColor: 'green',
  },
  text: {
    position: 'absolute',
    marginLeft: 16,
  },
  mainMent: {
    // position: 'absolute',
    // color: AppStyles.color.white,
    fontWeight: '800',
    fontSize: 25,
    marginBottom: 8,
  },
  subMent: {
    // position: 'absolute',
    // color: AppStyles.color.white,
    fontSize: 13,
  },
});

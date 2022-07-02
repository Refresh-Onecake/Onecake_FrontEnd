import {StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../styles/AppStyles';
import {apiClient} from '../../services';
import axios from 'axios';
import {useForm} from 'react-hook-form';

const phoneWidth = Dimensions.get('window').width;
const TabIndicatorWidth = (phoneWidth / 3).toFixed();

export default function TabView() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <TouchableOpacity style={styles.indicator}>
        <Text>메뉴</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.indicator}>
        <Text>가게 정보</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.indicator}>
        <Text>리뷰</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: AppStyles.color.white,
  },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppStyles.color.white,
    width: +TabIndicatorWidth,
    height: 47,
  },
});

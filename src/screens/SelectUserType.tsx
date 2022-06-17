import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';
import {AppStyles} from '../styles/AppStyles';

const SelectUserType = ({navigation}) => {
  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };
  return (
    <SafeAreaProvider style={styles.wrapper}>
      <TouchableOpacity onPress={goToSignUp} style={styles.typeBtn}>
        <Text>소비자</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToSignUp} style={styles.typeBtn}>
        <Text>판매자</Text>
      </TouchableOpacity>
    </SafeAreaProvider>
  );
};

export default SelectUserType;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: AppStyles.color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeBtn: {
    justifyContent: 'flex-end',
    borderRadius: 16,
    width: 178,
    height: 186,
    marginBottom: 21,
    alignItems: 'center',
    // IOS
    shadowColor: '#000000', //그림자색
    shadowOpacity: 0.3, //그림자 투명도
    shadowOffset: {width: 2, height: 2}, //그림자 위치
    //ANDROID
    elevation: 3,
  },
});

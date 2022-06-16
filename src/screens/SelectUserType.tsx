import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';

const SelectUserType = ({navigation}) => {
  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };
  return (
    <SafeAreaProvider>
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
  typeBtn: {
    width: 178,
    height: 186,
    backgroundColor: 'yellow',
    marginBottom: 21,
  },
});

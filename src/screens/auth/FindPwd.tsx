import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import { RootStackParamList } from '../navigator';


const FindPwd = ({navigation}: StackScreenProps<RootStackParamList>) => {
  return (
    <View>
      <Text>FindPwd</Text>
    </View>
  );
};

export default FindPwd;

const styles = StyleSheet.create({});

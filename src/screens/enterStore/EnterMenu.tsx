import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppStyles} from '../../styles/AppStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigator';

export const EnterMenu = ({
  navigation,
}: StackScreenProps<RootStackParamList>) => {
  return (
    <SafeAreaView style={styles.view}>
      <Text>EnterMenu</Text>
      <TouchableOpacity onPress={() => navigation.navigate('EnterSheet')}>
        <Text>디음으로</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
  },
});

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../../styles/AppStyles';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigator';

export const EnterSheet = ({
  navigation,
}: StackScreenProps<RootStackParamList>) => {
  return (
    <SafeAreaView style={styles.view}>
      <Text>EnterSheet</Text>
      <TouchableOpacity onPress={() => navigation.navigate('EnterComplete')}>
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

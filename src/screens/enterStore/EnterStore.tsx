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
import {ProgressBar} from '../../components';

export const EnterStore = ({
  navigation,
}: StackScreenProps<RootStackParamList>) => {
  return (
    <SafeAreaView style={styles.view}>
      <ProgressBar progress={33} />
      <TouchableOpacity onPress={() => navigation.navigate('EnterMenu')}>
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

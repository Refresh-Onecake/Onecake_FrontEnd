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

export const EnterComplete = ({
  navigation,
}: StackScreenProps<RootStackParamList>) => {
  return (
    <SafeAreaView style={styles.view}>
      <Text>EnterComplete</Text>
      <TouchableOpacity onPress={() => navigation.navigate('EnterStore')}>
        <Text>신청하기</Text>
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

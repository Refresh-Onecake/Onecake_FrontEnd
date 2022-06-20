import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment} from 'react';
import {AppStyles} from '../../styles/AppStyles';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigator';
import {styles as EnterStoreStyle} from './EnterStore';
import {ProgressBar} from '../../components';
export const EnterStart = ({
  navigation,
}: StackScreenProps<RootStackParamList>) => {
  return (
    <Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: AppStyles.color.white}} />
      <SafeAreaView style={styles.view}>
        <View style={styles.container}>
          <View style={styles.textWrapper}>
            <Text style={styles.title}>사장님, 반갑습니다!</Text>
            <Text style={styles.subTitle}>
              입점 신청부터 가게 등록까지 진행합니다.
            </Text>
          </View>
          <View style={{flex: 1}} />
          <TouchableOpacity
            style={EnterStoreStyle.submitBtn}
            onPress={() => navigation.navigate('EnterStore')}>
            <Text style={EnterStoreStyle.submitText}>입점 신청하기</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: AppStyles.color.hotPink,
  },
  container: {
    flex: 1,
    backgroundColor: AppStyles.color.backgroundGray,
  },
  textWrapper: {
    backgroundColor: AppStyles.color.white,
    paddingHorizontal: AppStyles.padding.screen,
    paddingTop: 100,
    paddingBottom: AppStyles.padding.screen,
  },
  title: {
    fontSize: AppStyles.font.title,
    fontWeight: '700',
    color: AppStyles.color.black,
    paddingBottom: 14,
  },
  subTitle: {
    fontSize: AppStyles.font.subTitle,
    fontWeight: '400',
    color: AppStyles.color.black,
    opacity: 0.5,
  },
});

import {
  Image,
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

export const EnterComplete = ({
  navigation,
}: StackScreenProps<RootStackParamList>) => {
  return (
    <Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: AppStyles.color.hotPink,
        }}>
        <View style={styles.view}>
          <View style={styles.headerWrap}>
            <View style={{marginTop: 40, marginBottom: 20}}></View>
            <Text style={styles.Title}>입점신청을 완료했어요!</Text>
            <Text style={styles.subTitle}>
              원케이크에 오신 것을 환영합니다.
            </Text>
            <Text style={styles.subTitle}>
              원케이크를 통해 케이크를 판매해보세요.
            </Text>
          </View>
          <View style={{flex: 1}} />
          <TouchableOpacity
            style={EnterStoreStyle.submitBtn}
            onPress={() =>
              navigation.reset({
                routes: [{name: 'MainNavigator', params: {screen: 'Home'}}],
              })
            }>
            <Text style={EnterStoreStyle.submitText}>시작하기</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
  },
  headerWrap: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.color.white,
    paddingHorizontal: AppStyles.padding.screen,
    height: '25%',
    paddingBottom: AppStyles.padding.screen,
  },
  Title: {
    width: '100%',
    fontWeight: '700',
    fontSize: 23,
    color: AppStyles.color.black,
    marginBottom: 14,
  },
  subTitle: {
    width: '100%',
    color: AppStyles.color.black,
    opacity: 0.5,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
  },
});

import {
  Image,
  Platform,
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
export const EnterStart = ({
  navigation,
}: StackScreenProps<RootStackParamList>) => {
  return (
    <Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: AppStyles.color.hotPink,
        }}>
        <View style={styles.view}>
          <Text style={styles.title}>사장님, 반갑습니다!</Text>
          <Text style={styles.subTitle}>
            입점 신청부터 가게 등록까지 진행합니다.
          </Text>
        </View>
        <View
          style={{
            backgroundColor: AppStyles.color.white,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../asset/seller.png')}
            style={{width: 274.3, height: 386.95}}
          />
        </View>
        <TouchableOpacity
          style={EnterStoreStyle.submitBtn}
          onPress={() => navigation.navigate('EnterStore')}>
          <Text style={EnterStoreStyle.submitText}>입점 신청하기</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
  },
  title: {
    paddingLeft: 30,
    fontSize: AppStyles.font.title,
    color: AppStyles.color.black,
    paddingTop: 77,
    ...Platform.select({
      android: {
        fontFamily: 'NotoSansKR-Bold',
      },
      ios: {
        fontWeight: '700',
        paddingBottom: 14,
      },
    }),
  },
  subTitle: {
    paddingLeft: 30,
    fontSize: AppStyles.font.subTitle,
    color: AppStyles.color.black,
    opacity: 0.5,
    ...Platform.select({
      android: {
        fontFamily: 'NotoSansKR-Medium',
        lineHeight: 16,
      },
      ios: {fontWeight: '400'},
    }),
  },
});

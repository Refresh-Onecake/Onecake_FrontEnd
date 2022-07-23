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
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigator';
import {styles as EnterStoreStyle} from './EnterStore';
import {useNavigation} from '@react-navigation/native';
import {useLogoutAndReSignQuery} from '../../hooks';
import {fetchLogout} from '../../services';

export const EnterComplete = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const logoutMutation = useLogoutAndReSignQuery(fetchLogout, navigation);
  const onClickEnterStore = () => {
    logoutMutation.mutate();
  };
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
            <View style={{marginTop: 60, marginBottom: 20}}></View>
            <Text style={styles.Title}>입점신청을 완료했어요!</Text>
            <Text style={styles.subTitle}>
              원케이크에 오신 것을 환영합니다.
            </Text> 
            <Text style={styles.subTitle}>
              원케이크를 통해 케이크를 판매해보세요.
            </Text>
          </View>
          <View style={styles.imgWrap}>
            <Image
              style={styles.img}
              source={require('../../asset/congratulation.png')}
            />
          </View>
          <TouchableOpacity
            style={EnterStoreStyle.submitBtn}
            onPress={onClickEnterStore}>
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
  imgWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 500,
    height: 500,
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

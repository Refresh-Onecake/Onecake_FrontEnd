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
      <SafeAreaView style={styles.view}>
        <View style={styles.headerWrap}>
          <View style={{marginTop: 40, marginBottom: 20}}>
            <Image
              style={{width: 56, height: 56}}
              source={require('../../asset/checkIcon.png')}
            />
          </View>
          <View>
            <Image
              style={{width: 230, height: 30}}
              source={require('../../asset/enterStoreComplete.png')}
            />
          </View>
        </View>
        <View
          style={{flex: 1, backgroundColor: AppStyles.color.backgroundGray}}
        />
        <TouchableOpacity
          style={EnterStoreStyle.submitBtn}
          onPress={() => navigation.navigate('MainNavigation')}>
          <Text style={EnterStoreStyle.submitText}>시작하기</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView
        style={{flex: 0, backgroundColor: AppStyles.color.hotPink}}
      />
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
});

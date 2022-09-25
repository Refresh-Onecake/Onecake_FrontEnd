import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProfileCard from '../../components/seller/SellerMyPage/ProfileCard';
import {Header} from '../../components/common/Header';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigator';

export const SellerMyPage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const rightHeaderHandler = () => {
    navigation.navigate('Setting');
  };
  return (
    <SafeAreaView>
      <Header
        rightIcon={require('../../asset/setting.png')}
        rightOnPress={rightHeaderHandler}
      />
      <View>
        <ProfileCard />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

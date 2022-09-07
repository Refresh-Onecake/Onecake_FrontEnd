import {Alert, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {AppStyles} from '../../../styles/AppStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../screens/navigator';
import InfoModal from '../../common/InfoModal';
import {useLogoutAndReSignQuery} from '../../../hooks';
import {fetchLogout, fetchResign} from '../../../services';
import {useRecoilState} from 'recoil';
import {profileEditState} from '../../../recoil/atom';
import {useGetUserProfile} from '../../../hooks/Query/Common';

export const SettingSeller = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const logoutMutation = useLogoutAndReSignQuery(fetchLogout, navigation);

  const {data, refetch} = useGetUserProfile();
  const logout = useCallback(() => {
    Alert.alert(
      '로그아웃하기',
      '로그아웃하시겠어요?',
      [
        {
          text: '취소하기',
        },
        {
          text: '로그아웃하기',
          onPress: () => {
            logoutMutation.mutate();
          },
        },
      ],
      {cancelable: false},
    );
  }, [logoutMutation]);

  const onClickReSign = useCallback(() => {
    navigation.navigate('StackNavigator', {
      screen: 'ReSign',
    });
  }, [navigation]);

  const onClickProfileEdit = useCallback(() => {
    refetch();
    navigation.navigate('StackNavigator', {
      screen: 'ProfileEdit',
    });
  }, [data, refetch]);

  const onClickProfileInfoEdit = useCallback(() => {
    navigation.navigate('StackNavigator', {
      screen: 'ProfileInfoEdit',
    });
  }, [navigation]);

  return (
    <View>
      <View
        style={[
          styles.Wrap,
          {borderBottomWidth: 1, borderBottomColor: AppStyles.color.border},
        ]}>
        <Text
          style={[
            styles.text,
            {
              fontWeight: Platform.OS === 'ios' ? '700' : '800',
              paddingBottom: 37,
            },
          ]}>
          프로필
        </Text>
        <TouchableOpacity onPress={onClickProfileEdit}>
          <Text
            style={[
              styles.text,
              {
                fontWeight: '500',
                paddingBottom: 37,
              },
            ]}>
            프로필 수정
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClickProfileInfoEdit}>
          <Text style={[styles.text, {fontWeight: '500'}]}>정보 설정</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.Wrap}>
        <Text style={[styles.text, {fontWeight: '700', paddingBottom: 37}]}>
          계정
        </Text>
        <TouchableOpacity onPress={logout}>
          <Text style={[styles.text, {fontWeight: '500', paddingBottom: 37}]}>
            로그아웃
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClickReSign}>
          <Text style={[styles.text, {fontWeight: '500'}]}>탈퇴하기</Text>
        </TouchableOpacity>
      </View>
      <InfoModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Wrap: {
    paddingVertical: 23,
    paddingHorizontal: AppStyles.padding.screen,
  },
  text: {
    fontSize: 14,
    color: '#1B1B1B',
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
    }),
  },
});

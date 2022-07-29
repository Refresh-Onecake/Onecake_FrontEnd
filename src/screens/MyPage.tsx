import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {AppStyles} from '../styles/AppStyles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList} from './navigator';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useAsync, useLogoutAndReSignQuery} from '../hooks';
import {getStringValueFromAsyncStorage} from '../utils';
import {appKeys} from '../enum';
import {SettingSeller} from '../components/seller/SettingSeller';
import {fetchLogout} from '../services';

const MyPage = () => {
  const [role, setRole] = useState<string>();
  const [error, resetError] = useAsync(async () => {
    resetError();
    const fetchData = await getStringValueFromAsyncStorage(
      appKeys.roleTokenKey,
    );
    if (fetchData) {
      setRole(fetchData);
    }
  });
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const logoutMutation = useLogoutAndReSignQuery(fetchLogout, navigation);

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
  }, []);

  return (
    <SafeAreaView style={styles.view}>
      {role === appKeys.seller ? (
        <View>
          <SettingSeller />
        </View>
      ) : (
        <View>
          <TouchableOpacity onPress={logout}>
            <Text>로그아웃하기</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: AppStyles.color.white},
});

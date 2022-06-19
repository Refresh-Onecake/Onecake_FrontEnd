import axios from 'axios';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {useState} from 'react';
import {AppStyles} from '../../styles/AppStyles';
import {RootStackParamList} from '../../types';
import {StackScreenProps} from '@react-navigation/stack';
import {doSignIn} from '../../services';

const SignIn = ({navigation}: StackScreenProps<RootStackParamList>) => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <SafeAreaProvider style={styles.signInWrapper}>
      <View
        style={{
          width: 87,
          height: 87,
          backgroundColor: 'hotpink',
          marginBottom: 17,
        }}></View>
      <Text
        style={{
          fontSize: 40,
          fontWeight: '600',
        }}>
        Onecake.
      </Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="아이디"
          value={id}
          onChangeText={setId}
          style={styles.textInput}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          style={styles.textInput}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => doSignIn({id, password}, navigation)}>
        <Text style={{color: '#ffffff'}}>로그인</Text>
      </TouchableOpacity>
      <View style={styles.texts}>
        <Text onPress={() => navigation.navigate('SelectUserType')}>
          회원가입
        </Text>
        <Text onPress={() => navigation.navigate('FindPwd')}>
          비밀번호 찾기
        </Text>
      </View>
    </SafeAreaProvider>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  signInWrapper: {
    backgroundColor: AppStyles.color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    width: 270,
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.color.black,
  },
  textInput: {
    width: 270,
    borderBottomColor: AppStyles.color.border,
  },
  loginBtn: {
    marginTop: 26,
    width: 270,
    height: 42,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3196',
  },
  texts: {
    width: 270,
    marginTop: 31,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

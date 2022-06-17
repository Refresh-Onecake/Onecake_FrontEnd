import axios from 'axios';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import {useForm} from 'react-hook-form';
import Modal from 'react-native-simple-modal';
import React, {useState} from 'react';
import {AppStyles} from '../../styles/AppStyles';

const SignIn = ({navigation}: {navigation: any}) => {
  const URL = 'http://15.165.27.120:8080';
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  interface userData {
    user_id: string;
    password: string;
    accessToken: string;
    refreshToken: string;
    TokenExpires: number;
  }

  // save Tokens
  const doSignIn = async () => {
    try {
      const {data} = await axios.post<userData>(URL + '/api/v1/auth/login', {
        user_id: id,
        password: password,
      });
      await AsyncStorage.multiSet([
        ['AccessToken', data.accessToken],
        ['RefreshToken', data.refreshToken],
      ]);
      console.log(data.accessToken);
      navigation.navigate('MainNavigation');
    } catch (e) {
      setVisible(true);
      return <Text>아아아</Text>;
    }
  };

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
      <TouchableOpacity style={styles.loginBtn} onPress={doSignIn}>
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

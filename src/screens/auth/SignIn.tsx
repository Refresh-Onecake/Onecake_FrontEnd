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
import Modal from 'react-native-modal';
import React, {useState} from 'react';
import {AppStyles} from '../../styles/AppStyles';
import {useMutation} from 'react-query';
import {RootStackParamList} from '../navigator';
import {StackScreenProps} from '@react-navigation/stack';
import {Controller, useForm} from 'react-hook-form';
import {ISignIn, getUserData} from '../../services';

type IUserInfo = {
  id: string;
  password: string;
};

const SignIn = ({navigation}: StackScreenProps<RootStackParamList>) => {
  const URL = 'http://15.165.27.120:8080'; // modal
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IUserInfo>({
    defaultValues: {
      id: '',
      password: '',
    },
  });

  interface userData {
    user_id: string;
    password: string;
    accessToken: string;
    refreshToken: string;
    TokenExpires: number;
  }

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  // save Tokens
  const doSignIn = async (info: ISignIn) => {
    try {
      const {data} = await axios.post<userData>(URL + '/api/v1/auth/login', {
        user_id: info.id,
        password: info.password,
      });
      // await AsyncStorage.multiSet([
      //   ['AccessToken', data.accessToken],
      //   ['RefreshToken', data.refreshToken],
      // ]);
      console.log(data);
      navigation.navigate('MainNavigation');
    } catch (e) {
      toggleModal();
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
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="아이디"
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="id"
        />
        {errors.id && (
          <Text style={styles.errorText}>아이디를 입력해주세요</Text>
        )}
      </View>
      <View style={styles.inputWrapper}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              placeholder="비밀번호"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.textInput}
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={styles.errorText}>비밀번호를 입력해주세요</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={handleSubmit(doSignIn)}>
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
      <Modal isVisible={modalVisible}>
        <View style={styles.modal}>
          <Text>
            로그인 정보가 일치하지 않습니다. 아이디나 비밀번호를 확인 후 다시
            입력해 주세요.
          </Text>
          <TouchableOpacity style={styles.modalBtn} onPress={toggleModal}>
            <Text style={{color: AppStyles.color.white}}>확인</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaProvider>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  signInWrapper: {
    backgroundColor: AppStyles.color.white,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    width: 270,
    borderBottomWidth: 1,
    height: 70,
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
  modal: {
    padding: AppStyles.padding.screen,
    borderColor: 'black',
    borderRadius: 7,
    height: 170,
    backgroundColor: AppStyles.color.white,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modalBtn: {
    width: 72,
    height: 30,
    borderRadius: 21,
    backgroundColor: AppStyles.color.hotPink,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  errorText: {
    fontSize: 12,
    color: AppStyles.color.pink,
    opacity: 0.7,
    paddingTop: 2,
  },
});

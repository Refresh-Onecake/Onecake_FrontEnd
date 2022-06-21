import axios from 'axios';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Controller, useForm} from 'react-hook-form';
import React, {useState} from 'react';
import {AppStyles} from '../../styles/AppStyles';
import {useMutation} from 'react-query';
import {StackScreenProps} from '@react-navigation/stack';
import {getUserData, ISignIn} from '../../services';
import {RootStackParamList} from '../navigator';

export type IFormInputs = {
  id: string;
  password: string;
};

const SignIn = ({navigation}: StackScreenProps<RootStackParamList>) => {
  //Id, Pwd
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  //modal
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    watch,
    clearErrors,
    formState: {errors},
  } = useForm<IFormInputs>({
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const signInQuery = useMutation((user: ISignIn) => getUserData(user), {
    onSuccess: data => {
      // await AsyncStorage.multiSet([
      //   ['AccessToken', data.accessToken],
      //   ['RefreshToken', data.refreshToken],
      // ]);
      console.log(data.accessToken);
    },
    onError: errors => {
      toggleModal();
    },
  });

  const doSignIn = (data: IFormInputs) => {
    console.log(data.id);
    const user: ISignIn = {
      id: data.id,
      password: data.password,
    };
    console.log(data.id);
    signInQuery.mutate(user);
  };

  return (
    <SafeAreaView style={styles.signInWrapper}>
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
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="아이디"
              value={id}
              onChangeText={setId}
              style={styles.textInput}
            />
          </View>
        )}
      />
      id: id;
      {errors.id && (
        <Text style={styles.errorText}>한글만 입력 가능합니다.</Text>
      )}
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
      <Modal isVisible={modalVisible}>
        <View style={styles.modal}>
          <Text>
            로그인 정보가 일치하지 않습니다.아이디나 비밀번호를 확인 후 다시
            입력해 주세요.
          </Text>
          <TouchableOpacity style={styles.modalBtn} onPress={toggleModal}>
            <Text style={{color: AppStyles.color.white}}>확인</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
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

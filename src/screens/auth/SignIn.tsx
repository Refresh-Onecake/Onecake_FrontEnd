import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import {AppStyles} from '../../styles/AppStyles';
import {useMutation} from 'react-query';
import {Controller, useForm} from 'react-hook-form';
import {ISignIn, getUserData} from '../../services';
import {Button} from '../../components/common/Button';

type IUserInfo = {
  id: string;
  password: string;
};

const SignIn = ({navigation}: StackScreenProps<RootStackParamList>) => {
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

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const signInQuery = useMutation((user: ISignIn) => getUserData(user), {
    onSuccess: data => {
      // await AsyncStorage.multiSet([
      //   ['AccessToken', data.accessToken],
      //   ['RefreshToken', data.refreshToken],
      // ]);
      navigation.navigate('MainNavigation');
    },
    // TODO: AccessToken값 만료 시 리프레시 토큰으로 재요청.
    onError: (errors, query) => {
      console.log(errors, query);
      toggleModal();
    },
  });

  const doSignIn = ({id, password}: IUserInfo) => {
    const user: ISignIn = {
      id: id,
      password: password,
    };
    signInQuery.mutate(user);
  };
//   const doSignIn = () => {
//     navigation.navigate('MainNavigator', {
//       screen: 'Home',
//     });
//   };
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
      {/* <View style={{width: 270, padding: AppStyles.padding.screen, height: 42}}>
        <Button onPress={handleSubmit(doSignIn)}>
          <Text>로그인</Text>
        </Button>
      </View> */}

      <View style={styles.loginBtn}>
        <Button onPress={handleSubmit(doSignIn)} text="로그인"></Button>
      </View>
      <View style={styles.texts}>
        <Text onPress={() => navigation.navigate('SelectUserType')}>
          회원가입
        </Text>
        <Text onPress={() => navigation.navigate('FindPwd')}>
          비밀번호 찾기
        </Text>
      </View>
      <Modal isVisible={modalVisible}>
        <SafeAreaView style={styles.modal}>
          <Text>
            로그인 정보가 일치하지 않습니다. 아이디나 비밀번호를 확인 후 다시
            입력해 주세요.
          </Text>
          <TouchableOpacity style={styles.modalBtn} onPress={toggleModal}>
            <Text style={{color: AppStyles.color.white}}>확인</Text>
          </TouchableOpacity>
        </SafeAreaView>
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

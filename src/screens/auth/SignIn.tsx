import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Platform,
  Image,
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
      navigation.navigate('MainNavigator', {
        screen: 'Home',
      });
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
    <SafeAreaView style={styles.signInWrapper}>
      <View>
        <Image
          style={{width: 87.91, height: 87.91, marginBottom: 17.23}}
          source={require('../../asset/login_logo.png')}
        />
      </View>
      <Text style={styles.title}>Onecake.</Text>
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
              selectionColor={AppStyles.color.placeholder}
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
              selectionColor={AppStyles.color.placeholder}
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={styles.errorText}>비밀번호를 입력해주세요</Text>
        )}
      </View>
      <View style={styles.loginBtn}>
        <Button onPress={handleSubmit(doSignIn)} text="로그인"></Button>
      </View>
      <View style={styles.texts}>
        <Text
          style={styles.authText}
          onPress={() => navigation.navigate('SelectUserType')}>
          회원가입
        </Text>
        <Text
          style={styles.authText}
          onPress={() => navigation.navigate('FindPwd')}>
          아이디/비밀번호 찾기
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
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    fontSize: 28,
    lineHeight: 42,
    paddingBottom: 52,
  },
  signInWrapper: {
    backgroundColor: AppStyles.color.white,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    width: 270,
    borderBottomWidth: 0.7,
    height: Platform.OS === 'android' ? 70 : 40,
    borderBottomColor: AppStyles.color.black,
  },
  textInput: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '400',
    width: 270,
    ...Platform.select({
      ios: {
        height: 40,
      },
    }),
    borderBottomColor: AppStyles.color.border,
    color: AppStyles.color.black,
  },
  loginBtn: {
    marginTop: 26,
    width: 270,
    height: 42,
  },
  texts: {
    width: 194,
    marginTop: 31,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  authText: {
    fontSize: 13,
    fontWeight: '400',
    color: AppStyles.color.black,
    opacity: 0.5,
  },
});

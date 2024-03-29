import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Platform,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {RootStackParamList} from '../navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import {AppStyles} from '../../styles/AppStyles';
import {useMutation} from 'react-query';
import {Controller, useForm} from 'react-hook-form';
import {ISignIn, getUserData, IRefreshToken} from '../../api';
import {Button} from '../../components/common/Button';
import {appKeys} from '../../enum';
import {AutoFocusProvider, useAutoFocus} from '../../contexts';
import SplashScreen from 'react-native-splash-screen';
import {useSetRecoilState} from 'recoil';
import {storeIdState} from '../../recoil/atom';
import InfoModal from '../../components/common/InfoModal';
import {StackScreenProps} from '@react-navigation/stack';

type IUserInfo = {
  id: string;
  password: string;
};

const SignIn = ({navigation}: StackScreenProps<RootStackParamList>) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [findIdVisible, setFindIdVisible] = useState<boolean>(false);
  const [findPwdVisible, setFindPwdVisible] = useState<boolean>(false);
  const setStoreId = useSetRecoilState(storeIdState);

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

  useEffect(() => {
    const getMultipleData = async () => {
      try {
        const savedData = await AsyncStorage.getItem(appKeys.accessTokenKey);
        return savedData;
      } catch (error) {
        console.log(error);
      }
    };
    getMultipleData()
      .then(resp => {
        if (resp) {
          navigation.reset({
            routes: [{name: 'MainNavigator', params: {screen: 'Home'}}],
          });
          SplashScreen.hide();
        } else {
          SplashScreen.hide();
        }
      })
      .catch(err => {
        SplashScreen.hide();
      });
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const signInQuery = useMutation((user: ISignIn) => getUserData(user), {
    onSuccess: async data => {
      setStoreId(data.storeId);
      await AsyncStorage.multiSet([
        [appKeys.accessTokenKey, data.accessToken],
        [appKeys.refreshTokenKey, data.refreshToken],
        [appKeys.roleTokenKey, data.role],
        [appKeys.storeIdKey, String(data.storeId)],
      ]);
      navigation.reset({
        routes: [{name: 'MainNavigator', params: {screen: 'Home'}}],
      });
    },
    onError: errors => {
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

  const TextInputRef = useRef<TextInput | null>(null);
  const setFocus = useCallback(
    () => TextInputRef.current?.focus(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [TextInputRef.current],
  );
  const autoFocus = useAutoFocus();

  return (
    <SafeAreaView style={styles.signInWrapper}>
      <AutoFocusProvider contentContainerStyle={styles.signInWrapper}>
        <View>
          <Image
            style={{width: 87.91, height: 87.91, marginBottom: 17.23}}
            source={require('../../asset/login_logo.png')}
          />
        </View>
        <View style={{paddingTop: 13.23, paddingBottom: 50.94}}>
          <Image
            style={{width: 143.38, height: 25.68, resizeMode: 'contain'}}
            source={require('../../asset/login_title.png')}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                onFocus={autoFocus}
                placeholder="아이디"
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholderTextColor={AppStyles.color.darkGray}
                selectionColor={AppStyles.color.hotPink}
                value={value}
              />
            )}
            name="id"
          />
        </View>
        {errors.id && (
          <Text style={styles.errorText}>아이디를 입력해주세요</Text>
        )}
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
                onFocus={autoFocus}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={true}
                style={styles.textInput}
                placeholderTextColor={AppStyles.color.darkGray}
                selectionColor={AppStyles.color.hotPink}
              />
            )}
            name="password"
          />
        </View>
        {errors.password && (
          <Text style={styles.errorText}>비밀번호를 입력해주세요</Text>
        )}
        <View style={styles.loginBtn}>
          <Button onPress={handleSubmit(doSignIn)}>
            <Text
              style={{
                color: AppStyles.color.white,
                fontFamily: 'AppleSDGothicNeo-Bold',
              }}>
              로그인
            </Text>
          </Button>
        </View>
        <View style={styles.texts}>
          <Text
            style={styles.authText}
            onPress={() => navigation.navigate('SelectUserType')}>
            회원가입
          </Text>
          <View style={styles.bar}></View>
          <Text style={styles.authText} onPress={() => setFindIdVisible(true)}>
            아이디 찾기
          </Text>
          <View style={styles.bar}></View>
          <Text style={styles.authText} onPress={() => setFindPwdVisible(true)}>
            비밀번호 찾기
          </Text>
        </View>
        <InfoModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title={'로그인 정보 오류'}
          subTitle={
            '로그인 정보가 일치하지 않습니다. 아이디나 비밀번호를 확인 후 다시 입력해 주세요.'
          }
        />
        <InfoModal
          modalVisible={findIdVisible}
          setModalVisible={setFindIdVisible}
          title={'아이디 찾기'}
          subTitle={'아이디 찾기는 관리자에게 문의 부탁드립니다.'}
        />
        <InfoModal
          modalVisible={findPwdVisible}
          setModalVisible={setFindPwdVisible}
          title={'비밀번호 찾기'}
          subTitle={'비밀번호 찾기는 관리자에게 문의 부탁드립니다.'}
        />
      </AutoFocusProvider>
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
    height: 40,
    borderBottomColor: AppStyles.color.black,
  },
  textInput: {
    fontSize: 13,
    fontWeight: '400',
    width: 270,
    height: 40,
    ...Platform.select({
      ios: {},
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
    }),
  },
  loginBtn: {
    marginTop: 26,
    width: 270,
    height: 42,
  },
  texts: {
    width: 240,
    marginTop: 30,
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
    justifyContent: 'space-evenly',
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
    width: 270,
    fontSize: 12,
    color: AppStyles.color.pink,
    paddingTop: 3.66,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
    }),
  },
  authText: {
    fontSize: 13,
    fontWeight: '400',
    color: AppStyles.color.black,
    opacity: 0.5,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
    }),
  },
  bar: {
    height: '100%',
    borderColor: 'grey',
    width: 1,
    backgroundColor: AppStyles.color.IconColor,
  },
});

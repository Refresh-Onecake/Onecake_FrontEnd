import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useForm, Controller} from 'react-hook-form';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {regEx} from '../utils';
import {AppStyles} from '../AppStyles';
import {Value} from 'react-native-reanimated';
const TEST_PHONE_NUMBER = '+82 010-4183-2998';

export type IFormInputs = {
  name: string;
  id: string;
  password: string;
  confirmPasswd: string;
};

const SignUp = () => {
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult>();
  const [code, setCode] = useState<string>('');
  const [validatedPhoneAuth, setValidatedPhoneAuth] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const convertPhoneNumber = (phoneNumber: string) => {
    const tmpNumber = phoneNumber.replace(/[-\s]/gi, '');
    const prevNum = tmpNumber.substring(0, 3);
    const nextNum = tmpNumber.substring(4, tmpNumber.length);
    return prevNum + nextNum;
  };
  const confirmCode = async () => {
    try {
      await confirm
        ?.confirm(code)
        .then(res => {
          const validatedNumber = res?.user.phoneNumber;
          validatedNumber === TEST_PHONE_NUMBER
            ? setValidatedPhoneAuth(true)
            : setValidatedPhoneAuth(false);
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log('Invalid code.');
    }
  };

  const signInWithPhoneNumber = async (number: string) => {
    await auth()
      .signInWithPhoneNumber(number)
      .then(res => {
        setConfirm(res);
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  //prettier-ignore
  const {control, handleSubmit, watch, formState: {errors}} = useForm<IFormInputs>({
      defaultValues: {
      name: '',
      id: '',
      password: '',
      confirmPasswd: '',
    },
  });

  const [checkNameIcon, setCheckNameIcon] = useState<boolean>(false);
  const [checkIdIcon, setCheckIdIcon] = useState<boolean>(false);
  const [passwdIcon, setPasswdIcon] = useState<boolean>(false);
  const [validPasswdText, setValidPasswdText] = useState<boolean>(false);
  const [confirmPasswdIcon, setConfirmPasswdIcon] = useState<boolean>(false);
  const [confirmPasswdText, setConfirmPasswdText] = useState<boolean>(false);
  // onChange되었을 때 이름을 위한 유효성 검사
  useEffect(() => {
    const subscription = watch((value, {name, type}) => {
      if (value.name && regEx.regName.test(value.name)) {
        setCheckNameIcon(true);
      } else {
        setCheckNameIcon(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [checkNameIcon, watch]);

  // onChange되었을 때 ID를 위한 유효성 검사
  useEffect(() => {
    const subscription = watch((value, {name, type}) => {
      if (value.id && regEx.regId.test(value.id)) {
        setCheckIdIcon(true);
      } else {
        setCheckIdIcon(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [checkIdIcon, watch]);

  // onChange되었을 때 password를 위한 유효성 검사
  useEffect(() => {
    const subscription = watch((value, {name, type}) => {
      if (value.password && regEx.regPassWord.test(value.password)) {
        setValidPasswdText(true);
      } else {
        setValidPasswdText(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [checkIdIcon, watch]);

  //onChange되었을 때 password를 더블체크를 위한 유효성 검사
  useEffect(() => {
    const subscription = watch((value, {name, type}) => {
      if (value.password && value.confirmPasswd && validPasswdText) {
        if (value.password === value.confirmPasswd) {
          setConfirmPasswdText(true);
        } else {
          setConfirmPasswdText(false);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [validPasswdText, checkIdIcon, watch]);

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView>
        <View style={styles.signUpWrapper}>
          <View style={styles.header}>
            <Text style={styles.h1}>회원가입</Text>
            <Text style={styles.subText}>원케이크의 회원이 되어주세요!</Text>
          </View>
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: regEx.regName,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputText}>이름</Text>
                  <View style={styles.inputFlex}>
                    <TextInput
                      style={styles.textInput}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      selectionColor={'lightgray'}
                      placeholder="이름 입력"
                    />
                    <View style={styles.iconWrapper}>
                      <Icon
                        name="check-bold"
                        size={AppStyles.IconSize.inputIcon}
                        color={
                          checkNameIcon
                            ? AppStyles.color.pink
                            : AppStyles.color.gray
                        }
                      />
                    </View>
                  </View>
                </View>
              )}
              name="name"
            />
            {errors.name && (
              <Text style={styles.errorText}>한글만 입력 가능합니다.</Text>
            )}

            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 6,
                pattern: regEx.regId,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputText}>아이디</Text>
                  <View style={styles.inputFlex}>
                    <TextInput
                      style={styles.textInput}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      selectionColor={'lightgray'}
                      placeholder="영문,숫자 6자 이상"
                    />
                    <View style={styles.iconWrapper}>
                      <Icon
                        name="check-bold"
                        size={AppStyles.IconSize.inputIcon}
                        color={
                          checkIdIcon
                            ? AppStyles.color.pink
                            : AppStyles.color.gray
                        }
                      />
                    </View>
                  </View>
                </View>
              )}
              name="id"
            />
            {errors.id && (
              <Text style={styles.errorText}>
                영문과 숫자는 1개 이상 포함 해주세요.
              </Text>
            )}

            <Controller
              control={control}
              rules={{
                required: true,
                minLength: 8,
                pattern: regEx.regPassWord,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputText}>비밀번호</Text>
                  <View style={styles.inputFlex}>
                    <TextInput
                      secureTextEntry={!passwdIcon}
                      style={styles.textInput}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      selectionColor={'lightgray'}
                      placeholder="영문, 숫자, 특수문자 8자 이상"
                    />
                    <TouchableOpacity
                      style={styles.iconWrapper}
                      onPress={() => setPasswdIcon(!passwdIcon)}>
                      <Icon
                        name="eye-off-outline"
                        size={AppStyles.IconSize.inputIcon}
                        color={
                          passwdIcon
                            ? AppStyles.color.pink
                            : AppStyles.color.gray
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              name="password"
            />
            {validPasswdText && (
              <Text style={styles.errorText}>
                사용할 수 있는 비밀번호입니다.
              </Text>
            )}
            {errors.password && (
              <Text style={styles.errorText}>
                영문, 숫자, 특수문자(@$!%*#?&)는 1개 이상 포함해주세요.
              </Text>
            )}

            <Controller
              control={control}
              rules={{
                required: true,
                validate: () => confirmPasswdText === true,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputText}>비밀번호 확인</Text>
                  <View style={styles.inputFlex}>
                    <TextInput
                      secureTextEntry={!confirmPasswdIcon}
                      style={styles.textInput}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      selectionColor={'lightgray'}
                      placeholder="영문, 숫자, 특수문자 8자 이상"
                    />
                    <TouchableOpacity
                      style={styles.iconWrapper}
                      onPress={() => setConfirmPasswdIcon(!confirmPasswdIcon)}>
                      <Icon
                        name="eye-off-outline"
                        size={AppStyles.IconSize.inputIcon}
                        color={
                          confirmPasswdIcon
                            ? AppStyles.color.pink
                            : AppStyles.color.gray
                        }
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              name="confirmPasswd"
            />
            {confirmPasswdText && (
              <Text style={styles.errorText}>비밀번호가 일치합니다.</Text>
            )}
            {errors.confirmPasswd && (
              <Text style={styles.errorText}>
                비밀번호와 동일하게 작성해주세요.
              </Text>
            )}
          </View>
        </View>

        <View style={[styles.signUpWrapper, {marginTop: 6}]}>
          <Text style={styles.h1}>약관 동의</Text>
          <View>
            <View style={styles.termHeader}>
              <TouchableOpacity style={styles.iconWrapper}>
                <Icon
                  name="checkbox-marked-circle"
                  size={AppStyles.IconSize.checkIcon}
                />
              </TouchableOpacity>
              <Text style={styles.h2}>전체 동의합니다.</Text>
            </View>
            <View style={styles.termModalWrap}>
              <View style={styles.iconWrapper}>
                <Icon
                  name="checkbox-marked-circle"
                  size={AppStyles.IconSize.checkIcon}
                />
              </View>
              <Text style={styles.h3}>[필수] 원케이크 이용약관 동의</Text>
              <TouchableOpacity style={styles.iconWrapper}>
                <Icon
                  name="checkbox-marked-circle"
                  size={AppStyles.IconSize.checkIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.termModalWrap}>
              <View style={styles.iconWrapper}>
                <Icon
                  name="checkbox-marked-circle"
                  size={AppStyles.IconSize.checkIcon}
                />
              </View>
              <Text style={styles.h3}>[필수] 개인정보 수집 및 이용에 동의</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit(onSubmit)}>
            <Text>원케이크 시작하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  termsWrapper: {},
  signUpWrapper: {
    backgroundColor: AppStyles.color.white,
    padding: AppStyles.padding.screen,
  },
  header: {
    paddingTop: 60.06,
    paddingBottom: 20,
  },
  h1: {
    marginBottom: 8.65,
    fontWeight: '700',
    fontSize: 23,
    lineHeight: 28,
    color: AppStyles.color.black,
  },
  h2: {
    fontWeight: '500',
    fontSize: 17,
    lineHeight: 22,
    color: AppStyles.color.black,
  },
  h3: {
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 18,
    color: AppStyles.color.gray,
    opacity: 0.5,
  },
  subText: {
    color: AppStyles.color.black,
    opacity: 0.5,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.color.border,
    marginTop: AppStyles.padding.screen,
  },
  inputFlex: {
    flexDirection: 'row',
  },
  inputText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 14.4,
    color: AppStyles.color.black,
    opacity: 0.5,
  },
  textInput: {
    fontSize: 15,
    flex: 1,
    color: AppStyles.color.black,
    opacity: 0.5,
    paddingLeft: 0,
  },
  errorText: {
    fontSize: 12,
    color: AppStyles.color.pink,
    opacity: 0.7,
    paddingTop: 2,
  },
  termHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.color.border,
    paddingBottom: 12,
  },
  termModalWrap: {
    paddingTop: 14,
    flexDirection: 'row',
  },
  submitBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: AppStyles.color.pink,
    height: 56,
    borderRadius: 12,
  },
});

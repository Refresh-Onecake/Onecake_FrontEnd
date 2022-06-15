import {
  Alert,
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
import App from '../../App';
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
  const {control, handleSubmit, watch, clearErrors ,formState: {errors}} = useForm<IFormInputs>({
      defaultValues: {
      name: '',
      id: '',
      password: '',
      confirmPasswd: '',
    },
  });

  // 유효성 검사 및 회원가입 폼 관련 상태
  const [checkNameIcon, setCheckNameIcon] = useState<boolean>(false);
  const [checkIdIcon, setCheckIdIcon] = useState<boolean>(false);
  const [passwdIcon, setPasswdIcon] = useState<boolean>(false);
  const [validPasswdText, setValidPasswdText] = useState<boolean>(false);
  const [confirmPasswdIcon, setConfirmPasswdIcon] = useState<boolean>(false);
  const [confirmPasswdText, setConfirmPasswdText] = useState<boolean>(false);

  // 약관동의 관련상태
  const [checkedTermAll, setCheckedTermAll] = useState<boolean>(false);
  const [checkedOneCakeTerm, setCheckedOneCakeTerm] = useState<boolean>(false);
  const [checkedPrivacyTerm, setCheckedPrivacyTerm] = useState<boolean>(false);

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

  //검증 후 에러가 있어서 다시 비밀번호를 입력하였을 때
  useEffect(() => {
    confirmPasswdText && clearErrors('confirmPasswd');
  }, [confirmPasswdText, clearErrors]);

  const onSubmit = data => {
    console.log(data);
    if (checkedOneCakeTerm === false || checkedPrivacyTerm === false) {
      Alert.alert(
        '약관 동의',
        '원케이크 이용약관 및 개인정보 수집 및 이용에 동의해주세요.',
        [
          {
            text: '확인',
            style: 'cancel',
          },
        ],
      );
    }
  };

  // 이용약관 전체 동의 시
  const handleCheckTermAll = () => {
    if (checkedTermAll) {
      setCheckedOneCakeTerm(false);
      setCheckedPrivacyTerm(false);
    } else {
      setCheckedOneCakeTerm(true);
      setCheckedPrivacyTerm(true);
    }
    setCheckedTermAll(!checkedTermAll);
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
                        size={AppStyles.IconSize.small}
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
                        size={AppStyles.IconSize.small}
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
                        size={AppStyles.IconSize.small}
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
                        size={AppStyles.IconSize.small}
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
          <Text style={[styles.h1, {marginBottom: AppStyles.padding.screen}]}>
            약관 동의
          </Text>
          <View>
            <View style={styles.termHeader}>
              <TouchableOpacity
                style={styles.iconWrapper}
                onPress={() => handleCheckTermAll()}>
                <Icon
                  name="checkbox-marked-circle"
                  size={AppStyles.IconSize.large}
                  color={
                    checkedTermAll ? AppStyles.color.pink : AppStyles.color.gray
                  }
                />
              </TouchableOpacity>
              <Text style={styles.h2}>전체 동의합니다.</Text>
            </View>
            <View style={styles.termModalWrap}>
              <TouchableOpacity
                style={styles.iconWrapper}
                onPress={() => setCheckedOneCakeTerm(!checkedOneCakeTerm)}>
                <Icon
                  name="checkbox-marked-circle"
                  size={AppStyles.IconSize.large}
                  color={
                    checkedOneCakeTerm
                      ? AppStyles.color.pink
                      : AppStyles.color.gray
                  }
                />
              </TouchableOpacity>
              <Text style={[styles.h3, {flex: 1}]}>
                [필수] 원케이크 이용약관 동의
              </Text>
              <View style={styles.iconWrapper}>
                <Icon name="chevron-right" size={AppStyles.IconSize.xlarge} />
              </View>
            </View>
            <View style={styles.termModalWrap}>
              <TouchableOpacity
                style={styles.iconWrapper}
                onPress={() => setCheckedPrivacyTerm(!checkedPrivacyTerm)}>
                <Icon
                  name="checkbox-marked-circle"
                  size={AppStyles.IconSize.large}
                  color={
                    checkedPrivacyTerm
                      ? AppStyles.color.pink
                      : AppStyles.color.gray
                  }
                />
              </TouchableOpacity>
              <Text style={[styles.h3, {flex: 1}]}>
                [필수] 개인정보 수집 및 이용에 동의
              </Text>
              <View style={styles.iconWrapper}>
                <Icon name="chevron-right" size={AppStyles.IconSize.xlarge} />
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.submitBtnText}>원케이크 시작하기</Text>
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
    alignItems: 'center',
  },
  submitBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: AppStyles.padding.screen,
    backgroundColor: AppStyles.color.pink,
    height: 56,
    borderRadius: 12,
  },
  submitBtnText: {
    fontWeight: '700',
    fontSize: 15,
    color: AppStyles.color.white,
  },
});

//prettier-ignore
import {Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useForm, Controller} from 'react-hook-form';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import {useMutation} from 'react-query';
import {StackScreenProps} from '@react-navigation/stack';

import {regEx} from '../../utils';
import {AppStyles} from '../../styles/AppStyles';
import {countryCodes, ICountryCode} from '../../utils';
import {fetchSignUp, ISignUp} from '../../services';
import {RootStackParamList} from '../navigator';
import {appKeys} from '../../enum';
import {AutoFocusProvider, useAutoFocus} from '../../contexts';

export type IFormInputs = {
  name: string;
  id: string;
  password: string;
  confirmPasswd: string;
};
type Props = StackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp: FC<Props> = ({route, navigation}) => {
  const {userType} = route.params;
  console.log(userType);
  //문자 인증 관련 상태
  //prettier-ignore
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult>();
  const [code, setCode] = useState<string>('');
  const [validatedPhoneAuth, setValidatedPhoneAuth] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<ICountryCode>({
    name: 'korea',
    dial_code: '+82',
    code: 'KR',
  });
  //prettier-ignore
  const [validPhoneNumberText, setValidPhoneNumberText] = useState<boolean>(false);
  //prettier-ignore
  const [authPhoneNumberForm, setAuthPhoneNumberForm] = useState<boolean>(false);

  //modal관련
  const [isModalVisible, setModalVisible] = useState(false);

  // 유효성 검사 및 회원가입 폼 관련 상태
  const [checkNameIcon, setCheckNameIcon] = useState<boolean>(false);
  const [checkIdIcon, setCheckIdIcon] = useState<boolean>(false);
  const [passwdIcon, setPasswdIcon] = useState<boolean>(false);
  const [validPasswdText, setValidPasswdText] = useState<boolean>(false);
  const [confirmPasswdIcon, setConfirmPasswdIcon] = useState<boolean>(false);
  const [confirmPasswdText, setConfirmPasswdText] = useState<boolean>(false);

  // 약관동의 관련 상태
  const [checkedTermAll, setCheckedTermAll] = useState<boolean>(false);
  const [checkedOneCakeTerm, setCheckedOneCakeTerm] = useState<boolean>(false);
  const [checkedPrivacyTerm, setCheckedPrivacyTerm] = useState<boolean>(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // 회원가입 query
  const signUpQuery = useMutation((user: ISignUp) => fetchSignUp(user), {
    onSuccess: data => {
      userType === appKeys.consumer
        ? navigation.navigate('EnterStore')
        : navigation.navigate('MainNavigator', {screen: 'Home'});
    },
    onError: errors => {
      Alert.alert(
        '회원가입 실패',
        '다시 한번 시도해주시거나 관리자에게 문의해주세요.',
        [
          {
            text: '확인',
            style: 'cancel',
          },
        ],
      );
    },
  });
  // 모달 내에서 아이템을 클릭했을 때 핸들러
  const handleRenderItemClick = ({name, dial_code, code}: ICountryCode) => {
    const selectedObject = {
      name,
      dial_code,
      code,
    };
    setSelectedCountry(selectedObject);
    console.log(selectedObject);
  };

  // TODO: 이후에 관심사 분리를 통해 뺄 컴포넌트;
  const RenderItem = ({data}: {data: ICountryCode}) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => handleRenderItemClick(data)}>
      <Text
        style={
          selectedCountry.name === data.name
            ? {color: AppStyles.color.pink}
            : {color: AppStyles.color.gray}
        }>
        {data.name}, {data.code}
      </Text>
      <Text>{data.dial_code}</Text>
    </TouchableOpacity>
  );

  // 사용하지 않는 함수이나 이후 필요할 수 있어서 남겨둠.
  // const convertPhoneNumber = (phoneNumber: string) => {
  //   const tmpNumber = phoneNumber.replace(/[-\s]/gi, '');
  //   const prevNum = tmpNumber.substring(0, 3);
  //   const nextNum = tmpNumber.substring(4, tmpNumber.length);
  //   return prevNum + nextNum;
  // };

  //문자인증 버튼을 눌렀을 때 핸들러
  const handleSMSPhoneAuth = () => {
    const authPhoneNumber = `${selectedCountry.dial_code} ${phoneNumber}`;
    console.log(authPhoneNumber);
    void signInWithSMS(authPhoneNumber);
  };

  //문자 인증번호 인증 함수
  const confirmCode = async () => {
    try {
      await confirm
        ?.confirm(code)
        .then(res => {
          console.log(res);
          setValidatedPhoneAuth(true);
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log('Invalid code.');
    }
  };

  //문자 인증 요청
  const signInWithSMS = async (number: string) => {
    await auth()
      .signInWithPhoneNumber(number)
      .then(res => {
        setConfirm(res);
        console.log(res);
        setAuthPhoneNumberForm(true);
      })
      .catch(err => {
        console.log(err);
        setAuthPhoneNumberForm(false);
      });
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

  // 키보드가 인풋을 가려서 포커싱 됐을 때 스크롤 되도록 하는 커스텀 훅
  const TextInputRef = useRef<TextInput | null>(null);
  const setFocus = useCallback(
    () => TextInputRef.current?.focus(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [TextInputRef.current],
  );
  const autoFocus = useAutoFocus();

  // 회원가입 제출
  const onSubmit = (data: IFormInputs) => {
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
    } else if (!confirmPasswdText) {
      Alert.alert('문자 인증', '문자 인증을 올바르게 해 주세요.', [
        {
          text: '확인',
          style: 'cancel',
        },
      ]);
    } else {
      // TODO: API 통신이 들어갈 곳.
      const signUpUser: ISignUp = {
        user_id: data.id,
        password: data.password,
        name: data.name,
        phone_number: phoneNumber,
        member_type: userType,
      };

      console.log(signUpUser);
      signUpQuery.mutate(signUpUser);
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

  // 입력한 전화번호가 010-4183-2998과 같은 형태인지 검증
  useEffect(() => {
    regEx.regPhoneNumber.test(phoneNumber)
      ? setValidPhoneNumberText(true)
      : setValidPhoneNumberText(false);
  }, [phoneNumber]);

  return (
    <Fragment>
      <SafeAreaView style={{flex: 0, backgroundColor: AppStyles.color.white}} />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <AutoFocusProvider contentContainerStyle={styles.flex}>
            {/* 회원가입 폼 컴포넌트 */}
            <View style={styles.signUpWrapper}>
              <View style={styles.header}>
                <Text style={styles.h1}>회원가입</Text>
                <Text style={styles.subText}>
                  원케이크의 회원이 되어주세요!
                </Text>
              </View>
              <View>
                {/* 이름 입력 필드 */}
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
                          onFocus={autoFocus}
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
                {/* id 입력 필드 */}
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
                          onFocus={autoFocus}
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
                {/* 비밀번호 입력 필드 */}
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
                          onFocus={autoFocus}
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
                {/* 비밀번호 확인 입력 필드 */}
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
                          onFocus={autoFocus}
                          value={value}
                          selectionColor={'lightgray'}
                          placeholder="영문, 숫자, 특수문자 8자 이상"
                        />
                        <TouchableOpacity
                          style={styles.iconWrapper}
                          onPress={() =>
                            setConfirmPasswdIcon(!confirmPasswdIcon)
                          }>
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
            {/* 문자인증 컴포넌트 */}
            <View style={[styles.signUpWrapper, {marginTop: 6}]}>
              <Text style={styles.inputText}>휴대폰 번호</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                {/* 국제번호 선택 컴포넌트 */}
                <View style={styles.phoneNumberInputWrap}>
                  <TouchableOpacity
                    style={styles.dropdown}
                    onPress={toggleModal}>
                    <Text>
                      {selectedCountry.dial_code} {selectedCountry.code}
                    </Text>
                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <Icon
                        name="chevron-down"
                        size={AppStyles.IconSize.small}
                      />
                    </View>
                  </TouchableOpacity>
                  <Modal
                    isVisible={isModalVisible}
                    style={{margin: AppStyles.padding.large}}>
                    <View style={styles.modalStyle}>
                      <FlatList
                        data={countryCodes}
                        renderItem={({item}) => <RenderItem data={item} />}
                        keyExtractor={(item: ICountryCode) => item.code}
                      />
                      <TouchableOpacity
                        style={[
                          styles.btn,
                          {paddingVertical: 10, borderRadius: 7, marginTop: 20},
                        ]}
                        onPress={toggleModal}>
                        <Text style={{color: AppStyles.color.white}}>닫기</Text>
                      </TouchableOpacity>
                    </View>
                  </Modal>
                  <TextInput
                    style={[styles.textInput]}
                    keyboardType="number-pad"
                    placeholder="전화번호"
                    onFocus={autoFocus}
                    selectionColor={'lightgray'}
                    onChangeText={setPhoneNumber}
                  />
                </View>
                <TouchableOpacity
                  style={[
                    styles.btn,
                    {
                      borderRadius: 5,
                      paddingHorizontal: 11,
                      paddingVertical: 6,
                    },
                  ]}
                  disabled={!validPhoneNumberText}
                  onPress={handleSMSPhoneAuth}>
                  <Text
                    style={{
                      color: AppStyles.color.white,
                      fontSize: AppStyles.font.small,
                    }}>
                    인증 받기
                  </Text>
                </TouchableOpacity>
              </View>
              {!validPhoneNumberText && (
                <Text style={styles.errorText}>
                  - 를 포함하여 입력해주세요.(예시 : 010-0000-0000)
                </Text>
              )}
            </View>
            {authPhoneNumberForm && (
              <View
                style={{
                  backgroundColor: AppStyles.color.white,
                  paddingHorizontal: AppStyles.padding.screen,
                  paddingBottom: AppStyles.padding.screen,
                }}>
                <Text>인증 번호</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      borderBottomColor: AppStyles.color.border,
                      marginRight: 10,
                      height: 40,
                    }}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="인증번호 6자리 입력"
                      onFocus={autoFocus}
                      selectionColor={'lightgray'}
                      onChangeText={setCode}
                    />
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.btn,
                      {
                        borderRadius: 5,
                        paddingHorizontal: 11,
                        paddingVertical: 6,
                      },
                    ]}
                    onPress={() => confirmCode()}>
                    <Text
                      style={{
                        color: AppStyles.color.white,
                        fontSize: AppStyles.font.small,
                      }}>
                      입력하기
                    </Text>
                  </TouchableOpacity>
                </View>
                {validatedPhoneAuth && (
                  <Text style={styles.errorText}>인증 되었습니다.</Text>
                )}
              </View>
            )}
            {/* TODO: 약관 동의 컴포넌트 */}
            <View style={[styles.signUpWrapper, {marginTop: 6}]}>
              <Text
                style={[styles.h1, {marginBottom: AppStyles.padding.screen}]}>
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
                        checkedTermAll
                          ? AppStyles.color.pink
                          : AppStyles.color.gray
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
                    <Icon
                      name="chevron-right"
                      size={AppStyles.IconSize.xlarge}
                    />
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
                    <Icon
                      name="chevron-right"
                      size={AppStyles.IconSize.xlarge}
                    />
                  </View>
                </View>
              </View>
              {/* 회원가입 제출 버튼 */}
              <TouchableOpacity
                style={[
                  styles.btn,
                  {
                    flex: 1,
                    height: 56,
                    borderRadius: 12,
                    marginTop: AppStyles.padding.screen,
                  },
                ]}
                onPress={handleSubmit(onSubmit)}>
                <Text style={styles.submitBtnText}>원케이크 시작하기</Text>
              </TouchableOpacity>
              {/* FIXME: 이후 개발 다 끝나면 삭제할 요소 */}
              <TouchableOpacity
                onPress={() => navigation.navigate('EnterStart')}>
                <Text>입점 신청 테스트</Text>
              </TouchableOpacity>
            </View>
          </AutoFocusProvider>
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={{flex: 0, backgroundColor: AppStyles.color.white}} />
    </Fragment>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
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
    height: 40,
  },
  inputText: {
    fontSize: 14,
    fontWeight: '500',
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
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.color.pink,
    // height: 56,
    // borderRadius: 12,
  },
  submitBtnText: {
    fontWeight: '700',
    fontSize: 15,
    color: AppStyles.color.white,
  },
  // 문자 인증 관련
  phoneNumberInputWrap: {
    flex: 1,
    marginRight: 10,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.color.border,
  },
  dropdown: {
    backgroundColor: AppStyles.color.lightGray,
    flexDirection: 'row',
    paddingHorizontal: 7,
    borderRadius: 14,
    marginRight: 10,
  },
  modalStyle: {
    backgroundColor: AppStyles.color.white,
    padding: 20,
  },
  modalItem: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderBottomColor: AppStyles.color.border,
  },
});

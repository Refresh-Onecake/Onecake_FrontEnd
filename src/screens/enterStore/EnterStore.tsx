//prettier-ignore
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Alert, Image, Platform} from 'react-native';
import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {useMutation} from 'react-query';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useForm, Controller} from 'react-hook-form';
import Modal from 'react-native-modal';
import Postcode from 'react-native-daum-postcode';

import {AppStyles} from '../../styles/AppStyles';
import {RootStackParamList} from '../navigator';
import {
  IAddress,
  IEnterStoreInputForm,
  IFetchEnterStore,
  IStoreImg,
} from './types';
import {AutoFocusProvider, useAutoFocus} from '../../contexts';
import {
  assert,
  handleImageUpload,
  parseTime,
  timeFormatToKorea,
} from '../../utils';
import DatePicker from 'react-native-date-picker';
import {
  fetchEnterPicture,
  fetchEnterStoreJson,
  fetchLogout,
  refetchToken,
} from '../../services';
import {getMultipleData} from '../../../App';
import {useLogoutAndReSignQuery} from '../../hooks';
import {useNavigation} from '@react-navigation/native';

export const EnterStore = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  //로그아웃
  const logoutMutation = useLogoutAndReSignQuery(fetchLogout, navigation);

  //가게 사진
  const [storeImg, setStoreImg] = useState<IStoreImg>();
  const [storeImgUrl, setStoreImgUrl] = useState<string>();

  //modal관련
  const [isModalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState<IAddress>();

  //운영시간
  const [pickerStatus, setPickerStatus] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    clearErrors,
    formState: {errors},
  } = useForm<IEnterStoreInputForm>();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // 키보드가 인풋을 가려서 포커싱 됐을 때 스크롤 되도록 하는 커스텀 훅
  const TextInputRef = useRef<TextInput | null>(null);
  const autoFocus = useAutoFocus();

  const pictureMutation = useMutation(
    async (pictureObj: IStoreImg) =>
      await fetchEnterPicture(pictureObj).then(async res => {
        if (!res?.ok) {
          if (res?.status === 401) {
            const tokens = await getMultipleData();
            refetchToken(tokens);
          }
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.text();
        }
      }),
    {
      retry: 3,
      onSuccess: data => {
        console.log(data);
        console.log('사진등록 성공');
        const formValue = watch();
        assert(address !== undefined, '입점신청에 주소는 무조건 신청해야한다.');
        assert(data !== undefined, '사진 등록은 성공하였으나 s3문제가 발생');
        const tmp = {
          store_name: formValue.store_name,
          business_registration_number: formValue.business_registration_number,
          store_phone_number: formValue.store_phone_number,
          store_discription: formValue.store_discription,
          kakao_channel_url: formValue.kakao_channel_url,
          address: address,
          store_image: data,
          open_time: openTime,
          close_time: closeTime,
        };
        enterStoreMutation.mutate(tmp);
      },
      onError: e => {
        console.log(e);
      },
    },
  );

  const enterStoreMutation = useMutation(
    async (fetchData: IFetchEnterStore) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await fetchEnterStoreJson(fetchData).then(async res => {
        if (!res?.ok) {
          if (res?.status === 401) {
            const tokens = await getMultipleData();
            refetchToken(tokens);
          }
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.json();
        }
      }),
    {
      retry: 3,
      onSuccess: data => {
        console.log(data);
        console.log('입점신청 성공');
        navigation.navigate('EnterComplete');
        // logoutMutation.mutate();
      },
      onError: e => {
        console.log(e);
      },
    },
  );

  const onSubmit = ({
    store_discription,
    store_name,
    business_registration_number,
    store_phone_number,
    kakao_channel_url,
  }: IEnterStoreInputForm) => {
    assert(storeImg !== undefined, '사진 업로드 오류');
    pictureMutation.mutate(storeImg);
  };
  return (
    <Fragment>
      <SafeAreaView style={styles.view}>
        <ScrollView style={{backgroundColor: AppStyles.color.white}}>
          {/* 가게 이름 등록 필드 */}
          <View
            style={{
              paddingHorizontal: AppStyles.padding.screen,
              paddingVertical: 30,
            }}>
            <AutoFocusProvider contentContainerStyle={[styles.flex]}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <View>
                    <Text style={styles.inputTitle}>가게 이름</Text>
                    <View style={styles.InputWrapper}>
                      <TextInput
                        style={styles.subText}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        onFocus={autoFocus}
                        placeholderTextColor={AppStyles.color.darkGray}
                        selectionColor={AppStyles.color.hotPink}
                        placeholder="가게 이름을 입력해주세요."
                      />
                    </View>
                  </View>
                )}
                name="store_name"
              />
              {errors.store_name && (
                <Text style={styles.errorText}>가게 이름을 입력해주세요.</Text>
              )}
              {/* 사업자번호 등록 필드 */}
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <View>
                    <Text style={styles.inputTitle}>사업자 등록번호</Text>
                    <View style={styles.InputWrapper}>
                      <TextInput
                        style={styles.subText}
                        keyboardType="decimal-pad"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        onFocus={autoFocus}
                        value={value}
                        placeholderTextColor={AppStyles.color.darkGray}
                        selectionColor={AppStyles.color.hotPink}
                        placeholder="사업자 등록번호를 입력해주세요."
                      />
                    </View>
                  </View>
                )}
                name="business_registration_number"
              />
              {errors.business_registration_number && (
                <Text style={styles.errorText}>
                  사업자 등록번호를 입력해주세요.
                </Text>
              )}
              {/* 사진 등록 - use-hook-form을 활용하지 않는다. */}
              <View>
                <Text style={[styles.inputTitle, {paddingBottom: 20}]}>
                  케이크 대표 사진
                </Text>
                <View style={styles.imageWrapper}>
                  <TouchableOpacity
                    style={styles.selectImage}
                    onPress={() => handleImageUpload(setStoreImg)}>
                    <Icon
                      name="plus"
                      size={27}
                      color={AppStyles.color.hotPink}
                    />
                    <Text style={styles.imgInfo}>
                      {storeImg ? '이미지 (1/1)' : '이미지 (0/1)'}
                    </Text>
                  </TouchableOpacity>
                  {storeImg && (
                    <Image
                      style={styles.selectImage}
                      source={{uri: storeImg?.uri}}
                    />
                  )}
                </View>
              </View>
              {/* 가게 위치 */}
              {/* form에 추가 되지 않음 */}
              <View>
                <Text style={styles.inputTitle}>가게 위치</Text>

                <TouchableOpacity
                  style={styles.InputWrapper}
                  onPress={toggleModal}>
                  <TextInput
                    style={[styles.subText, {color: AppStyles.color.black}]}
                    placeholderTextColor={AppStyles.color.darkGray}
                    selectionColor={AppStyles.color.hotPink}
                    placeholder="도로명 주소를 입력해주세요."
                    editable={false}
                    selectTextOnFocus={false}
                    value={address?.road_full_addr}
                    onPressIn={toggleModal}
                  />
                </TouchableOpacity>
              </View>
              {/* 가게 전화번호 */}
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <View>
                    <Text style={styles.inputTitle}>가게 전화번호</Text>
                    <View style={styles.InputWrapper}>
                      <TextInput
                        style={styles.subText}
                        keyboardType="decimal-pad"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        onFocus={autoFocus}
                        value={value}
                        placeholderTextColor={AppStyles.color.darkGray}
                        selectionColor={AppStyles.color.hotPink}
                        placeholder="가게 전화번호를 입력해주세요."
                      />
                    </View>
                  </View>
                )}
                name="store_phone_number"
              />
              {errors.store_phone_number && (
                <Text style={styles.errorText}>전화번호를 입력해주세요.</Text>
              )}
              {/* 가게 소개 */}
              <Controller
                control={control}
                rules={{
                  required: true,
                  maxLength: 200,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <View>
                    <Text style={styles.inputTitle}>가게 소개</Text>
                    <View style={styles.InputWrapper}>
                      <TextInput
                        style={styles.subText}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        onFocus={autoFocus}
                        multiline={true}
                        numberOfLines={5}
                        placeholderTextColor={AppStyles.color.darkGray}
                        selectionColor={AppStyles.color.hotPink}
                        placeholder="가게에 대한 소개를 입력해주세요. (200자 이내)"
                      />
                    </View>
                  </View>
                )}
                name="store_discription"
              />
              {errors.store_discription && (
                <Text style={styles.errorText}>
                  200자 이내로 가게 소개를 작성해주세요.
                </Text>
              )}

              {
                <View>
                  <Text style={styles.inputTitle}>가게 운영시간</Text>
                  <View style={styles.timePickerWrap}>
                    <TouchableOpacity
                      style={styles.timePickerBtn}
                      onPress={() => {
                        setShowTimePicker(true);
                        setPickerStatus('OPEN');
                      }}>
                      <TextInput
                        editable={false}
                        style={styles.timePickerTitle}
                        placeholderTextColor={AppStyles.color.darkGray}
                        selectionColor={AppStyles.color.hotPink}
                        placeholder={'오픈 시간'}
                        value={openTime}
                        onPressIn={() => {
                          setShowTimePicker(true);
                          setPickerStatus('OPEN');
                        }}
                      />
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Icon
                          name="menu-down"
                          size={AppStyles.IconSize.middle}
                          style={{
                            color: AppStyles.color.placeholder,
                            opacity: 0.6,
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.timePickerBtn}
                      onPress={() => {
                        setShowTimePicker(true);
                        setPickerStatus('CLOSE');
                      }}>
                      <TextInput
                        editable={false}
                        style={styles.timePickerTitle}
                        placeholderTextColor={AppStyles.color.darkGray}
                        selectionColor={AppStyles.color.hotPink}
                        placeholder={'닫는 시간'}
                        value={closeTime}
                        onPressIn={() => {
                          setShowTimePicker(true);
                          setPickerStatus('CLOSE');
                        }}
                      />
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Icon
                          name="menu-down"
                          size={AppStyles.IconSize.middle}
                          style={{
                            color: AppStyles.color.placeholder,
                            opacity: 0.6,
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              }

              {/* 카카오톡 채널 */}
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <View>
                    <Text style={styles.inputTitle}>카카오톡 채널</Text>
                    <View style={styles.InputWrapper}>
                      <TextInput
                        style={styles.subText}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        onFocus={autoFocus}
                        placeholderTextColor={AppStyles.color.darkGray}
                        selectionColor={AppStyles.color.hotPink}
                        placeholder="카카오톡 채널 url을 복사하여 입력해주세요"
                      />
                    </View>
                  </View>
                )}
                name="kakao_channel_url"
              />
              {errors.kakao_channel_url && (
                <Text style={styles.errorText}>
                  카카오톡 채널을 입력해주세요.
                </Text>
              )}
            </AutoFocusProvider>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.submitText}>다음으로</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Modal */}
      <Modal isVisible={isModalVisible}>
        <SafeAreaView style={{flex: 1}}>
          <Postcode
            style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}
            onSelected={data => {
              const parseAddr = {
                jibun_address: data.jibunAddress,
                road_full_addr: data.address,
                si_nm: data.query,
                sgg_nm: data.sigungu,
                emd_nm: data.bname2,
                lnbr_mnnm: '',
                address_detail: data.bname,
              };

              setAddress(parseAddr);
              toggleModal();
            }}
            onError={errors => console.log(errors)}
          />
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              backgroundColor: AppStyles.color.hotPink,
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
            onPress={toggleModal}>
            <Text style={styles.close}>닫기</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
      <DatePicker
        modal
        open={showTimePicker}
        mode={'time'}
        date={new Date()}
        onConfirm={date => {
          pickerStatus === 'OPEN'
            ? setOpenTime(timeFormatToKorea(parseTime(date)))
            : setCloseTime(timeFormatToKorea(parseTime(date)));

          setShowTimePicker(false);
        }}
        onCancel={() => {
          setShowTimePicker(false);
        }}
      />
      <SafeAreaView style={{backgroundColor: AppStyles.color.hotPink}} />
    </Fragment>
  );
};

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  view: {
    flex: 1,
    backgroundColor: AppStyles.color.hotPink,
  },
  storeWrapper: {
    flex: 1,
    padding: AppStyles.padding.screen,
  },
  inputTitle: {
    fontSize: 16,

    paddingTop: 20,
    color: AppStyles.color.black,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {fontWeight: '600'},
    }),
  },
  InputWrapper: {
    justifyContent: 'center',
    height: 40,
    borderBottomColor: AppStyles.color.border,
    borderBottomWidth: 1,
  },
  TextAreaInputWrapper: {
    height: 40,
    borderBottomColor: AppStyles.color.border,
    borderBottomWidth: 1,
  },
  errorText: {
    fontSize: 12,
    color: AppStyles.color.hotPink,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
        paddingTop: 5,
      },
      ios: {
        paddingTop: 5.66,
      },
    }),
  },
  imgInfo: {
    fontSize: AppStyles.font.small,
    color: AppStyles.color.hotPink,

    paddingTop: 2,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {fontWeight: '700'},
    }),
  },
  imageWrapper: {
    flexDirection: 'row',
  },
  close: {
    fontSize: 16,
    color: AppStyles.color.white,
    textAlignVertical: 'center',
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {
        fontWeight: '600',
      },
    }),
  },
  selectImage: {
    width: 102.68,
    height: 102.68,
    backgroundColor: AppStyles.color.SelectImage,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: AppStyles.color.SelectImageBorder,
  },
  submitBtn: {
    backgroundColor: AppStyles.color.hotPink,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  submitText: {
    fontSize: 17,
    color: AppStyles.color.white,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {fontWeight: '600'},
    }),
  },
  subText: {
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {},
    }),
  },
  timePickerWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
  },
  timePickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.color.border,
    width: '46%',
  },
  timePickerTitle: {
    flex: 1,
    color: AppStyles.color.black,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {},
    }),
  },
});

//prettier-ignore
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Alert, Image, Platform} from 'react-native';
import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {useMutation} from 'react-query';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useForm, Controller} from 'react-hook-form';
import {launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import Postcode from 'react-native-daum-postcode';

import {AppStyles} from '../../styles/AppStyles';
import {RootStackParamList} from '../navigator';
import {IAddress, IEnterStoreInputForm, IStoreImg} from './types';
import {AutoFocusProvider, useAutoFocus} from '../../contexts';
import {handleImageUpload, parseTime} from '../../utils';
import DatePicker from 'react-native-date-picker';
import {
  fetchEnterPicture,
  fetchEnterStoreJson,
  IApplyStore,
  ISignUpRsp,
} from '../../services';

export const EnterStore = ({
  navigation,
}: StackScreenProps<RootStackParamList>) => {
  //가게 사진
  const [storeImg, setStoreImg] = useState<IStoreImg>();
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
  const setFocus = useCallback(
    () => TextInputRef.current?.focus(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [TextInputRef.current],
  );
  const autoFocus = useAutoFocus();

  // const sellerStoreQuery = useMutation(
  //   (data: IApplyStore) => fetchEnterStoreJson(data),
  //   {
  //     onSuccess: Response => {
  //       console.log(Response);
  //     },
  //     onError: errors => {
  //       console.log(errors);
  //     },
  //   },
  // );

  // FIXME: API 붙이면 ASYNC AWAIT 함수형태로 변경할것
  const onSubmit = async (data: IEnterStoreInputForm) => {
    if (storeImg && address) {
      const tmpFetchData = {
        store_name: data.store_name,
        business_registration_number: data.business_registration_number,
        store_phone_number: data.store_phone_number,
        store_discription: data.store_discription,
        kakao_channel_url: data.kakao_channel_url,
        address: address,
        storeImg: storeImg,
        open_time: openTime,
        close_time: closeTime,
      };
      // TODO: API 통신이 들어가는 곳
      // sellerStoreQuery.mutate(tmpFetchData);
      await fetchEnterStoreJson(tmpFetchData)
        .then(async () => {
          console.log('사진 전송 성공');
          await fetchEnterPicture(storeImg)
            .then(resp => {
              console.log('성공');
              navigation.navigate('EnterComplete');
            })
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    } else {
      Alert.alert(
        '입점 진행 오류',
        '입점 절차 항목을 모두 입력 확인해주세요.',
        [
          {
            text: '확인',
            style: 'cancel',
          },
        ],
      );
    }
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
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        onFocus={autoFocus}
                        selectionColor={AppStyles.color.placeholder}
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
                        keyboardType="decimal-pad"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        onFocus={autoFocus}
                        value={value}
                        selectionColor={AppStyles.color.placeholder}
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
                    <Text
                      style={{
                        fontSize: AppStyles.font.small,
                        color: AppStyles.color.hotPink,
                        fontWeight: '700',
                        paddingTop: 2,
                      }}>
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
                    style={{color: AppStyles.color.black}}
                    selectionColor={AppStyles.color.placeholder}
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
                        keyboardType="decimal-pad"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        onFocus={autoFocus}
                        value={value}
                        selectionColor={AppStyles.color.placeholder}
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
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        onFocus={autoFocus}
                        multiline={true}
                        numberOfLines={5}
                        selectionColor={AppStyles.color.placeholder}
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
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        onFocus={autoFocus}
                        selectionColor={AppStyles.color.placeholder}
                        placeholder="카카오톡 체널 url을 복사하여 입력해주세요"
                      />
                    </View>
                  </View>
                )}
                name="kakao_channel_url"
              />
              {errors.kakao_channel_url && (
                <Text style={styles.errorText}>
                  카카오톡 체널을 입력해주세요.
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
              height: 40,
            }}
            onPress={toggleModal}>
            <Text
              style={{
                color: AppStyles.color.white,
                textAlignVertical: 'center',
                fontWeight: '600',
              }}>
              닫기
            </Text>
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
            ? setOpenTime(parseTime(date))
            : setCloseTime(parseTime(date));

          setShowTimePicker(false);
        }}
        onCancel={() => {
          setShowTimePicker(false);
        }}
      />
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
    fontWeight: '600',
    paddingTop: 20,
    color: AppStyles.color.black,
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
    color: AppStyles.color.pink,
    opacity: 0.7,
    paddingTop: 2,
  },
  imageWrapper: {
    flexDirection: 'row',
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
    fontWeight: '600',
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
  },
});

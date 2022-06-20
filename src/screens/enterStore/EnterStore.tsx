//prettier-ignore
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Alert, Image, Platform} from 'react-native';
import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useForm, Controller} from 'react-hook-form';
import {launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import Postcode from 'react-native-daum-postcode';

import {AppStyles} from '../../styles/AppStyles';
import {RootStackParamList} from '../navigator';
import {IAddress, IEnterStoreInputForm, IStoreImg} from './types';
import {AutoFocusProvider, useAutoFocus} from '../../contexts';
import {parseAddress} from '../../utils';

export const EnterStore = ({
  navigation,
}: StackScreenProps<RootStackParamList>) => {
  //가게 사진
  const [storeImg, setStoreImg] = useState<IStoreImg>();
  //modal관련
  const [isModalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState<IAddress>();

  const {
    control,
    handleSubmit,
    watch,
    clearErrors,
    formState: {errors},
  } = useForm<IEnterStoreInputForm>();

  const onSubmit = (data: any) => {
    console.log(data);
  };

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

  const handleImageUpload = async () => {
    await launchImageLibrary({mediaType: 'photo'})
      .then(resp => {
        resp.assets?.map(({fileName, type, uri}) => {
          const img = {
            name: fileName,
            type: type,
            uri: Platform.OS === 'android' ? uri : uri?.replace('file://', ''),
          };
          console.log(img);
          setStoreImg(img);
        });
      })
      .catch(() => {
        setStoreImg(undefined);
        Alert.alert(
          '사진 업로드 실패',
          '다시 한번 시도해주시거나 관리자에게 문의해주세요.',
          [
            {
              text: '확인',
              style: 'cancel',
            },
          ],
        );
      });
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
                name="storeName"
              />
              {errors.storeName && (
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
                name="b_no"
              />
              {errors.b_no && (
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
                    onPress={handleImageUpload}>
                    <Icon
                      name="plus"
                      size={35}
                      color={AppStyles.color.hotPink}
                    />
                    <Text
                      style={{
                        fontSize: AppStyles.font.small,
                        color: AppStyles.color.hotPink,
                        fontWeight: '700',
                      }}>
                      이미지 (0/1)
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
                {/* TODO: 아래서 뜨는 모달 도로명 주소 API 연결할 공간 */}
                <TouchableOpacity
                  style={styles.InputWrapper}
                  onPress={toggleModal}>
                  <TextInput
                    style={{color: AppStyles.color.black}}
                    placeholderTextColor={AppStyles.color.placeholder}
                    selectionColor={AppStyles.color.placeholder}
                    placeholder="도로명 주소를 입력해주세요."
                    editable={false}
                    selectTextOnFocus={false}
                    value={
                      address?.road_full_addr
                        ? address?.road_full_addr
                        : '도로명 주소를 입력해주세요'
                    }
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
                name="storePhoneNumber"
              />
              {errors.storePhoneNumber && (
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
                    <View style={styles.TextAreaInputWrapper}>
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
                name="storeDesc"
              />
              {errors.storePhoneNumber && (
                <Text style={styles.errorText}>
                  200자 이내로 가게 소개를 작성해주세요.
                </Text>
              )}
              {/* 가게 운영 시간 TODO: react-native datapicker 를 활용하여 개발 */}

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
                        multiline={true}
                        numberOfLines={5}
                        selectionColor={AppStyles.color.placeholder}
                        placeholder="카카오톡 체널 url을 복사하여 입력해주세요"
                      />
                    </View>
                  </View>
                )}
                name="storeUrl"
              />
              {errors.storeUrl && (
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
          <Text style={styles.submitText}>디음으로</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Modal */}
      <Modal isVisible={isModalVisible}>
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
      </Modal>
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
    paddingTop: 10,
    height: 80,
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
    backgroundColor: AppStyles.color.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 10,
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
});

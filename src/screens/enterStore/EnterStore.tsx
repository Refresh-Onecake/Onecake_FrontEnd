//prettier-ignore
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView} from 'react-native';
import React, {Fragment, useCallback, useEffect, useRef} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {useMutation} from 'react-query';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useForm, Controller} from 'react-hook-form';

import {AppStyles} from '../../styles/AppStyles';
import {RootStackParamList} from '../navigator';
import {IEnterStoreInputForm} from './types';
import {AutoFocusProvider, useAutoFocus} from '../../contexts';
export const EnterStore = ({
  navigation,
}: StackScreenProps<RootStackParamList>) => {
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

  const TextInputRef = useRef<TextInput | null>(null);
  const setFocus = useCallback(
    () => TextInputRef.current?.focus(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [TextInputRef.current],
  );
  const autoFocus = useAutoFocus();

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
                <View style={styles.selectImage}>
                  <Icon name="plus" size={35} color={AppStyles.color.hotPink} />
                  <Text
                    style={{
                      fontSize: AppStyles.font.small,
                      color: AppStyles.color.hotPink,
                      fontWeight: '700',
                    }}>
                    이미지 (0/1)
                  </Text>
                </View>
              </View>
              {/* 가게 위치 */}
              {/* form에 추가 되지 않음 */}
              <View>
                <Text style={styles.inputTitle}>가게 위치</Text>
                {/* TODO: 아래서 뜨는 모달 도로명 주소 API 연결할 공간 */}
                <TouchableOpacity style={styles.InputWrapper}>
                  <Text
                    style={{color: AppStyles.color.placeholder, opacity: 0.4}}>
                    도로명 주소를 입력해주세요
                  </Text>
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
  selectImage: {
    width: 102.68,
    height: 102.68,
    backgroundColor: AppStyles.color.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
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

import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMutation} from 'react-query';

import {RootStackParamList} from '../navigator';
import {AppStyles} from '../../styles/AppStyles';
import {Controller, useForm} from 'react-hook-form';
import {styles as EnterStoreStyles} from '../enterStore/EnterStore';
import {IEnterMenuInputForm} from './types';
import {AutoFocusProvider, useAutoFocus} from '../../contexts';
import {IStoreImg} from '../enterStore';
import {handleImageUpload} from '../../utils';
import {useSetRecoilState} from 'recoil';
import {storeMenuState} from '../../recoil/atom';
import {fetchEnterPicture, refetchToken} from '../../services';
import {getMultipleData} from '../../../App';

export const EnterMenu = ({
  navigation,
}: StackScreenProps<RootStackParamList>) => {
  // 드롭다운 관련 상태
  const [visible, setVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  // 케이크 사이즈 관련 상태
  //prettier-ignore
  const [cakeSize, setCakeSize] = useState<string[]>(['도시락', '1호','2호','3호','4호','5호']);
  const [selectedCakeSize, setSelectedCakeSize] = useState<string>('도시락');
  const [addCakeSize, setAddCakeSize] = useState<string>('');
  //메뉴 이미지 사진
  const [menuImg, setMenuImg] = useState<IStoreImg>();
  const [menuImgUrl, setMenuImgUrl] = useState<string>();
  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };
  const DropdownButton = useRef<TouchableOpacity | null>(null);
  const setMenuState = useSetRecoilState(storeMenuState);
  const openDropdown = (): void => {
    DropdownButton.current?.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h - 2);
      setDropdownLeft(_px - 6);
      setDropdownWidth(_w + 12);
    });
    setVisible(true);
  };
  const [toggleInputFocus, setToggleInputFocus] = useState<boolean>(false);

  // 토글리스트에서 선택하였을때
  const cakeSizeItemClickHandler = (selectedCakeName: string) => {
    setValue('cakeSize', selectedCakeName);
    setSelectedCakeSize(selectedCakeName);
    toggleDropdown();
  };

  const {
    control,
    handleSubmit,
    watch,
    clearErrors,
    formState: {errors},
    setValue,
  } = useForm<IEnterMenuInputForm>();

  const TextInputRef = useRef<TextInput | null>(null);
  const setFocus = useCallback(
    () => TextInputRef.current?.focus(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [TextInputRef.current],
  );
  const autoFocus = useAutoFocus();

  useEffect(() => {
    menuImg && setValue('cakeImage', menuImg);
  }, [menuImg]);

  // React.useEffect(() => {
  //   const subscription = watch((value, {name, type}) =>
  //     console.log(value, name, type),
  //   );
  //   return () => subscription.unsubscribe();
  // }, [watch]);

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

        setMenuState(prev => ({...prev, cakeImage: data}));
        navigation.navigate('EnterMenuSheet');
      },
      onError: e => {
        console.log(e);
      },
    },
  );

  const onSubmit = ({
    cakeSize,
    cakePrice,
    cakeDescription,
    cakeImage,
    cakeTaste,
  }: IEnterMenuInputForm) => {
    setMenuState({
      cakeSize,
      cakePrice,
      cakeDescription,
      cakeTaste,
    });
    menuImg ? pictureMutation.mutate(cakeImage) : null;
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.flex}>
        <View style={[styles.container, styles.flex]}>
          <AutoFocusProvider contentContainerStyle={[styles.flex]}>
            {/* 케이크 크기 입력 항목 */}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onBlur, value}}) => (
                <View>
                  <Text style={EnterStoreStyles.inputTitle}>케이크 크기</Text>
                  <TouchableOpacity
                    style={styles.textInputWrapperWithIcon}
                    onPress={toggleDropdown}
                    ref={DropdownButton}>
                    <TextInput
                      editable={false}
                      onBlur={onBlur}
                      onFocus={autoFocus}
                      value={value}
                      selectionColor={AppStyles.color.placeholder}
                      placeholder="케이크 크기를 선택해주세요."
                      placeholderTextColor={AppStyles.color.placeholder}
                      style={styles.textInput}
                      onPressIn={() => toggleDropdown()}
                    />
                    <View>
                      <Icon
                        name="chevron-down"
                        size={AppStyles.IconSize.large}
                        color={AppStyles.color.IconColor}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              name="cakeSize"
            />
            {errors.cakeSize && (
              <Text style={EnterStoreStyles.errorText}>
                케이크 크기를 선택해주세요.
              </Text>
            )}
            {/* 케이크 메뉴 이미지 업로드 항목 */}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field}) => (
                <View>
                  <Text
                    style={[EnterStoreStyles.inputTitle, {paddingBottom: 20}]}>
                    케이크 대표 사진
                  </Text>
                  <View style={EnterStoreStyles.imageWrapper}>
                    <TouchableOpacity
                      style={EnterStoreStyles.selectImage}
                      onPress={() => handleImageUpload(setMenuImg)}>
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
                        {menuImg ? '이미지 (1/1)' : '이미지 (0/1)'}
                      </Text>
                    </TouchableOpacity>
                    {menuImg && (
                      <Image
                        style={EnterStoreStyles.selectImage}
                        source={{uri: menuImg?.uri}}
                      />
                    )}
                  </View>
                </View>
              )}
              name="cakeImage"
            />
            {errors.cakeImage && (
              <Text style={[EnterStoreStyles.errorText, {marginTop: 5}]}>
                메뉴 이미지를 업로드해주세요.
              </Text>
            )}
            {/* 가격 입력항목 */}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onBlur, onChange, value}}) => (
                <View>
                  <Text style={EnterStoreStyles.inputTitle}>가격</Text>
                  <View style={EnterStoreStyles.TextAreaInputWrapper}>
                    <TextInput
                      onBlur={onBlur}
                      onFocus={autoFocus}
                      value={value}
                      selectionColor={AppStyles.color.placeholder}
                      placeholder="최소 가격을 입력해주세요."
                      placeholderTextColor={AppStyles.color.placeholder}
                      style={styles.textInput}
                      onChangeText={onChange}
                    />
                  </View>
                </View>
              )}
              name="cakePrice"
            />
            {errors.cakePrice && (
              <Text style={EnterStoreStyles.errorText}>
                최소 가격을 입력해주세요.
              </Text>
            )}
            {/* 메뉴 설명 입력항목 */}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onBlur, onChange, value}}) => (
                <View>
                  <Text style={EnterStoreStyles.inputTitle}>메뉴 설명</Text>
                  <View style={EnterStoreStyles.TextAreaInputWrapper}>
                    <TextInput
                      onBlur={onBlur}
                      onFocus={autoFocus}
                      value={value}
                      selectionColor={AppStyles.color.placeholder}
                      placeholder="메뉴에 대해 설명해주세요."
                      placeholderTextColor={AppStyles.color.placeholder}
                      style={styles.textInput}
                      onChangeText={onChange}
                    />
                  </View>
                </View>
              )}
              name="cakeDescription"
            />
            {errors.cakeDescription && (
              <Text style={EnterStoreStyles.errorText}>
                메뉴 설명을 입력해주세요.
              </Text>
            )}
            {/* 케이크 맛 입력항목 */}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onBlur, onChange, value}}) => (
                <View>
                  <Text style={EnterStoreStyles.inputTitle}>케이크 맛</Text>
                  <View style={EnterStoreStyles.TextAreaInputWrapper}>
                    <TextInput
                      onBlur={onBlur}
                      onFocus={autoFocus}
                      value={value}
                      selectionColor={AppStyles.color.placeholder}
                      placeholder="케이크 맛을 입력해주세요."
                      placeholderTextColor={AppStyles.color.placeholder}
                      style={styles.textInput}
                      onChangeText={onChange}
                    />
                  </View>
                </View>
              )}
              name="cakeTaste"
            />
            {errors.cakeTaste && (
              <Text style={EnterStoreStyles.errorText}>
                케이크 맛을 입력해주세요.
              </Text>
            )}
          </AutoFocusProvider>
        </View>
        <TouchableOpacity
          style={EnterStoreStyles.submitBtn}
          onPress={handleSubmit(onSubmit)}>
          <Text style={EnterStoreStyles.submitText}>다음으로</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: AppStyles.color.hotPink}} />
      {/* 케이크 선택 모달 */}
      <Modal visible={visible} transparent animationType="none">
        {/* TODO: 윈도우 크기에 맞춰서 개발을 해야될 수 있다. */}
        <SafeAreaView
          style={[
            {
              top: dropdownTop,
              width: dropdownWidth,
              left: dropdownLeft,
              ...Platform.select({
                android: {
                  bottom: toggleInputFocus ? 100 : 285,
                },
                ios: {
                  bottom: 285,
                },
              }),
            },
            styles.modalView,
          ]}>
          <ScrollView style={{width: '100%', paddingVertical: 5}}>
            {cakeSize.map((val, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.cakeSizeItem}
                // onLongPress={() =>
                //   setCakeSize(prev => prev.filter(cake => cake !== val))
                // }
                onPress={() => {
                  cakeSizeItemClickHandler(val);
                }}>
                <View style={styles.radioBtnWrap}>
                  <Image
                    style={styles.radioBtn}
                    source={
                      selectedCakeSize === val
                        ? require('../../asset/radio_active.png')
                        : require('../../asset/radio_none.png')
                    }
                  />
                </View>
                <Text style={{fontSize: 15}}>{val}</Text>
              </TouchableOpacity>
            ))}
            <View style={styles.cakeSizeAddInput}>
              <View style={styles.radioBtnWrap}>
                <Image
                  style={styles.radioBtn}
                  source={require('../../asset/radio_none.png')}
                />
              </View>
              <TextInput
                ref={TextInputRef}
                placeholder="새로 추가하기"
                selectionColor={AppStyles.color.placeholder}
                placeholderTextColor={AppStyles.color.placeholder}
                style={styles.textInput}
                onChangeText={setAddCakeSize}
                onFocus={() => setToggleInputFocus(true)}
                onBlur={() => setToggleInputFocus(false)}
                onSubmitEditing={() => {
                  setCakeSize(prev => [...prev, addCakeSize]);
                  TextInputRef.current?.clear();
                }}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    backgroundColor: AppStyles.color.white,
    paddingHorizontal: AppStyles.padding.screen,
    paddingTop: 10,
  },
  textInputWrapperWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.color.border,
  },
  modalView: {
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000000',
        shadowRadius: 4,
        shadowOffset: {height: 4, width: 0},
        shadowOpacity: 0.5,
      },
    }),
    position: 'absolute',
    backgroundColor: AppStyles.color.white,
    alignItems: 'center',
    borderRadius: 13,
  },
  radioBtnWrap: {
    marginRight: 18,
  },
  radioBtn: {
    width: 20,
    height: 20,
  },
  textInput: {
    flex: 1,
    color: AppStyles.color.black,
    fontSize: 15,
    ...Platform.select({
      android: {
        height: 40,
      },
    }),
  },
  cakeSizeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.color.border,
    paddingVertical: 16,
    paddingHorizontal: 5,
  },
  cakeSizeAddInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingTop: 16,
    paddingHorizontal: 5,
    marginBottom: 30,
  },
});

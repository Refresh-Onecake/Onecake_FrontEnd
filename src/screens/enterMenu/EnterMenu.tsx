import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList} from '../navigator';
import {AppStyles} from '../../styles/AppStyles';
import {Controller, useForm} from 'react-hook-form';
import {styles as EnterStoreStyles} from '../enterStore/EnterStore';
import {IEnterMenuInputForm} from './types';
import {AutoFocusProvider, useAutoFocus} from '../../contexts';
import {FlatList} from 'react-native-gesture-handler';

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
  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };
  const DropdownButton = useRef<TouchableOpacity | null>(null);

  const openDropdown = (): void => {
    DropdownButton.current?.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h - 2);
      setDropdownLeft(_px - 6);
      setDropdownWidth(_w + 12);
    });
    setVisible(true);
  };

  // 토글리스트에서 선택하였을때
  const cakeSizeItemClickHandler = (selectedCakeName: string) => {
    setValue('cake_size', selectedCakeName);
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

  const onSubmit = (data: IEnterMenuInputForm) => {
    //TODO: Menu 폼 입력 제출
    console.log(data);
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
              name="cake_size"
            />
            {errors.cake_size && (
              <Text style={EnterStoreStyles.errorText}>
                케이크 크기를 선택해주세요.
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
      <Modal visible={visible} transparent animationType="none">
        <SafeAreaView
          style={[
            {top: dropdownTop, width: dropdownWidth, left: dropdownLeft},
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
                placeholder="새로 추가히기"
                selectionColor={AppStyles.color.placeholder}
                placeholderTextColor={AppStyles.color.placeholder}
                style={styles.textInput}
                onChangeText={setAddCakeSize}
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
    borderBottomColor: AppStyles.color.border,
    borderBottomWidth: 1,
  },
  modalView: {
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
    position: 'absolute',
    backgroundColor: AppStyles.color.white,
    bottom: 300,
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

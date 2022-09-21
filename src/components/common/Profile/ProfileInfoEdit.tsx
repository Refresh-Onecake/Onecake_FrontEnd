import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {AppStyles} from '../../../styles/AppStyles';
import {CountryCodeModal} from '../CountryCodeModal';
import {ICountryCode} from '../../../utils';
import {CountryCodeButton} from '../CountryCodeButton';
import {ScreenBottomButton} from '../ScreenBottomButton';
import {useGetUserPhoneNumberQuery} from '../../../hooks/Query/Common/useGetUserPhoneNumber';
import {useUserPhoneNumberMutate} from '../../../hooks/Query/Common/useUserPhoneNumberMutation';

export const ProfileInfoEdit = () => {
  const [selectedCountry, setSelectedCountry] = useState<ICountryCode>({
    name: 'korea',
    dial_code: '+82',
    code: 'KR',
  });
  const {data, status} = useGetUserPhoneNumberQuery();
  const mutation = useUserPhoneNumberMutate();
  //modal관련
  const [isModalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(data);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const clearPhoneNumber = useCallback(() => {
    setPhoneNumber(() => '');
  }, []);

  const submit = () => {
    console.log(phoneNumber);
    mutation.mutate(phoneNumber as string);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.InfoWrap}>
        <Text style={styles.phoneText}>휴대폰번호</Text>
        <View style={styles.phoneTextInputWrap}>
          <CountryCodeButton
            selectedCountry={selectedCountry}
            onPress={toggleModal}
          />
          <TextInput
            style={styles.textInput}
            selectionColor={AppStyles.color.hotPink}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TouchableOpacity onPress={clearPhoneNumber}>
            <Image
              source={require('../../../asset/circle_X.png')}
              style={styles.xIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <CountryCodeModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      <View style={styles.flex} />
      <ScreenBottomButton text={'적용하기'} onPress={submit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    backgroundColor: AppStyles.color.white,
    flex: 1,
  },
  InfoWrap: {
    height: Platform.OS === 'ios' ? 66.77 : 77.77,
    marginHorizontal: 17.86,
    marginTop: 19.86,
    paddingHorizontal: 16,
    paddingVertical: 13.29,
    backgroundColor: AppStyles.color.SelectImage,
    borderWidth: 1,
    borderColor: AppStyles.color.SelectImageBorder,
    borderRadius: 14,
  },
  phoneText: {
    color: AppStyles.color.black,
    opacity: 0.5,
    fontSize: 12,
    fontWeight: '500',
    ...Platform.select({
      android: {
        fontFamily: AppStyles.fontFamily.medium,
      },
    }),
  },
  phoneTextInputWrap: {
    paddingTop: 7.47,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 17,
    fontWeight: '500',
    color: AppStyles.color.black,
    opacity: 0.5,
    fontFamily: 'Poppins-Medium',
  },
  xIcon: {
    width: 15.45,
    height: 15.45,
  },
});

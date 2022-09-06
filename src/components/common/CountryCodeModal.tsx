import {
  FlatList,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {countryCodes, ICountryCode} from '../../utils';
import {AppStyles} from '../../styles/AppStyles';
import Modal from 'react-native-modal';
type CountryCodeModal = {
  isModalVisible: boolean;
  toggleModal: () => void;
  selectedCountry: ICountryCode;
  setSelectedCountry: React.Dispatch<React.SetStateAction<ICountryCode>>;
};

export const CountryCodeModal = ({
  isModalVisible,
  toggleModal,
  selectedCountry,
  setSelectedCountry,
}: CountryCodeModal) => {
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

  return (
    <Modal isVisible={isModalVisible} style={{margin: 0}}>
      <SafeAreaView style={styles.modalStyle}>
        <FlatList
          style={{flex: 1}}
          data={countryCodes}
          renderItem={({item}) => <RenderItem data={item} />}
          keyExtractor={(item: ICountryCode) => item.code}
        />
        <Pressable
          style={[styles.btn, {paddingVertical: 10}]}
          onPress={toggleModal}>
          <Text
            style={{
              color: AppStyles.color.white,
              fontSize: 15,
              ...Platform.select({
                android: {
                  fontFamily: 'NotoSansKR-Medium',
                },
                ios: {
                  fontWeight: '500',
                },
              }),
            }}>
            닫기
          </Text>
        </Pressable>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: AppStyles.color.hotPink}} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: AppStyles.color.white,
    flex: 1,
    margin: 0,
  },
  modalItem: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderBottomColor: AppStyles.color.border,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.color.hotPink,
  },
});

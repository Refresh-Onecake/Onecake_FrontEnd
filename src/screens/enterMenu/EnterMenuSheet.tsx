import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useCallback, useRef, useState} from 'react';
import {AppStyles} from '../../styles/AppStyles';
import {ToggleList} from '../../components';
import {useSetRecoilState} from 'recoil';
import {cakeInfoState, customerInfoState} from '../../recoil/atom';
import {AutoFocusProvider, useAutoFocus} from '../../contexts';
import {styles as EnterStoreStyles} from '../enterStore/EnterStore';
import {ScrollView} from 'react-native-gesture-handler';

export const EnterMenuSheet = () => {
  // 추가했을 때 보여져야하는 목록
  const [customerInfoList, setCustomerInfoList] = useState<string[]>([]);
  const [cakeInfoList, setCakeInfoList] = useState<string[]>([]);

  const TextInputRef = useRef<TextInput | null>(null);
  const setFocus = useCallback(
    () => TextInputRef.current?.focus(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [TextInputRef.current],
  );

  return (
    <Fragment>
      <SafeAreaView
        style={[styles.flex, {backgroundColor: AppStyles.color.white}]}>
        <AutoFocusProvider style={styles.flex}>
          <View style={styles.header}>
            <Text
              style={{
                fontSize: 18,
                color: AppStyles.color.black,
                marginBottom: 10,
                fontWeight: '500',
              }}>
              주문서 항목 선택
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: AppStyles.color.black,
                opacity: 0.5,
                fontWeight: '500',
              }}>
              주문서에 들어갈 항목을 선택해주세요.
            </Text>
          </View>
          <ScrollView style={[styles.flex, {flexDirection: 'column'}]}>
            <View
              style={{
                borderTopWidth: 6,
                borderTopColor: AppStyles.color.border,
              }}>
              <ToggleList
                title="소비자 정보 항목"
                atomState={customerInfoState}
                setPicked={setCustomerInfoList}
                picked={customerInfoList}
              />
            </View>
            <View
              style={{
                borderTopWidth: 6,
                borderTopColor: AppStyles.color.border,
              }}>
              <ToggleList
                title="케이크 관련 항목"
                atomState={cakeInfoState}
                setPicked={setCakeInfoList}
                picked={cakeInfoList}
              />
            </View>
          </ScrollView>
        </AutoFocusProvider>
        <TouchableOpacity style={EnterStoreStyles.submitBtn}>
          <Text style={EnterStoreStyles.submitText}>제출하기</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView
        style={{backgroundColor: AppStyles.color.hotPink, flex: 0}}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  header: {
    paddingTop: 30,
    backgroundColor: AppStyles.color.white,
    paddingHorizontal: AppStyles.padding.screen,
    paddingBottom: 20,
  },
});

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useCallback, useEffect, useRef, useState} from 'react';
import {AppStyles} from '../../styles/AppStyles';
import {ToggleList} from '../../components';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  cakeInfoState,
  customerInfoState,
  EditTargetMenuIdState,
  menuEditSheetInfoState,
  storeMenuState,
} from '../../recoil/atom';
import {AutoFocusProvider} from '../../contexts';
import {styles as EnterStoreStyles} from '../enterStore/EnterStore';
import {ScrollView} from 'react-native-gesture-handler';

import {fetchStoreEnterMenu} from '../../services';
import {useMutation, useQueryClient} from 'react-query';
import {IFetchMenu} from './types';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigator';
import {queryKeys} from '../../enum';

export const EnterMenuSheet = ({
  navigation,
}: StackScreenProps<RootStackParamList>) => {
  const menuEditSheetData = useRecoilValue(menuEditSheetInfoState);
  const [customerInfo, setCustomerInfo] = useRecoilState(customerInfoState);
  const [cakeInfo, setCakeInfo] = useRecoilState(cakeInfoState);
  const resetMenuEditSheetData = useResetRecoilState(menuEditSheetInfoState);
  const resetCustomerInfo = useResetRecoilState(customerInfoState);
  const resetCakeInfo = useResetRecoilState(cakeInfoState);
  const resetEditTargetMenuId = useResetRecoilState(EditTargetMenuIdState);
  // 추가했을 때 보여져야하는 목록
  const [customerInfoList, setCustomerInfoList] = useState<string[]>([]);
  const [cakeInfoList, setCakeInfoList] = useState<string[]>([]);
  const [errorText, setErrorText] = useState<boolean>(false);
  const [storeMenu, setStoreMenu] = useRecoilState(storeMenuState);
  const EditTargetMenuId = useRecoilValue(EditTargetMenuIdState);
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log(EditTargetMenuId);
  }, [EditTargetMenuId]);
  const menuMutation = useMutation(
    async (menuData: IFetchMenu) =>
      fetchStoreEnterMenu(menuData, EditTargetMenuId).then(res => {
        if (!res?.ok) {
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.json();
        }
      }),
    {
      onSuccess: data => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        queryClient.invalidateQueries(queryKeys.sellerMenuList);
        resetMenuEditSheetData();
        resetCustomerInfo();
        resetCakeInfo();
        resetEditTargetMenuId();
        console.log('메뉴 등록 성공', data);
        navigation.reset({
          routes: [{name: 'MainNavigator', params: {screen: '가게'}}],
        });
      },
      onError: e => {
        console.error(e);
      },
    },
  );
  useEffect(() => {
    console.log(storeMenu);
  }, [storeMenu]);

  useEffect(() => {
    if (menuEditSheetData.consumerInput) {
      const duplicateArr = customerInfo;
      for (const item of menuEditSheetData.consumerInput) {
        if (!duplicateArr.includes(item)) {
          duplicateArr.push(item);
        }
      }
      setCustomerInfo(duplicateArr);
      setCustomerInfoList(menuEditSheetData.consumerInput);
    }
    if (menuEditSheetData.cakeInput) {
      const duplicateArr = cakeInfo;
      for (const item of menuEditSheetData.cakeInput) {
        if (!duplicateArr.includes(item)) {
          duplicateArr.push(item);
        }
      }
      setCakeInfo(duplicateArr);
      setCakeInfoList(menuEditSheetData.cakeInput);
    }
  }, [menuEditSheetData]);

  const handleSubmit = () => {
    if (customerInfoList.length === 0 || cakeInfoList.length === 0) {
      setErrorText(true);
    } else {
      // TODO: API통신이 발생하는 구간
      setErrorText(false);
      setStoreMenu(prev => ({
        ...prev,
        consumerInput: customerInfoList,
        cakeInput: cakeInfoList,
      }));
      menuMutation.mutate(storeMenu);
    }
  };

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
            {errorText && (
              <Text style={[EnterStoreStyles.errorText, {marginTop: 5}]}>
                주문서 항목에 들어갈 항목을 한 개 이상 체크해주세요.
              </Text>
            )}
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
        <TouchableOpacity
          style={EnterStoreStyles.submitBtn}
          onPress={handleSubmit}>
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

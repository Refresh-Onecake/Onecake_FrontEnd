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
import {useRecoilState, useSetRecoilState} from 'recoil';
import {
  cakeInfoState,
  customerInfoState,
  storeMenuState,
} from '../../recoil/atom';
import {AutoFocusProvider, useAutoFocus} from '../../contexts';
import {styles as EnterStoreStyles} from '../enterStore/EnterStore';
import {ScrollView} from 'react-native-gesture-handler';
import {EnterMenu} from './EnterMenu';
import {fetchEnterPicture, fetchStoreEnterMenu} from '../../services';
import {useMutation, useQueryClient} from 'react-query';
import {IStoreImg} from '../enterStore';
import {IFetchMenu} from './types';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigator';
import {queryKeys} from '../../enum';

export const EnterMenuSheet = ({
  navigation,
}: StackScreenProps<RootStackParamList>) => {
  // 추가했을 때 보여져야하는 목록
  const [customerInfoList, setCustomerInfoList] = useState<string[]>([]);
  const [cakeInfoList, setCakeInfoList] = useState<string[]>([]);
  const [errorText, setErrorText] = useState<boolean>(false);
  const TextInputRef = useRef<TextInput | null>(null);
  const setFocus = useCallback(
    () => TextInputRef.current?.focus(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [TextInputRef.current],
  );
  const [storeMenu, setStoreMenu] = useRecoilState(storeMenuState);
  const queryClient = useQueryClient();
  const menuMutation = useMutation(
    async (menuData: IFetchMenu) =>
      fetchStoreEnterMenu(menuData).then(res => {
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
        console.log('메뉴 등록 성공', data);
        navigation.navigate('MainNavigator', {screen: 'Store'});
      },
      onError: e => {
        console.error(e);
      },
    },
  );
  useEffect(() => {
    console.log(storeMenu);
  }, [storeMenu]);

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
      console.log(storeMenu);
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

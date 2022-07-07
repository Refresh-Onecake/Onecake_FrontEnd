/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  AppState,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {getMenuList} from '../../services/menuService';
import {QueryClient, useQuery, useQueryClient} from 'react-query';
import {queryKeys} from '../../enum';
import {AppStyles} from '../../styles/AppStyles';
import {Button} from '../common/Button';
import {RootStackParamList} from '../../screens/navigator';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {IMenuList} from '../../services/menuService';
import {MenuRenderList} from './MenuRenderList';
import {focusManager} from 'react-query';
import {useIsFocused} from '@react-navigation/native';

export const MenuList = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const {data, status} = useQuery<IMenuList[]>(
    queryKeys.sellerMenuList,
    async () =>
      await getMenuList().then(res => {
        if (!res?.ok) {
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.json();
        }
      }),
    {
      refetchOnWindowFocus: true,
      retry: 10,
      onSuccess: data => {
        console.log(data);
      },
      onError: err => {
        console.log('err');
        const response = err as Error;
        if (response.message === '401') {
          queryClient.invalidateQueries(queryKeys.sellerMenuList);
          console.log('쿼리 성공');
        }
      },
    },
  );
  const isFocused = useIsFocused();
  useEffect(() => {
    focusManager.setFocused(isFocused);
  }, [isFocused]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <SafeAreaView style={{flex: 1, marginBottom: 20}}>
      {data && data?.length > 0 ? (
        //TODO: 메뉴 데이터가 존재할 때
        <MenuRenderList data={data} />
      ) : (
        // TODO: 메뉴 데이터가 존재하지 않을 때
        <SafeAreaView style={styles.flex}>
          <View>
            <Image
              style={{width: 318, height: 318}}
              source={require('../../asset/menuListNone.png')}
            />
          </View>
          <Text style={styles.title}>아직 등록된 메뉴가 없어요!</Text>

          <View style={styles.btnWrap}>
            <Button
              text="메뉴 추가하기"
              onPress={() =>
                navigation.navigate('StackNavigator', {
                  screen: 'EnterMenu',
                })
              }
            />
          </View>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  flex: {
    marginTop: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: AppStyles.color.subTitle,
    fontSize: AppStyles.font.middle,
  },
  btnWrap: {
    width: 270,
    height: 44,
    marginTop: 20,
  },
});

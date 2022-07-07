import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppStyles} from '../styles/AppStyles';
import {MenuList} from '../components';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from './navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appKeys, queryKeys} from '../enum';
import {useAsync, useQueryRefetchingOnError} from '../hooks';
import {getStringValueFromAsyncStorage} from '../utils';
import {focusManager, useQuery} from 'react-query';
import {getMenuList, IMenuList} from '../services';
import {useIsFocused} from '@react-navigation/native';

const Stores = ({navigation}: StackScreenProps<RootStackParamList>) => {
  const [role, setRole] = useState<string>();
  const [error, resetError] = useAsync(async () => {
    resetError();
    const fetchData = await getStringValueFromAsyncStorage(
      appKeys.roleTokenKey,
    );
    if (fetchData) {
      setRole(fetchData);
    }
  });

  const {data, status} = useQuery<IMenuList[]>(
    queryKeys.sellerMenuList,
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
        console.log('메뉴 리스트 불러오기에서 에러 발생');
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useQueryRefetchingOnError(err, queryKeys.sellerMenuList);
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
    <SafeAreaView style={styles.view}>
      {role === 'SELLER' ? (
        // TODO: 사장님 페이지
        <>
          <MenuList data={data} />
        </>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default Stores;

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: AppStyles.color.white},
});

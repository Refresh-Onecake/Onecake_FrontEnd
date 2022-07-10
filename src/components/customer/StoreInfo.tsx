import {ScrollView, Text, StyleSheet} from 'react-native';
import React from 'react';
import {AppStyles} from '../../styles/AppStyles';
import {useQuery, useQueryClient} from 'react-query';
import {storeIdState} from '../../recoil/atom';
import {useRecoilValue} from 'recoil';
import {queryKeys} from '../../enum';
import {getStoreInfo, IStoreInfo} from '../../services/storeService';

export const StoreInfo = () => {
  const queryClient = useQueryClient();
  const storeId = useRecoilValue(storeIdState);

  const {data} = useQuery<IStoreInfo>(
    queryKeys.storeInfo,
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getStoreInfo(storeId).then(res => {
        if (!res?.ok) {
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.json();
        }
      }),
    {
      refetchOnMount: 'always',
      staleTime: 5000,
      cacheTime: Infinity,
      onError: err => {
        console.log(err);
        const response = err as Error;
        if (response.message === '401') {
          queryClient.invalidateQueries(queryKeys.storeInfo);
          console.log('쿼리 성공');
        }
      },
    },
  );

  return (
    <ScrollView style={style.wrapper}>
      <Text style={style.text}>영업 정보</Text>
      <Text style={style.text}>운영 시간</Text>
      <Text>{data?.operatingTime}</Text>
      <Text style={style.text}>휴무일</Text>
      <Text>{data?.dayOff}</Text>
      <Text style={style.text}>{data?.address}</Text>
      <Text>서울특별시 마포구</Text>
      <Text style={style.text}>가게 설명</Text>
      <Text>{data?.storeDescription}</Text>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
    paddingLeft: 20,
  },
  text: {
    fontSize: AppStyles.font.middle,
    fontWeight: '800',
  },
});

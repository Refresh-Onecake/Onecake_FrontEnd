import {ScrollView, View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {AppStyles} from '../../styles/AppStyles';
import {useQuery, useQueryClient} from 'react-query';
import {storeIdState} from '../../recoil/atom';
import {useRecoilValue} from 'recoil';
import {queryKeys} from '../../enum';
import {getStoreInfo, IStoreInfo} from '../../services/storeService';
import {styles} from '../../screens/enterStore';

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
      refetchOnWindowFocus: true,
      staleTime: 5000,
      cacheTime: Infinity,
      onSuccess: data => {
        console.log('storeInfo', data);
      },
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
      <Text style={[style.text, {marginBottom: 38}]}>영업 정보</Text>

      <View style={style.view}>
        <Text style={style.text}>운영 시간</Text>
        <Text style={style.dataText}>{data?.operatingTime}</Text>
      </View>
      <View style={style.view}>
        <Text style={style.text}>휴무일</Text>
        <Text style={style.dataText}>{data?.dayOff}</Text>
      </View>
      <View style={style.view}>
        <Text style={style.text}>주소</Text>
        <Text style={style.dataText}>{data?.address}</Text>
      </View>
      <View style={style.view}>
        <Text style={style.text}>가게 설명</Text>
        <Text style={style.dataText}>{data?.storeDescription}</Text>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  wrapper: {
    paddingTop: 25,
    paddingLeft: 20,
  },
  text: {
    fontSize: 13,
    fontWeight: '800',
    width: 60,
    marginRight: 40,
  },
  view: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    paddingRight: 20,
  },
  dataText: {
    flex: 1,
  },
});

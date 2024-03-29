import {ScrollView, View, Text, StyleSheet, Platform} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../styles/AppStyles';
import {useQuery, useQueryClient} from 'react-query';
import {queryKeys} from '../../../enum';
import {getStoreInfo, IStoreInfo} from '../../../api/storeService';
import {styles} from '../../../screens/enterStore';
import {useRecoilValue} from 'recoil';
import {storeIdState} from '../../../recoil/atom';

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
      <Text style={[style.text, {marginBottom: 24.51, fontWeight: '600'}]}>
        영업 정보
      </Text>

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
    width: 60,
    marginRight: 40,
    color: AppStyles.color.black,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
        lineHeight: 16,
      },
      ios: {},
    }),
  },
  view: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    paddingRight: 20,
  },
  dataText: {
    flex: 1,
    color: '#7D7D7D',
    fontSize: 13,
    lineHeight: 20,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {fontWeight: '400'},
    }),
  },
});

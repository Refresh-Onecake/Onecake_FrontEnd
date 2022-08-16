import {Image, StyleSheet, Text, View, TextInput, Platform} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {
  getSellerOrderSheet,
  IOrderSheet,
  ISellerOrderList,
  setOrderSheetMemo,
} from '../../services/orderService';
import {orderStatusKeys, queryKeys} from '../../enum';
import {AppStyles} from '../../styles/AppStyles';
import {ScrollView} from 'react-native-gesture-handler';
import {AutoFocusProvider, useAutoFocus} from '../../contexts';
import {OrderManageFooter} from '../../components';
import {useRecoilValue} from 'recoil';
import {orderSheetIdState} from '../../recoil/atom';
import {getMultipleData} from '../../../App';
import {refetchToken} from '../../services';
import {parse} from 'dotenv';

export const OrderSheet = () => {
  const queryClient = useQueryClient();

  const [memo, setMemo] = useState('');
  const orderId = useRecoilValue(orderSheetIdState);
  const [imgUri, setImgUri] = useState<string | undefined>();

  const {data, status} = useQuery<IOrderSheet>(
    queryKeys.sellerOrderSheet,
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getSellerOrderSheet(orderId).then(res => {
        if (!res?.ok) {
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.json();
        }
      }),
    {
      onError: err => {
        console.log('주문서 가져오기 에러', err);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const response = err as Error;
        if (response.message === '401') {
          queryClient.invalidateQueries(queryKeys.sellerOrderSheet);
          console.log('주문서가져오기 query 리 패치');
        }
      },
      onSuccess: data => {
        console.log(data);
        data.form.map(val => {
          if (val.includes('사진')) {
            const parseImgUrl = val.substring(10, val.length);
            console.log(parseImgUrl);
            setImgUri(parseImgUrl);
          }
        });
      },
    },
  );

  const memoMutation = useMutation(
    async ({orderId, memo}: {memo: string; orderId: number}) =>
      await setOrderSheetMemo(orderId, memo).then(async res => {
        if (!res?.ok) {
          if (res?.status === 401) {
            const tokens = await getMultipleData();
            refetchToken(tokens);
          }
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.text();
        }
      }),
    {
      retry: 3,
      onSuccess: data => {
        console.log(data);
        console.log('메모등록 성공');
      },
      onError: err => {
        console.log(err);
      },
    },
  );
  const handleSubmitMemo = () => {
    memoMutation.mutate({orderId, memo});
  };

  const autoFocus = useAutoFocus();
  return (
    <View style={styles.view}>
      <ScrollView style={styles.scrollView}>
        <AutoFocusProvider>
          <View style={styles.header}>
            <Text style={styles.title}>{data?.menuName}</Text>
            <Text style={styles.title}>{data?.price}원</Text>
          </View>
          <View>
            {data?.form.map((val, idx) => (
              <Text style={styles.text} key={idx}>
                {val.includes('사진') ? '레퍼런스 사진 : 첨부' : val}
              </Text>
            ))}
          </View>

          <View>
            {imgUri !== undefined ? (
              <View>
                <Image
                  source={{
                    uri: imgUri,
                  }}
                  style={styles.img}
                />
              </View>
            ) : (
              <View style={{...styles.img, backgroundColor: '#F6F6F6'}} />
            )}
          </View>
          <View style={styles.memo}>
            <Text style={styles.memoTitle}>메모</Text>
            <TextInput
              onFocus={autoFocus}
              value={data?.memo}
              style={styles.memoTextInput}
              placeholderTextColor={AppStyles.color.placeholder}
              placeholder="메모 작성(200자 이내)"
              selectionColor={'#FF4EA5'}
              maxLength={200}
              onChangeText={setMemo}
              onSubmitEditing={handleSubmitMemo}
            />
          </View>
        </AutoFocusProvider>
      </ScrollView>
      {data && <OrderManageFooter state={data.state} />}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingTop: 32,
    flexDirection: 'column',
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15.5,
  },
  title: {
    fontSize: 15,
    color: AppStyles.color.black,
    ...Platform.select({
      android: {
        fontFamily: 'NotoSansKR-Medium',
      },
      ios: {
        fontWeight: '400',
      },
    }),
  },
  text: {
    fontSize: 13,
    color: '#989898',
    lineHeight: 22,
    ...Platform.select({
      android: {
        fontFamily: 'NotoSansKR-Medium',
        lineHeight: 16,
      },
      ios: {
        fontWeight: '500',
      },
    }),
  },
  img: {
    marginTop: 14,
    width: '100%',
    height: 345,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  memo: {
    width: '100%',
    borderWidth: 1,
    borderColor: AppStyles.color.border,
    borderRadius: 14,
    marginTop: 10.94,
    paddingTop: 13.49,
    paddingBottom: 11.49,
    paddingLeft: 11.09,
    backgroundColor: AppStyles.color.SelectImage,
    ...Platform.select({
      android: {
        height: 100,
      },
    }),
  },
  memoTitle: {
    fontSize: 12,
    color: AppStyles.color.black,
    opacity: 0.5,
    ...Platform.select({
      android: {
        fontFamily: 'NotoSansKR-Medium',
        lineHeight: 16,
      },
      ios: {
        fontWeight: '500',
        lineHeight: 14,
      },
    }),
  },
  memoTextInput: {
    color: AppStyles.color.black,
    fontSize: 17,
    lineHeight: 20,
    ...Platform.select({
      android: {
        fontFamily: 'NotoSansKR-Medium',
        height: 50,
      },
      ios: {
        fontWeight: '500',
      },
    }),
  },
});

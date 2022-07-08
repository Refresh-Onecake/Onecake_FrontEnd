import {Image, StyleSheet, Text, View, TextInput} from 'react-native';
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
import {dateFormatParser, timeFormatToKorea} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import {AutoFocusProvider, useAutoFocus} from '../../contexts';
import {OrderManageFooter} from '../../components';
import {useRecoilValue} from 'recoil';
import {orderSheetIdState} from '../../recoil/atom';
import {useQueryRefetchingOnError} from '../../hooks';
import {getMultipleData} from '../../../App';
import {refetchToken} from '../../services';

export const OrderSheet = () => {
  const queryClient = useQueryClient();

  const [memo, setMemo] = useState<string>('');
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
            const parseImgUrl = val.substring(18, val.length);
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

  const TextInputRef = useRef<TextInput | null>(null);
  const setFocus = useCallback(
    () => TextInputRef.current?.focus(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [TextInputRef.current],
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
                {val}
              </Text>
            ))}
          </View>

          <View>
            {imgUri !== undefined ? (
              <View>
                <Image
                  source={{
                    uri: 'https://onecake-image-bucket.s3.ap-northeast-2.amazonaws.com/a9bcd249-5d3c-41bb-b4cf-afcb406b20ee-D446A8F7-4323-4A61-8158-794082BBF508.jpg',
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
    fontWeight: '400',
    fontSize: 15,
    color: AppStyles.color.black,
  },
  text: {
    fontWeight: '500',
    fontSize: 13,
    color: '#989898',
    lineHeight: 22,
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
  },
  memoTitle: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 14,
    color: AppStyles.color.black,
    opacity: 0.5,
  },
  memoTextInput: {
    color: AppStyles.color.black,
    fontSize: 17,
    lineHeight: 20,
    fontWeight: '500',
  },
});

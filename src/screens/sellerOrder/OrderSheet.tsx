import {Image, StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {useQuery} from 'react-query';
import {
  getSellerOrderSheet,
  ISellerOrderList,
} from '../../services/orderService';
import {queryKeys} from '../../enum';
import {AppStyles} from '../../styles/AppStyles';
import {dateFormatParser, timeFormatToKorea} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import {AutoFocusProvider, useAutoFocus} from '../../contexts';
import {OrderManageFooter} from '../../components';

export const OrderSheet = () => {
  const [memo, setMemo] = useState<string>('');
  const {data, status} = useQuery<ISellerOrderList>(
    queryKeys.sellerOrderSheet,
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getSellerOrderSheet().then(res => {
        if (!res?.ok) {
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.json();
        }
      }),
    {
      refetchOnMount: 'always',
      onError: err => {
        console.log('주문 서 가져오기 에러', err);
      },
      onSuccess: data => {
        console.log(data);
      },
    },
  );
  console.log(data);
  const TextInputRef = useRef<TextInput | null>(null);
  const setFocus = useCallback(
    () => TextInputRef.current?.focus(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [TextInputRef.current],
  );
  const autoFocus = useAutoFocus();
  return (
    <View style={styles.view}>
      <ScrollView style={styles.scrollView}>
        <AutoFocusProvider>
          <View style={styles.header}>
            <Text style={styles.title}>{data?.cakeTitle}</Text>
            <Text style={styles.title}>{data?.price}원</Text>
          </View>
          <View>
            {data?.consumerName && (
              <Text style={styles.text}>
                &#183; 고객 이름 : {data.consumerName}
              </Text>
            )}
            {data?.consumerPhone && (
              <Text style={styles.text}>
                &#183; 전화번호 : {data.consumerPhone}
              </Text>
            )}
            {data?.pickupDate && (
              <Text style={styles.text}>
                &#183; 픽업 날짜 : {dateFormatParser(data.pickupDate)}
              </Text>
            )}
            {data?.pickupTime && (
              <Text style={styles.text}>
                &#183; 픽업 시간 : {timeFormatToKorea(data.pickupTime)}
              </Text>
            )}
            {data?.cakeTaste && (
              <Text style={styles.text}>
                &#183; 케이크 맛 : {data.cakeTaste}
              </Text>
            )}
            {data?.letter && (
              <Text style={styles.text}>&#183; 레터링 : {data.letter}</Text>
            )}
            {data?.letterColor && (
              <Text style={styles.text}>
                &#183; 레터링 색상 : {data.letterColor}
              </Text>
            )}
            {data?.cakeImage && (
              <Text style={styles.text}>&#183; 레퍼런스 이미지 첨부</Text>
            )}
          </View>
          <View>
            {data?.cakeImage !== undefined ? (
              <View>
                <Image source={{uri: data.cakeImage}} style={styles.img} />
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
            />
          </View>
        </AutoFocusProvider>
      </ScrollView>
      {data && <OrderManageFooter status={data.status} />}
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

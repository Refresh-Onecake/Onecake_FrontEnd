import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useQuery, useQueryClient} from 'react-query';
import {queryKeys} from '../../enum';
import {getOrderDetail, IOrderHistory} from '../../services/orderService';
import {AppStyles} from '../../styles/AppStyles';
import {orderHistoryIdState} from '../../recoil/atom';

export default function OrderDetail() {
  const queryClient = useQueryClient();
  const [imgUri, setImgUri] = useState<string | undefined>();
  const orderHistoryId = useRecoilValue(orderHistoryIdState);

  const {data} = useQuery<IOrderHistory>(
    queryKeys.orderDetail,
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getOrderDetail(orderHistoryId).then(res => {
        if (!res?.ok) {
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.json();
        }
      }),
    {
      refetchOnWindowFocus: true,
      staleTime: 5000,
      cacheTime: Infinity,
      onSuccess: data => {
        data.form.map(val => {
          if (val.includes('사진')) {
            const parseImgUrl = val.substring(7, val.length);
            setImgUri(parseImgUrl);
          }
        });
      },
      onError: err => {
        console.log('err');
        const response = err as Error;
        if (response.message === '401') {
          queryClient.invalidateQueries(queryKeys.orderDetail);
        }
      },
    },
  );

  return (
    <View>
      <View style={styles.orderTitle}>
        <Text style={styles.orderState}>{data?.orderState}</Text>
        <Text style={styles.storeName}>{data?.storeName}</Text>
        <View style={styles.orderDate}>
          <Text style={styles.subText}>주문 일시 : </Text>
          <Text style={styles.subText}>{data?.orderTime}</Text>
        </View>
        <View style={styles.pickupDate}>
          <Text style={styles.subText}>픽업 날짜 : </Text>
          <Text style={styles.subText}>{data?.pickUpTime}</Text>
        </View>
      </View>

      <View style={styles.cakeInfo}>
        <View style={styles.cakeTitleWrapper}>
          <Text style={styles.cakeTitle}>{data?.menuName}</Text>
          <Text style={styles.cakeTitle}>{data?.menuPrice}원</Text>
        </View>
        {data?.form.map((val, idx) => (
          <View key={idx}>
            {idx !== data.form.length - 1 && (
              <Text style={styles.orderOption}>&#183; {val}</Text>
            )}
          </View>
        ))}

        <Text style={styles.orderOption}>&#183; 레퍼런스 이미지 : 첨부</Text>
        <Image resizeMode="cover" style={styles.img} source={{uri: imgUri}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  orderTitle: {
    backgroundColor: AppStyles.color.white,
    marginTop: 10,
    padding: 15,
  },
  cakeInfo: {
    backgroundColor: AppStyles.color.white,
    marginTop: 10,
    padding: 15,
  },
  cakeTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cakeTitle: {color: AppStyles.color.black, fontSize: 15, fontWeight: '400'},
  storeName: {
    color: AppStyles.color.black,
    fontWeight: '600',
    fontSize: 20,
    marginTop: 18,
    marginBottom: 10,
  },
  orderState: {
    color: AppStyles.color.hotPink,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 30,
  },
  orderDate: {
    flexDirection: 'row',
    fontSize: 13,
    color: '#989898',
  },
  pickupDate: {
    flexDirection: 'row',
    fontSize: 13,
    color: '#989898',
  },
  orderOption: {
    fontSize: 13,
    marginTop: 5,
    fontWeight: '500',
    color: '#989898',
  },
  img: {
    width: 343,
    height: 333,
    borderRadius: 8,
    marginTop: 19,
    alignSelf: 'center',
  },
  subText: {
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 16,
    color: '#989898',
  },
});

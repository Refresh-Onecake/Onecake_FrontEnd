import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {useQuery, useQueryClient} from 'react-query';
import {queryKeys} from '../../enum';
import {getOrderDetail, IOrderHistory} from '../../services/orderService';
import {AppStyles} from '../../styles/AppStyles';

export default function OrderDetail() {
  const queryClient = useQueryClient();
  // const orderId = useRecoilValue(orderIdState);

  const {data} = useQuery<IOrderHistory>(
    queryKeys.orderDetail,
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getOrderDetail(4).then(res => {
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

  return (
    <View>
      <View style={styles.orderTitie}>
        <Text>{data?.orderState}</Text>
        <Text>{data?.storeName}</Text>
        <View>
          <Text>주문 일시 : </Text>
          <Text>{data?.orderTime}</Text>
        </View>
        <View>
          <Text>픽업 날짜 : </Text>
          <Text>{data?.pickUpTime}</Text>
        </View>
      </View>

      <View style={styles.cakeInfo}>
        <View>
          <Text>{data?.menuName}</Text>
          <Text>{data?.menuPrice}</Text>
          <Text>원</Text>
        </View>
        <View>
          <Text>케이크 맛 : </Text>
          <Text>{data?.form}</Text>
        </View>
        {/* <View>
          {data?.form.map((val, idx) => (
            <Text key={idx}>{val}</Text>
          ))}
        </View> */}
      </View>
      <View>
        <Text>레터링 : </Text>
        <Text>{data?.form[4]}</Text>
      </View>
      <View>
        <Text>레터링 색상 : </Text>
        {/* <Text>{data?.form[0]['레터링 색상']}</Text> */}
      </View>
      <Text>레퍼런스이미지: 첨부</Text>
      {/* <Image source={{uri: data?.form[0]['레퍼런스 사진']}}></Image> */}
    </View>
  );
}

const styles = StyleSheet.create({
  orderTitie: {
    backgroundColor: AppStyles.color.white,
    marginTop: 10,
  },
  cakeInfo: {
    backgroundColor: AppStyles.color.white,
    marginTop: 10,
  },
});

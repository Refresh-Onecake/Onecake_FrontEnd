import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {ISellerOrderList} from '../../services/orderService';
import {DateData} from 'react-native-calendars';
import {AppStyles} from '../../styles/AppStyles';
import {assert} from '../../utils';

// 주문 대기중, 주문 완료, 제작중, 제작완료, 취소된 주문
//RECEIVED, ACCEPTED, MAKING, COMPLETED, CANCELED
const orderStatus = [
  {
    status: 'RECEIVED',
    text: '주문 대기중',
  },
  {
    status: 'ACCEPTED',
    text: '주문 완료',
  },
  {
    status: 'MAKING',
    text: '제작중',
  },
  {
    status: 'COMPLETED',
    text: '제작 완료',
  },
  {
    status: 'CANCELED',
    text: '취소된 주문',
  },
];

export type OrderManageListProps = {
  orderData: ISellerOrderList[] | undefined;
  date: DateData | undefined;
};
export const OrderManageList: FC<OrderManageListProps> = ({
  orderData,
  date,
}) => {
  console.log(orderData);
  const [received, setReceived] = useState<ISellerOrderList[]>([]);
  const [accepted, setAccepted] = useState<ISellerOrderList[]>([]);
  const [making, setMaking] = useState<ISellerOrderList[]>([]);
  const [completed, setCompleted] = useState<ISellerOrderList[]>([]);
  const [canceled, setCanceled] = useState<ISellerOrderList[]>([]);

  useEffect(() => {
    assert(orderData !== undefined, 'orderData는 undefined 가 되서는 안된다.');
    orderData.map(val => {
      switch (val.status) {
        case 'RECEIVED': {
          setReceived(prev => [...prev, val]);
          break;
        }
        case 'ACCEPTED': {
          setAccepted(prev => [...prev, val]);
          break;
        }
        case 'MAKING': {
          setMaking(prev => [...prev, val]);
          break;
        }
        case 'COMPLETED': {
          setCompleted(prev => [...prev, val]);
          break;
        }
        case 'CANCELED': {
          setCanceled(prev => [...prev, val]);
          break;
        }
      }
    });
  }, [orderData]);

  // useEffect(() => {
  //   console.log(received);
  //   console.log(accepted);
  //   console.log(making);
  //   console.log(completed);
  //   console.log(canceled);
  // }, [received, accepted, making, completed, canceled]);

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon}>
          <Image
            style={{width: 18, height: 18, resizeMode: 'contain'}}
            source={require('../../asset/arrow-back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {date?.dateString.replace(/-/g, '.')}
        </Text>
        <View style={{width: 18, height: 18}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: Dimensions.get('screen').width,
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  headerIcon: {
    justifyContent: 'flex-start',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: 18,
  },
});

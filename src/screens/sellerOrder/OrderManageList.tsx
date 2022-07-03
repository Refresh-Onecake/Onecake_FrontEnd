import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {ISellerOrderList} from '../../services/orderService';
import {DateData} from 'react-native-calendars';
import {AppStyles} from '../../styles/AppStyles';
import {assert} from '../../utils';
import {OrderManageContent} from '../../components';
import {useRecoilState, useRecoilValue} from 'recoil';
import {orderListModalState} from '../../recoil/atom';
import {appKeys} from '../../enum';
import {OrderSheet} from './OrderSheet';

export type OrderManageListProps = {
  orderData: ISellerOrderList[] | undefined;
  date: DateData | undefined;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  close?: () => void;
};
export const OrderManageList: FC<OrderManageListProps> = ({
  orderData,
  date,
  setModalVisible,
  close,
}) => {
  const [orderListState, setOrderListState] =
    useRecoilState(orderListModalState);
  const [received, setReceived] = useState<ISellerOrderList[]>([]);
  const [accepted, setAccepted] = useState<ISellerOrderList[]>([]);
  const [making, setMaking] = useState<ISellerOrderList[]>([]);
  const [completed, setCompleted] = useState<ISellerOrderList[]>([]);
  const [canceled, setCanceled] = useState<ISellerOrderList[]>([]);

  const orderStatus = useMemo(() => {
    return [
      {
        status: 'RECEIVED',
        text: '주문 대기중',
        data: received,
      },
      {
        status: 'ACCEPTED',
        text: '주문 완료',
        data: accepted,
      },
      {
        status: 'MAKING',
        text: '제작중',
        data: making,
      },
      {
        status: 'COMPLETED',
        text: '제작 완료',
        data: completed,
      },
      {
        status: 'CANCELED',
        text: '취소된 주문',
        data: canceled,
      },
    ];
  }, [accepted, canceled, completed, making, received]);

  useEffect(() => {
    if (orderListState === appKeys.orderList && orderData !== undefined) {
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
    }
  }, []);

  // useEffect(() => {
  //   console.log(received);
  //   console.log(accepted);
  //   console.log(making);
  //   console.log(completed);
  //   console.log(canceled);
  // }, [received, accepted, making, completed, canceled]);

  const BackBtnHandler = () => {
    orderListState === appKeys.orderList
      ? setModalVisible(false)
      : setOrderListState(appKeys.orderList);
  };
  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIcon} onPress={BackBtnHandler}>
          <Image
            style={{width: 18, height: 18, resizeMode: 'contain'}}
            source={require('../../asset/arrow-back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {orderListState === appKeys.orderList
            ? date?.dateString.replace(/-/g, '.')
            : '주문서'}
        </Text>
        <View style={{width: 18, height: 18}} />
      </View>
      {orderListState === appKeys.orderList ? (
        <ScrollView style={{paddingTop: 10}}>
          {orderStatus.map(({text, data}, idx) => (
            <View key={idx} style={styles.contentView}>
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingBottom: 10,
                  paddingTop: 24,
                }}>
                <OrderManageContent title={text} renderData={data} />
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <>
          <OrderSheet />
        </>
      )}
      <View style={{height: 50}} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: Dimensions.get('screen').width,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    color: AppStyles.color.black,
  },
  contentView: {
    borderBottomWidth: 7,
    borderBottomColor: '#F4F4F4',
  },
});

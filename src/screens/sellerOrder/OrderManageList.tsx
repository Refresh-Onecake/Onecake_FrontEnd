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
import {
  getSellerOrderList,
  ISellerOrderList,
} from '../../services/orderService';
import {DateData} from 'react-native-calendars';
import {AppStyles} from '../../styles/AppStyles';
import {assert} from '../../utils';
import {OrderManageContent} from '../../components';
import {useRecoilState, useRecoilValue} from 'recoil';
import {orderListModalState} from '../../recoil/atom';
import {appKeys, queryKeys} from '../../enum';
import {OrderSheet} from './OrderSheet';
import {useQuery} from 'react-query';

export type OrderManageListProps = {
  date: DateData | undefined;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  close?: () => void;
};
export const OrderManageList: FC<OrderManageListProps> = ({
  date,
  setModalVisible,
  close,
}) => {
  const [orderListState, setOrderListState] =
    useRecoilState(orderListModalState);

  console.log(date?.dateString);
  assert(
    date !== undefined,
    '특정 날짜의 주문을 보기 위해서는 날짜가 선택되어야한다.',
  );
  // 특정 날짜의 주문들 가져오기 위한 api
  const {data, status} = useQuery<ISellerOrderList[]>(
    queryKeys.sellerOrderList,
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getSellerOrderList(date.dateString).then(res => {
        if (!res?.ok) {
          console.log(res?.status.toString());
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.json();
        }
      }),
    {
      onError: err => {
        console.log('여기서 떠야지 이놈아', err);
      },
      onSuccess: data => {
        console.log(data);
      },
    },
  );

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
      {/* {orderListState === appKeys.orderList ? (
        <ScrollView style={{paddingTop: 10}}>
          {orderStatus.map(({text, data}, idx) => (
            <View key={idx} style={styles.contentView}>
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingBottom: 10,
                  paddingTop: 24,
                }}>
                <OrderManageContent title={text} />
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <>
          <OrderSheet />
        </>
      )} */}
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

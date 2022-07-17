import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {QueryClient, useQuery, useQueryClient} from 'react-query';
import {DateData} from 'react-native-calendars';

import {BottomSheet, ScrollCalendar} from '../../components';
import {AppStyles} from '../../styles/AppStyles';
import {
  getSellerOrderList,
  ISellerOrderList,
} from '../../services/orderService';
import {appKeys, queryKeys} from '../../enum';
import {useRecoilState, useRecoilValue} from 'recoil';
import {currentYearState, orderListModalState} from '../../recoil/atom';
import {OrderManageList} from './OrderManageList';

const WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const SellerOrder = () => {
  const [orderDate, setOrderDate] = useState<string[]>([]);
  const [orderListState, setOrderListState] =
    useRecoilState(orderListModalState);
  const [modalVisible, setModalVisible] = useState(false);
  const [clickedDate, setClickedDate] = useState<DateData>();
  const scrollYear = useRecoilValue(currentYearState);

  const queryClient = useQueryClient();

  //주문 일자를 받아서 달력에 표시해주기 위한 query
  // const {data, status} = useQuery<ISellerOrderList[]>(
  //   queryKeys.sellerOrderList,
  //   async () =>
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  //     await getSellerOrderList().then(res => {
  //       if (!res?.ok) {
  //         console.log(res?.status.toString());
  //         throw new Error(res?.status.toString());
  //       } else {
  //         if (res) return res.json();
  //       }
  //     }),
  //   {
  //     onError: err => {
  //       console.log('여기서 떠야지 이놈아', err);
  //     },
  //     onSuccess: data => {
  //       setOrderDate([]);
  //       data.map((val, idx) => {
  //         setOrderDate(prev => [...prev, val.orderDate]);
  //         console.log(orderDate);
  //       });
  //     },
  //   },
  // );

  const onDayPress = (date: DateData) => {
    setClickedDate(() => date);
    setModalVisible(true);
    queryClient.invalidateQueries(queryKeys.sellerOrderList);
  };

  useEffect(() => {
    if (!modalVisible && orderListState === appKeys.orderListMore) {
      setOrderListState(appKeys.orderList);
    }
  }, [modalVisible]);

  return (
    <View style={styles.flex}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{scrollYear}</Text>
        <Text
          style={[
            styles.headerTitle,
            styles.headerText,
            {color: AppStyles.color.black},
          ]}>
          주문
        </Text>
        <View>
          <Text style={styles.headerText}>휴무</Text>
        </View>
      </View>
      <View style={styles.week}>
        {WEEK.map((val, idx) => (
          <Text key={idx} style={styles.weekText}>
            {val}
          </Text>
        ))}
      </View>
      <ScrollCalendar markedDate={orderDate} onDayPress={onDayPress} />
      <BottomSheet
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        height="100%">
        <View>
          <OrderManageList
            date={clickedDate}
            setModalVisible={setModalVisible}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 14,
    marginTop: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: AppStyles.color.black,
  },
  headerText: {
    color: AppStyles.color.hotPink,
    fontSize: 15,
    fontWeight: '600',
  },
  week: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: AppStyles.color.border,
  },
  weekText: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(60,60,67,0.3)',
    letterSpacing: -0.078,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

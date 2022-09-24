import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useQueryClient} from 'react-query';
import {DateData} from 'react-native-calendars';

import {AppStyles} from '../../styles/AppStyles';
import {appKeys, queryKeys} from '../../enum';
import {useRecoilState, useRecoilValue} from 'recoil';
import {currentYearState, orderListModalState} from '../../recoil/atom';
import {OrderManageList} from './OrderManageList';
import {BottomSheet, ScrollCalendar} from '../../components/common';
import {DayOffModal} from '../../components/seller/DayOffCalendar';

const WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const SellerOrder = () => {
  const [orderDate, setOrderDate] = useState<string[]>([]);
  const [orderListState, setOrderListState] =
    useRecoilState(orderListModalState);
  const [modalVisible, setModalVisible] = useState(false);
  const [clickedDate, setClickedDate] = useState<DateData>();
  const [dayOffModalVisible, setDayOffModalVisible] = useState(false);
  const scrollYear = useRecoilValue(currentYearState);

  const queryClient = useQueryClient();

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

  const onDayOffBtnPress = useCallback(() => {
    setDayOffModalVisible(true);
  }, []);

  const onDayOffModalToggle = useCallback(() => {
    setDayOffModalVisible(() => !dayOffModalVisible);
  }, [dayOffModalVisible]);

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
        <TouchableOpacity onPress={onDayOffBtnPress}>
          <Text style={styles.headerText}>휴무</Text>
        </TouchableOpacity>
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
        height={Platform.OS === 'ios' ? '100%' : '95%'}>
        <View>
          <OrderManageList
            date={clickedDate}
            setModalVisible={setModalVisible}
          />
        </View>
      </BottomSheet>
      {/* 휴무일 지정 캘린더 */}
      <BottomSheet
        modalVisible={dayOffModalVisible}
        setModalVisible={setDayOffModalVisible}
        height={Platform.OS === 'ios' ? '100%' : '95%'}>
        <DayOffModal onDayOffModalToggle={onDayOffModalToggle} />
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
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {},
    }),
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: AppStyles.color.black,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {},
    }),
  },
  headerText: {
    color: AppStyles.color.hotPink,
    fontSize: 15,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {
        fontWeight: '600',
      },
    }),
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
    color: 'rgba(60,60,67,0.3)',
    letterSpacing: -0.078,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {
        fontWeight: '400',
      },
    }),
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

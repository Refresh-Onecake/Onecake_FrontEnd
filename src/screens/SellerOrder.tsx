import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Header} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import {AppStyles} from '../styles/AppStyles';
import {ScrollCalendar} from '../components';
import {useQuery} from 'react-query';
import {getSellerOrderList, ISellerOrderList} from '../services/orderService';
import {queryKeys} from '../enum';

const date = ['2022-06-30', '2022-06-20', '2022-06-22', '2022-05-1'];

export const SellerOrder = () => {
  const [orderDate, setOrderDate] = useState<string[]>([]);
  const {data, status} = useQuery<ISellerOrderList[]>(
    queryKeys.sellerMenuList,
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getSellerOrderList().then(res => {
        if (!res?.ok) {
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.json();
        }
      }),
    {
      refetchOnMount: 'always',
      onError: err => {
        console.log('여기서 떠야지 이놈아', err);
      },
      onSuccess: data => {
        setOrderDate([]);
        data.map((val, idx) => {
          setOrderDate(prev => [...prev, val.orderDate]);
        });
      },
    },
  );

  console.log(orderDate);
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>{moment().year()}</Text>
        <Text
          style={[
            styles.headerTitle,
            styles.headerText,
            {color: AppStyles.color.black},
          ]}>
          주문
        </Text>
        <TouchableOpacity>
          <Text style={styles.headerText}>휴무</Text>
        </TouchableOpacity>
      </View>
      <ScrollCalendar
        current={moment().format('YYYY-MM-DD').toString()}
        markedDate={orderDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 40,
    paddingHorizontal: 14,
    marginTop: 5,
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
});

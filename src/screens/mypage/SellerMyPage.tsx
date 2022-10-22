import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import ProfileCard from '../../components/seller/SellerMyPage/ProfileCard';
import {Header} from '../../components/common/Header';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigator';
import {AppStyles} from '../../styles/AppStyles';
import {Chart} from '../../components/seller/Chart';
import Sales from '../../components/seller/Sales/Sales';
import moment from 'moment';
import {useRecoilValue} from 'recoil';
import {chartCurrMonthState} from '../../recoil/atom';
import {useGetChartStatistics} from '../../hooks/Query/Seller/Statistics/useChartStatistics';

const month = ['6', '7', '8', '9', '10'];

export const SellerMyPage = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const currentMonth = moment().format('YYYY-MM');
  const [monthSaleData, setMonthSaleData] = useState<number[]>([]);
  const [compareStr, setCompareStr] = useState('');
  const chartCurrMonth = useRecoilValue(chartCurrMonthState);

  const compareSaleMonth = useCallback(() => {
    const currMonthIdx = month.findIndex(m => m === chartCurrMonth);
    if (currMonthIdx > 0) {
      monthSaleData[currMonthIdx - 1] > monthSaleData[currMonthIdx]
        ? setCompareStr(() => '지난달보다 매출이 감소했어요!')
        : setCompareStr(() => '지난달보다 매출이 증가했어요!');
    } else {
      setCompareStr(() => '판매 데이터의 마지막 달 입니다.');
    }
  }, [chartCurrMonth, monthSaleData]);

  const initMonthList = useCallback(() => {
    const curMonth = new Date().getMonth() + 1;
    const monthList = [];
    for (let i = 4; i >= 0; i--) {
      curMonth - i <= 0
        ? monthList.push((curMonth - i + 12).toString())
        : monthList.push((curMonth - i).toString());
    }
    return monthList;
  }, []);

  const rightHeaderHandler = useCallback(() => {
    navigation.navigate('Setting');
  }, [navigation]);

  const chartStatisticsResult = useGetChartStatistics(currentMonth, {
    onSuccess: data => {
      const tmp = [];
      tmp.push(data.monthMinusOne);
      tmp.push(data.monthMinusTwo);
      tmp.push(data.monthMinusThree);
      tmp.push(data.monthMinusFour);
      setMonthSaleData(tmp);
      console.log(tmp);
      compareSaleMonth();
    },
    onError: e => {
      console.log(e);
    },
  });

  return (
    <SafeAreaView>
      <Header
        rightIcon={require('../../asset/setting.png')}
        rightOnPress={rightHeaderHandler}
      />
      <ScrollView bounces={false}>
        <ProfileCard />
        <View style={styles.salesTextView}>
          <Text style={styles.salesHeaderText}>판매 데이터 분석</Text>
          <Text style={styles.salesHeaderSubText}>{compareStr}</Text>
        </View>
        {monthSaleData.length > 0 ? (
          <Chart monthSaleData={monthSaleData} month={initMonthList()} />
        ) : null}

        <View style={styles.salesView}>
          <Sales />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  salesTextView: {
    marginTop: 35.05,
    marginHorizontal: 15,
  },
  salesHeaderText: {
    color: AppStyles.color.black,
    ...Platform.select({
      android: {
        fontFamily: AppStyles.fontFamily.bold,
      },
    }),
    fontWeight: '700',
    fontSize: 19,
    marginBottom: 10.04,
  },
  salesHeaderSubText: {
    color: 'rgba(125, 125, 125,0.8)',
    fontWeight: '400',
    ...Platform.select({
      android: {
        fontFamily: AppStyles.fontFamily.light,
      },
    }),
  },
  salesView: {
    borderTopColor: AppStyles.color.border,
    borderTopWidth: 4,
    paddingTop: 38.7,
    paddingHorizontal: 17.59,
    marginBottom: 100,
  },
});

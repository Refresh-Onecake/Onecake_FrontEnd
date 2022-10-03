import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {commonStyles} from '../../../styles/commonStyles';
import {AppStyles} from '../../../styles/AppStyles';

const Sales = () => {
  return (
    <View>
      <Text style={[commonStyles.fontBold, styles.title]}>
        우리 가게 판매 데이터
      </Text>
      <Text style={[commonStyles.fontMedium, styles.subTitle]}>
        우리 가게의 매출을 한 눈에 살펴봐요.
      </Text>

      <View style={styles.salesItem}>
        <Text style={[commonStyles.fontBold, styles.salesItemTitle]}>
          이번 달 총 주문 수
        </Text>
        <Text style={[commonStyles.fontMedium, styles.salesItemSubTitle]}>
          182건
        </Text>
      </View>

      <View style={styles.salesItem}>
        <Text style={[commonStyles.fontBold, styles.salesItemTitle]}>
          이번 달 판매 주문 수
        </Text>
        <Text style={[commonStyles.fontMedium, styles.salesItemSubTitle]}>
          222건
        </Text>
      </View>

      <View style={styles.salesItem}>
        <Text style={[commonStyles.fontBold, styles.salesItemTitle]}>
          지난 달 판매 주문 수
        </Text>
        <Text style={[commonStyles.fontMedium, styles.salesItemSubTitle]}>
          182건
        </Text>
      </View>
    </View>
  );
};

export default Sales;

const styles = StyleSheet.create({
  title: {
    color: AppStyles.color.black,
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 11.21,
  },
  subTitle: {
    fontSize: 14,
    color: 'rgba(125,125,125,0.8)',
  },
  salesItem: {
    marginTop: 25.79,
  },
  salesItemTitle: {
    marginBottom: 13.13,
    fontWeight: '600',
    color: AppStyles.color.black,
  },
  salesItemSubTitle: {
    color: AppStyles.color.hotPink,
    fontWeight: '500',
  },
});

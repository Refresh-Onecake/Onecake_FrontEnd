import {ScrollView, Text, StyleSheet} from 'react-native';
import React from 'react';
import {AppStyles} from '../../styles/AppStyles';

export default function StoreInfo() {
  return (
    <ScrollView style={style.wrapper}>
      <Text style={style.text}>영업 정보</Text>
      <Text style={style.text}>운영 시간</Text>
      <Text>오전 9시부터 10시까지</Text>
      <Text style={style.text}>휴무일</Text>
      <Text>주문 시 확인</Text>
      <Text style={style.text}>주소</Text>
      <Text>서울특별시 마포구</Text>
      <Text style={style.text}>가게 설명</Text>
      <Text>유명한가게입니다케이크가맛잇어요어쩌구저쩌구블라블라</Text>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  wrapper: {
    paddingTop: 30,
    paddingLeft: 20,
  },
  text: {
    fontSize: AppStyles.font.middle,
    fontWeight: '800',
  },
});

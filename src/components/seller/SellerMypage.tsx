import {
  Text,
  StyleSheet,
  View,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import {AppStyles} from '../../styles/AppStyles';

export default class Mypage extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.wrapper}>
          <Image
            style={styles.image}
            source={require('../../asset/congratulation.png')}
          />
          {/* <Image style={styles.image} source={{uri: data?.storeImage}} /> */}
          <View style={styles.userText}>
            <Text style={styles.userMent}>안녕하세요! 김민지 사장님</Text>
            <Text style={styles.text}>@onecake</Text>
            <Text style={styles.text}>010-1111-1111</Text>
          </View>
        </View>
        <Text style={styles.title}>판매 데이터 분석</Text>
        <Text style={styles.subTitle}>지난 달보다 매출이 감소했어요!</Text>
        <View style={styles.chart}></View>
        <View style={styles.line}></View>
        <Text style={styles.title}>우리 가게 판매 데이터</Text>
        <Text style={styles.subTitle}>
          우리 가게의 매출을 한 눈에 살펴봐요.
        </Text>
        <View style={styles.countWrapper}>
          <Text style={styles.countTitle}>이번 달 총 주문 수</Text>
          {/* <Text>{data?.num}건</Text> */}
          <Text style={styles.count}>182건</Text>
        </View>
        <View style={styles.countWrapper}>
          <Text style={styles.countTitle}>이번 달 판매 주문 수</Text>
          <Text style={styles.count}>182건</Text>
        </View>
        <View style={styles.countWrapper}>
          <Text style={styles.countTitle}>지난 달 판매 주문 수</Text>
          <Text style={styles.count}>182건</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 160,
    borderRadius: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: AppStyles.color.white,
    paddingHorizontal: AppStyles.padding.small,
    ...Platform.select({
      ios: {},
      android: {
        shadowColor: 'grey',
        elevation: 10,
      },
    }),
  },
  image: {
    height: 105,
    width: 105,
    borderRadius: 100,
    overflow: 'hidden',
  },
  userMent: {
    fontSize: 19,
    ...Platform.select({
      ios: {},
      android: {
        fontFamily: 'AppleSDGothicNeo-Bold',
        lineHeight: 30,
      },
    }),
    color: AppStyles.color.black,
  },
  userText: {
    marginRight: 30,
  },
  text: {
    color: AppStyles.color.subTitle,
    fontSize: 17,
    ...Platform.select({
      ios: {},
      android: {
        lineHeight: 20,
        fontFamily: 'AppleSDGothicNeoM',
      },
    }),
  },
  chart: {
    height: 270,
    width: 350,
  },
  title: {
    marginTop: 35,
    fontSize: 19,
    marginLeft: 15,
    color: AppStyles.color.black,
    ...Platform.select({
      ios: {},
      android: {
        lineHeight: 25,
        fontFamily: 'AppleSDGothicNeo-Bold',
      },
    }),
  },
  subTitle: {
    marginTop: 11,
    marginLeft: 15,
    fontSize: 14,
    color: '#7D7D7D',
    ...Platform.select({
      ios: {},
      android: {
        lineHeight: 16,
        fontFamily: 'AppleSDGothicNeoM',
      },
    }),
  },
  countWrapper: {
    height: 100,
    width: '90%',
    marginLeft: 15,
    borderBottomColor: AppStyles.color.border,
    borderBottomWidth: 1,
    paddingVertical: 30,
  },
  line: {
    height: 4,
    width: '100%',
    marginTop: 47,
    backgroundColor: AppStyles.color.border,
  },
  countTitle: {
    color: AppStyles.color.black,
    marginBottom: 13,
    fontSize: 15,
    ...Platform.select({
      ios: {},
      android: {
        lineHeight: 20,
        fontFamily: 'AppleSDGothicNeo-Bold',
      },
    }),
  },
  count: {
    fontSize: 13,
    color: AppStyles.color.hotPink,
    ...Platform.select({
      ios: {},
      android: {
        lineHeight: 16,
        fontFamily: 'AppleSDGothicNeoM',
      },
    }),
  },
});

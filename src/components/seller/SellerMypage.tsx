import {
  Text,
  StyleSheet,
  View,
  Platform,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import React from 'react';
import {AppStyles} from '../../styles/AppStyles';

const SellerMypage = () => {
  const data = {
    labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(255, 49, 150, ${opacity})`, // optional
        strokeWidth: 1, // optional
      },
    ],
  };
  const width = Dimensions.get('window').width;

  const chartConfig = {
    backgroundColor: 'white',
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 49, 150, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(90, 90, 90, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#FF3196',
    },
  };

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
          <Text style={styles.mail}>@onecake</Text>
          <Text style={styles.text}>010-1234-5678</Text>
        </View>
      </View>
      <Text style={styles.title}>판매 데이터 분석</Text>
      <Text style={styles.subTitle}>지난 달보다 매출이 감소했어요!</Text>
      <View style={styles.chart}>
        <LineChart
          data={data}
          width={width}
          height={220}
          chartConfig={chartConfig}
        />
      </View>
      <View style={styles.line}></View>
      <Text style={styles.title}>우리 가게 판매 데이터</Text>
      <Text style={styles.subTitle}>우리 가게의 매출을 한 눈에 살펴봐요.</Text>
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
};

export default SellerMypage;

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
        lineHeight: 20,
        fontFamily: 'AppleSDGothicNeo-Bold',
      },
    }),
    color: AppStyles.color.black,
  },
  userText: {
    marginRight: 30,
  },
  mail: {
    color: AppStyles.color.subTitle,
    fontSize: 17,
    ...Platform.select({
      ios: {},
      android: {
        fontFamily: 'AppleSDGothicNeo-Bold',
      },
    }),
  },
  text: {
    color: AppStyles.color.subTitle,
    fontSize: 11,
    ...Platform.select({
      ios: {},
      android: {
        fontFamily: 'AppleSDGothicNeo-Bold',
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
        fontFamily: 'AppleSDGothicNeo-Bold',
      },
    }),
  },
  subTitle: {
    marginTop: 10,
    marginBottom: 24,
    marginLeft: 15,
    fontSize: 14,
    color: '#7D7D7D',
    ...Platform.select({
      ios: {},
      android: {
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
        fontFamily: 'AppleSDGothicNeoM',
      },
    }),
  },
});

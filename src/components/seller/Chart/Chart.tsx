import {Dimensions, Platform, StyleSheet, Animated, View} from 'react-native';
import React, {useState} from 'react';
import {LineChart} from 'react-native-chart-kit';
import {AppStyles} from '../../../styles/AppStyles';
import ChartBubble from '../../../asset/chart_bubble.svg';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {chartCurrMonthState} from '../../../recoil/atom';

type ChartProps = {
  monthSaleData: number[];
  month: string[];
};
export const Chart = ({monthSaleData, month}: ChartProps) => {
  const [chartIdx, setChartIdx] = useState(monthSaleData.length - 1);
  const setChartCurrMonth = useSetRecoilState(chartCurrMonthState);

  const onHandleDataPointClick = (index: number) => {
    setChartIdx(index);
    setChartCurrMonth(month[index]);
  };
  return (
    <LineChart
      data={{
        labels: month,
        datasets: [
          {
            data: monthSaleData,
          },
        ],
      }}
      renderDotContent={({x, y, indexData}) => (
        <View
          key={`indexData_${x}`}
          style={{
            position: 'absolute',
            top: y - 60,
            left: x - 66,
            ...Platform.select({
              android: {
                elevation: 3,
              },
              ios: {
                shadowColor: '#FFD5E9',
                shadowRadius: 7,
                shadowOffset: {height: 1, width: 0},
                shadowOpacity: 0.5,
              },
            }),
          }}>
          {indexData === monthSaleData[chartIdx] && <ChartBubble />}
        </View>
      )}
      width={Dimensions.get('window').width} // from react-native
      height={233.82}
      yAxisSuffix="개"
      formatXLabel={xValue => `${xValue}월`}
      segments={2}
      formatYLabel={yValue => parseInt(yValue).toString()}
      withHorizontalLines={false}
      // TODO:
      onDataPointClick={({index}) => onHandleDataPointClick(index)}
      chartConfig={{
        color: (opacity = 0.25) => `rgba(255, 49, 150, ${opacity})`,
        fillShadowGradientTo: '#D2D2D2',
        fillShadowGradientFrom: '#D2D2D2',
        fillShadowGradientToOpacity: 0.3,
        fillShadowGradientFromOpacity: 0,
        backgroundGradientFrom: AppStyles.color.white,
        backgroundGradientTo: AppStyles.color.white,
        propsForDots: {
          r: 1,
          stroke: AppStyles.color.hotPink,
          fill: '#FF3196',
        },
        strokeWidth: 1,
        propsForVerticalLabels: {
          fill: '#FF3196',
          fontSize: '12',
          fontWeight: '500',
          ...Platform.select({
            android: {
              fontFamily: AppStyles.fontFamily.bold,
            },
          }),
        },
        propsForHorizontalLabels: {
          fill: '#5A5A5A',
          opacity: '0.6',
          fontSize: 10,
          fontWeight: '400',
          ...Platform.select({
            android: {
              fontFamily: AppStyles.fontFamily.light,
            },
          }),
        },
        propsForBackgroundLines: {
          strokeDasharray: 2,
          stroke: '#D2D2D2',
          strokeWidth: 0.5,
        },
      }}
      style={{
        marginTop: 40,
      }}
    />
  );
};

const styles = StyleSheet.create({});

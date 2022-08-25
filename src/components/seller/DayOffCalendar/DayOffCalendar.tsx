import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Calendar, DateData} from 'react-native-calendars';
import moment, {Moment} from 'moment';
import {AppStyles} from '../../../styles/AppStyles';

type DayOffCalendarProps = {
  markedDates: {
    [key: string]: {
      selected: true;
    };
  };
  handleOnDayPress: (day: DateData) => void;
};

type onPressCalendarArrowFunc = (arrow: 'left' | 'right') => void;

export const DayOffCalendar = ({
  markedDates,
  handleOnDayPress,
}: DayOffCalendarProps) => {
  const [curYear, setCurYear] = useState(moment().year());
  const [curMonth, setCurMonth] = useState(moment().month());
  const [curDay, setCurDay] = useState(
    moment().format('YYYY-MM-DD').toString(),
  );
  const onPressCalendarArrow: onPressCalendarArrowFunc = useCallback(
    arrow => {
      if (arrow === 'left') {
        curMonth - 1 === 0
          ? (setCurYear(() => curYear - 1), setCurMonth(12))
          : setCurMonth(() => curMonth - 1);
      } else {
        curMonth + 1 === 13
          ? (setCurYear(() => curYear + 1), setCurMonth(1))
          : setCurMonth(() => curMonth + 1);
      }
      const curTmpDay = `${curYear}-${
        curMonth < 10 ? '0' + curMonth.toString() : curMonth
      }-01`;
      setCurDay(curTmpDay);
    },
    [curMonth, curYear],
  );

  return (
    <View style={styles.view}>
      <View style={styles.headerView}>
        <Text style={[styles.text, {paddingTop: 4, paddingLeft: 9}]}>날짜</Text>
        <View style={styles.dateTextView}>
          <Text style={styles.dateText}>{moment().format('YYYY.MM.DD')}</Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 13, paddingTop: 1}}>
        <Calendar
          initialDate={curDay}
          onDayPress={handleOnDayPress}
          markedDates={markedDates}
          monthFormat={'yyyy년 MM월'}
          hideExtraDays={true}
          hideArrows={true}
          renderHeader={() => {
            return (
              <View style={styles.calendarHeader}>
                <Text style={styles.text}>
                  {curYear}년 {curMonth}월
                </Text>
                <View style={styles.arrowView}>
                  <TouchableOpacity
                    style={{paddingRight: 22}}
                    onPress={() => onPressCalendarArrow('left')}>
                    <Image
                      source={require('../../../asset/arrowLeft.png')}
                      style={styles.arrow}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onPressCalendarArrow('right')}>
                    <Image
                      source={require('../../../asset/arrowRight.png')}
                      style={styles.arrow}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          theme={{
            calendarBackground: AppStyles.color.backgroundGray,
            dayTextColor: AppStyles.color.black,
            textDayHeaderFontSize: 10.8,
            textDayHeaderFontFamily: AppStyles.fontFamily.bold,
            textDayHeaderFontWeight: '500',
            textDayFontFamily: AppStyles.fontFamily.bold,
            textDayFontWeight: '500',
            textMonthFontSize: 15,
            textMonthFontFamily: AppStyles.fontFamily.bold,
            textMonthFontWeight: '500',
            monthTextColor: AppStyles.color.black,
            todayBackgroundColor: '#D7D7D7',
            todayTextColor: AppStyles.color.white,
            selectedDayTextColor: AppStyles.color.white,
            selectedDayBackgroundColor: AppStyles.color.hotPink,
            textDisabledColor: AppStyles.color.backgroundGray,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            'stylesheet.calendar.main': {
              dayContainer: {
                borderTopColor: AppStyles.color.border,
                borderTopWidth: 1,
                flex: 1,
                paddingHorizontal: 10,
                paddingBottom: 10,
                paddingTop: 5,
              },
              emptyDayContainer: {
                flex: 1,
                paddingHorizontal: 10,
                paddingBottom: 10,
                paddingTop: 5,
              },
            },
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    borderRadius: 10,
    backgroundColor: AppStyles.color.backgroundGray,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 18.42,
    paddingTop: 10,
    paddingBottom: 5.04,
    borderBottomWidth: 0.415,
    borderColor: '#C1C1C1',
  },
  text: {
    fontWeight: '500',
    fontSize: 15,
    fontFamily: 'AppleSDGothicNeo-Bold',
    color: AppStyles.color.black,
  },
  dateTextView: {
    backgroundColor: AppStyles.color.lightGray,
    borderRadius: 4,
  },
  dateText: {
    color: AppStyles.color.hotPink,
    fontWeight: '500',
    fontFamily: 'AppleSDGothicNeo-Bold',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  arrow: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
  calendarHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 8,
  },
  arrowView: {
    flexDirection: 'row',
  },
});

import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {CalendarList, DateData} from 'react-native-calendars';
import {AppStyles} from '../../styles/AppStyles';
import {assert} from '../../utils';
import {LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {currentYearState} from '../../recoil/atom';

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
LocaleConfig.locales['ko'] = {
  //prettier-ignore
  monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  //prettier-ignore
  monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월',],
  //prettier-ignore
  dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
  //prettier-ignore
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
LocaleConfig.defaultLocale = 'ko';

export type ScrollCalendarProps = {
  markedDate?: string[];
  onDayPress?: (date: DateData) => void;
};

/**
 * @author min
 * @description 스크롤이 가능한 캘린더 입니다.
 * @param markedDate 달력에 색칠할 동그라미 일정 ex) ['2022-01-01',2022-01-02','2022-01-03']
 * @param onDayPress 달력일을 눌렀을 때 반응할 함수
 * @example
 * <ScrollCalendar markedDate={orderDate} onDayPress={onDayPress} />
 */
export const ScrollCalendar: FC<ScrollCalendarProps> = ({
  markedDate,
  onDayPress,
}) => {
  const [markedDates, setMarkedDates] = useState({});

  const [scrollYearState, setScrollYearState] =
    useRecoilState(currentYearState);
  useEffect(() => {
    const obj = markedDate?.reduce(
      (c, v) =>
        Object.assign(c, {
          [v.toString()]: {
            selected: true,
            selectedColor: AppStyles.color.hotPink,
          },
        }),
      {},
    );
    assert(
      obj !== undefined,
      '달력에 필요한 markedDate 는 undefined 가 아니어야 한다.',
    );
    setMarkedDates(obj);
  }, [markedDate]);
  assert(
    onDayPress !== undefined,
    '달력에 필요한 onDayPress 는 undefined 가 아니어야 한다.',
  );
  return (
    <View>
      <CalendarList
        onVisibleMonthsChange={months => {
          scrollYearState !== months[0].year &&
            setScrollYearState(months[0].year);
        }}
        onDayPress={date => onDayPress(date)}
        markedDates={markedDates}
        monthFormat={'M월'}
        theme={{
          monthTextColor: AppStyles.color.hotPink,
          textMonthFontSize: 18,
          textMonthFontWeight: '500',
          textDayFontSize: 18,
          textDayFontWeight: '500',
          todayTextColor: AppStyles.color.hotPink,
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
            container: {
              padding: 0,
              margin: 0,
            },
          },
          'stylesheet.calendar-list.main': {
            margin: 0,
            padding: 0,
          },
          'stylesheet.calendar.header': {
            week: {
              height: 0,
              margin: 0,
            },
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

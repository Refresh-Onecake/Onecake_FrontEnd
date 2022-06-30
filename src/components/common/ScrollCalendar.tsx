import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {CalendarList} from 'react-native-calendars';
import {AppStyles} from '../../styles/AppStyles';
import {assert} from '../../utils';

export type ScrollCalendarProps = {
  current?: string;
  markedDate?: string[];
};

export const ScrollCalendar: FC<ScrollCalendarProps> = ({
  current,
  markedDate,
}) => {
  const [markedDates, setMarkedDates] = useState({});

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
  return (
    <View>
      <CalendarList
        markedDates={markedDates}
        theme={{todayTextColor: AppStyles.color.hotPink}}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

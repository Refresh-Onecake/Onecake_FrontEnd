import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {DayOffCalendar} from './DayOffCalendar';
import {DateData} from 'react-native-calendars';
import {AppStyles} from '../../../styles/AppStyles';
import {useDayOffMutation} from '../../../hooks/Query/Seller/DayOff/useDayOffMutation';
import {useDayOffQuery} from '../../../hooks/Query/Seller/DayOff/useDayOffQuery';

type DayOffModalProps = {
  onDayOffModalToggle: () => void;
};
export const DayOffModal = ({onDayOffModalToggle}: DayOffModalProps) => {
  const {data: markedDayOff, isSuccess} = useDayOffQuery();

  const [selectedDate, setSelectedDate] = useState<string[]>(
    markedDayOff !== undefined ? markedDayOff : [],
  );

  const [markedDates, setMarkedDates] = useState({});

  const dayOffMutation = useDayOffMutation();

  useEffect(() => {
    const obj = selectedDate.reduce(
      (c, v) =>
        Object.assign(c, {
          [v.toString()]: {selected: true},
        }),
      {},
    );
    setMarkedDates(obj);
    console.log(selectedDate);
  }, [selectedDate]);

  const handleOnDayPress = useCallback(
    (day: DateData) => {
      selectedDate.includes(day.dateString)
        ? setSelectedDate(
            selectedDate.filter(dates => dates !== day.dateString),
          )
        : setSelectedDate(dates => [...dates, day.dateString]);
    },
    [selectedDate],
  );

  const onPressDayOff = () => {
    dayOffMutation.mutate(selectedDate);
  };

  return (
    <View style={styles.view}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={onDayOffModalToggle}>
          <Text style={styles.text}>닫기</Text>
        </TouchableOpacity>
        <Text style={styles.text}>휴무일 지정하기</Text>
        <TouchableOpacity onPress={onPressDayOff}>
          <Text style={[styles.text, {color: AppStyles.color.hotPink}]}>
            추가
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.calendar}>
        <DayOffCalendar
          markedDates={markedDates}
          handleOnDayPress={handleOnDayPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: Dimensions.get('screen').width,
    flex: 1,
  },
  calendar: {
    paddingTop: 25.24,
    paddingHorizontal: 14.88,
  },
  headerView: {
    paddingHorizontal: 14.56,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: '600',
    fontFamily: 'AppleSDGothicNeo-Bold',
    color: AppStyles.color.black,
    fontSize: 16,
  },
});

import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {Calendar, DateData} from 'react-native-calendars';
import moment, {min, Moment} from 'moment';
import {AppStyles} from '../../../styles/AppStyles';

type DayOffCalendarProps = {
  markedDates: {
    [key: string]: {
      selected: true;
    };
  };
  handleOnDayPress: (day: DateData) => void;
};

type Action = {type: 'INCREASE'} | {type: 'DECREASE'};

const onPressCalendarArrowReducer = (
  currentDay: string,
  action: Action,
): string => {
  const year = parseInt(currentDay.substring(0, 4));
  const month = parseInt(currentDay.substring(5, 7));
  switch (action.type) {
    case 'DECREASE':
      return month - 1 === 0
        ? `${year - 1}-12-01`
        : `${year}-${
            month - 1 < 10 ? '0' + (month - 1).toString() : month - 1
          }-01`;
    case 'INCREASE':
      return month + 1 === 13
        ? `${year + 1}-01-01`
        : `${year}-${
            month + 1 < 10 ? '0' + (month + 1).toString() : month + 1
          }-01`;
    default:
      throw new Error('Unhandled action');
  }
};

export const DayOffCalendar = ({
  markedDates,
  handleOnDayPress,
}: DayOffCalendarProps) => {
  const [currentDay, dispatch] = useReducer(
    onPressCalendarArrowReducer,
    moment().format('YYYY-MM-DD'),
  );
  useEffect(() => console.log(currentDay), [currentDay]);
  const onIncreaseCurrentMonth = () => dispatch({type: 'INCREASE'});
  const onDecreaseCurrentMonth = () => dispatch({type: 'DECREASE'});
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
          initialDate={currentDay}
          onDayPress={handleOnDayPress}
          markedDates={markedDates}
          monthFormat={'yyyy년 MM월'}
          hideExtraDays={true}
          hideArrows={true}
          renderHeader={() => {
            return (
              <View style={styles.calendarHeader}>
                <Text style={styles.text}>
                  {`${currentDay.substring(0, 4)}년 ${parseInt(
                    currentDay.substring(5, 7),
                  )}일`}
                </Text>
                <View style={styles.arrowView}>
                  <TouchableOpacity
                    style={{paddingRight: 22}}
                    onPress={onDecreaseCurrentMonth}>
                    <Image
                      source={require('../../../asset/arrowLeft.png')}
                      style={styles.arrow}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onIncreaseCurrentMonth}>
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

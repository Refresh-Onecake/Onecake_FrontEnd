import {Image, Platform, StyleSheet, Text, View} from 'react-native';
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

export const DayOffCalendar = ({
  markedDates,
  handleOnDayPress,
}: DayOffCalendarProps) => {
  return (
    <View style={styles.view}>
      <View style={styles.headerView}>
        <Text style={[styles.text, {paddingTop: 4}]}>날짜</Text>
        <View style={styles.dateTextView}>
          <Text style={styles.dateText}>{moment().format('YYYY.MM.DD')}</Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 13, paddingTop: 1}}>
        <Calendar
          onDayPress={handleOnDayPress}
          markedDates={markedDates}
          hideExtraDays={true}
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
          monthFormat={'yyyy년 MM월'}
          renderArrow={direction =>
            direction === 'left' ? (
              <Image
                style={styles.arrow}
                source={require('../../../asset/arrowLeft.png')}
              />
            ) : (
              <Image
                style={styles.arrow}
                source={require('../../../asset/arrowRight.png')}
              />
            )
          }
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
    width: 13,
    height: 13,
    resizeMode: 'contain',
  },
});

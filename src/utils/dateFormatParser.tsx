import {useState} from 'react';
import {assert} from './assert';

/**
 * @Author min
 * @description 2022-01-01과 같은 데이터 형태를 년월일을 붙여 파싱해줍니다.
 * @param date "2022-01-01" 과 같은 형태로 입력 부탁드립니다.
 * @returns "2022년 01월 01일"
 */

export const dateFormatParser = (date: string | undefined) => {
  assert(date !== undefined, '날짜는 undefined가 될 수 없다');
  let count = 0;
  const parseDate = [...date];
  const arr = ['년 ', '월 '];

  for (let i = 0; i < date.length; i++) {
    if (parseDate[i] === '-') {
      parseDate[i] = arr[count++];
    }
  }
  parseDate.push('일');
  return parseDate.join('');
};

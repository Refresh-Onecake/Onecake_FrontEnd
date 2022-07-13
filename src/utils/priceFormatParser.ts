/**
 * @author min
 * @description 가격과 같이 따옴표가 들어가야 하는 곳에 숫자를 넣으면 따옴표가 붙은 문자열로 반환해주는 함수 입니다.
 *
 * @example
 * const price = priceFormatParser(1000);
 * console.log(price); // 1,000
 *
 */

import {assert} from './assert';

export const priceFormatParser = (inputNumber: number | undefined) => {
  assert(inputNumber !== undefined, '가격은 undefined 가 될 수 없다. ');
  return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

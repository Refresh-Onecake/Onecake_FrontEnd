import {assert} from './assert';

/**
 * @author min
 * @param time 15:30 PM 과 같은 형태
 * @returns 오후 15시 30분 과 같은 형태로 한국어 포맷으로 변경해줍니다.
 */
export const timeFormatToKorea = (time: string | undefined) => {
  assert(
    time !== undefined,
    '파싱하고자 하는 시간은 undefined가 아니어야 한다.',
  );

  const hour = (parseInt(time.substring(0, 2)) - 12).toString();
  const minuet = time.substring(3, 5);

  if (time.includes('PM')) {
    return `오후 ${hour}시 ${minuet}분`;
  } else {
    return `오전 ${hour}시 ${minuet}분`;
  }
};

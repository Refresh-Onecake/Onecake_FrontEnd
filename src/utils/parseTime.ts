/**
 * @author min
 * @description date를 넘겨줄경우 해당 내용에서 Time:minuet 과 같은 형식으로 파싱해줍니다.
 * @param setter Date타입의 date
 */
export const parseTime = (date: Date) => {
  console.log(date);
  const tmpHours = date.getHours();
  // let meridiem;
  // tmpHours - 12 < 0 ? meridiem = '오전' : meridiem = '오후';
  const tmpMinuets = `${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
  const fullTime = `${tmpHours}:${tmpMinuets}`;

  return fullTime;
};

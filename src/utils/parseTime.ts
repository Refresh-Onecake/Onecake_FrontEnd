export const parseTime = (date: Date) => {
  console.log(date);
  const tmpHours = date.getHours();
  // let meridiem;
  // tmpHours - 12 < 0 ? meridiem = '오전' : meridiem = '오후';
  const tmpMinuets = `${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
  const fullTime = `${tmpHours}:${tmpMinuets}`;

  return fullTime;
};

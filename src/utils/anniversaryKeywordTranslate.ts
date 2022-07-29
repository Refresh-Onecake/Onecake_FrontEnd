export const anniversaryKeywordTranslate = (keyword: string | undefined) => {
  if (keyword === undefined) return '';

  return {
    BIRTHDAY: '생일',
    MONTHLY_EVENT: '월별 행사',
    ANNIVERSARY: '기념일',
    EMPLOYMENT: '취업',
    MARRIAGE: '결혼',
    DISCHARGE: '전역',
    ETC: '기타',
  }[keyword];
};

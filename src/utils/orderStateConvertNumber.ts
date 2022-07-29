export const orderStateConvertNumber = (orderState: string | undefined) => {
  if (orderState === undefined) return '';
  return {
    RECEIVED: 1, //주문 대기중
    ACCEPTED: 2, //주문 완료
    MAKING: 3, //제작 중
    COMPLETED: 4, //픽업완료
    CANCELED: 0, //취소된 주문
  }[orderState];
};

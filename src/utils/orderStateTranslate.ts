export const orderStateTranslate = (orderState: string | undefined) => {
  if (orderState === undefined) return '';
  return {
    RECEIVED: '주문 대기중',
    ACCEPTED: '주문 완료',
    MAKING: '제작 중',
    COMPLETED: '픽업 완료',
    CANCELED: '취소된 주문',
  }[orderState];
};

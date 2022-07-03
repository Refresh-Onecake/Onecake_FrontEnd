export const orderStatusKeys = {
  주문대기중: 'RECEIVED',
  주문완료: 'ACCEPTED',
  제작중: 'MAKING',
  제작완료: 'COMPLETED',
  취소된주문: 'CANCELED',
} as const;

export const orderStatusKeys = {
  주문대기중: 'received',
  주문완료: 'accepted',
  제작중: 'making',
  픽업완료: 'completed',
  취소된주문: 'canceled',
} as const;

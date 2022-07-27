/**
 * @author min
 * @description react query에 필요한 key값을 enum으로 관리하기 위해 만들었습니다.
 */
export const queryKeys = {
  sellerMenuList: ['sellerMenuList'] as const,
  sellerOrderList: ['sellerOrderList'] as const,
  sellerOrderSheet: ['sellerOrderSheet'] as const,
  storeTitleInfo: ['storeTitleInfo'] as const,
  storeCakeList: ['storeCakeList'] as const,
  storeInfo: ['storeInfo'] as const,
  storeReviews: ['storeReviews'] as const,
  sellerChatAddress: ['sellerChatAddress'] as const,
  sellerMenuSheet: ['sellerMenuSheet'] as const,
  memberInfo: ['memberInfo'] as const,
  hotCakeList: ['hotCakeList'] as const,
  cityCakeList: ['cityCakeList'] as const,
};

/**
 * @author min
 * @description react query에 필요한 key값을 enum으로 관리하기 위해 만들었습니다.
 */
export const queryKeys = {
  UploadPhoto: ['@UploadPhoto'] as const, 
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
  orderDetail: ['orderDetail'] as const,
  sellerMenuListItemDetails: ['sellerMenuListItemDetails'] as const,
  sellerMenuImageItemDetail: ['sellerMenuImageItemDetail'] as const, //사장님 메뉴리스트에서 메뉴 선택 후 그리드에서 이미지를 선택했을 때 메뉴 상세
  hotCakeList: ['hotCakeList'] as const,
  cityCakeList: ['cityCakeList'] as const,
  keywordCakeList: ['keywordCakeList'] as const,
  // consumer
  ConsumerOrderHistory: ['@ConsumerOrderHistory'] as const,
  ProfileEdit: ['@ProfileEdit'] as const,
};

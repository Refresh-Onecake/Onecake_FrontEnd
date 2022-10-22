/**
 * @author min
 * @description react query에 필요한 key값을 enum으로 관리하기 위해 만들었습니다.
 */
export const queryKeys = {
  UploadPhoto: ['@UploadPhoto'],
  sellerMenuList: ['sellerMenuList'],
  sellerOrderList: ['sellerOrderList'],
  sellerOrderSheet: ['sellerOrderSheet'],
  storeTitleInfo: ['storeTitleInfo'],
  storeCakeList: ['storeCakeList'],
  storeInfo: ['storeInfo'],
  storeReviews: ['storeReviews'],
  sellerChatAddress: ['sellerChatAddress'],
  sellerMenuSheet: ['sellerMenuSheet'],
  memberInfo: ['memberInfo'],
  orderDetail: ['orderDetail'],
  sellerMenuListItemDetails: ['sellerMenuListItemDetails'],
  sellerMenuImageItemDetail: ['sellerMenuImageItemDetail'], //사장님 메뉴리스트에서 메뉴 선택 후 그리드에서 이미지를 선택했을 때 메뉴 상세
  hotCakeList: ['hotCakeList'],
  cityCakeList: ['cityCakeList'],
  keywordCakeList: ['keywordCakeList'],
  // consumer
  ConsumerOrderHistory: ['@ConsumerOrderHistory'],
  ProfileEdit: ['@ProfileEdit'],
  PhoneNumber: ['@PhoneNumber'],
  DayOff: ['@DayOff'],
  ChartStatistics: ['@chartStatistics'],
} as const;

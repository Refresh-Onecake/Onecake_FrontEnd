/**
 * @author min
 * @description 휴먼에러를 방지하고자 ENUM으로 필요한 전역변수를 만들었습니다. 이후 union type으로 migration 예정 입니다.
 */

export const appKeys = {
  consumer: 'CONSUMER' as const,
  seller: 'SELLER' as const,
  accessTokenKey: '@accessToken' as const,
  refreshTokenKey: '@refreshToken' as const,
  roleTokenKey: '@role' as const,
};

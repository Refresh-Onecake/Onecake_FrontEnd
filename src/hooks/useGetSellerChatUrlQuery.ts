import {Linking} from 'react-native';
import {QueryClient, useQuery} from 'react-query';
import {appKeys, queryKeys} from '../enum';
import {getSellerChatAddress} from '../services';

/**
 * @author min
 * @param queryClient
 * @returns 로그인한 판매자가 회원가입시 입력한 카카오톡 URL
 */
export const useGetSellerChatUrlQuery = (queryClient: QueryClient) => {
  return useQuery(
    queryKeys.sellerChatAddress,
    async () =>
      await getSellerChatAddress().then(res => {
        if (!res?.ok) {
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.text();
        }
      }),
    {
      enabled: false,
      onSuccess: data => {
        data
          ? console.log(`판매자 채팅 URL 가져오기 성공 ${data}`)
          : console.log('판매자 URL 미등록', data);
        if (data !== undefined) Linking.openURL(data);
      },
      onError: err => {
        console.log('셀러 URL 가져오기 오류');
        const response = err as Error;
        if (response.message === '401') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          queryClient.invalidateQueries(queryKeys.sellerChatAddress);
          console.log(`${queryKeys.sellerChatAddress.toString()} 쿼리 성공`);
        }
      },
    },
  );
};

import {QueryClient, useQuery, UseQueryResult} from 'react-query';
import {queryKeys} from '../enum';
import {getSellerMenuListItemDetails, IMenuListItemDetails} from '../services';

export const useGetMenuListItemDetailsQuery = (
  queryClient: QueryClient,
  menuId: number,
): UseQueryResult<IMenuListItemDetails, Error> => {
  return useQuery(
    queryKeys.sellerMenuListItemDetails,
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getSellerMenuListItemDetails(menuId).then(res => {
        if (!res?.ok) {
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.json();
        }
      }),
    {
      onSuccess(data) {
        console.log(data);
      },
      onError(err) {
        console.log('셀러 URL 가져오기 오류');
        const response = err;
        if (response.message === '401') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          queryClient.invalidateQueries(queryKeys.sellerChatAddress);
          console.log(`${queryKeys.sellerChatAddress.toString()} 쿼리 성공`);
        }
      },
    },
  );
};

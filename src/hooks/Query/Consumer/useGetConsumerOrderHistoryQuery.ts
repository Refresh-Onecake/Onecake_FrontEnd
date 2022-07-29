import {QueryClient, useQuery, UseQueryResult} from 'react-query';
import {queryKeys} from '../../../enum';
import {
  getConsumerOrderHistory,
  IConsumerOrderHistoryType,
} from '../../../services/Consumer';

export const useGetConsumerOrderHistoryQuery = (
  queryClient: QueryClient,
): UseQueryResult<IConsumerOrderHistoryType[], Error> => {
  return useQuery(
    queryKeys.ConsumerOrderHistory,
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getConsumerOrderHistory().then(res => {
        if (!res?.ok) {
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.json();
        }
      }),
    {
      onSuccess: data => {
        console.log(`${queryKeys.memberInfo.toString()} 쿼리 성공`);
        console.log(data);
      },
      onError: err => {
        console.log('소비자 나의 주문내역 보기 가져오기 실패');
        const response = err;
        if (response.message === '401') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          queryClient.invalidateQueries(queryKeys.ConsumerOrderHistory);
        }
      },
    },
  );
};

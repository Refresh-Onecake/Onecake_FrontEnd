import {QueryClient, useQuery, UseQueryResult} from 'react-query';
import {queryKeys} from '../enum';
import {getMemberInfo} from '../api';

export type IMemberInfoType = {
  phoneNumber: string;
  userId: string;
  userName: string;
};

export const useGetMemberInfoQuery = (
  queryClient: QueryClient,
): UseQueryResult<IMemberInfoType, Error> => {
  return useQuery(
    queryKeys.memberInfo,
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getMemberInfo().then(res => {
        if (!res?.ok) {
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.json();
        }
      }),
    {
      onError: err => {
        console.log('사용자 멤머 정보 가져오기 실패');
        const response = err;
        if (response.message === '401') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          queryClient.invalidateQueries(queryKeys.memberInfo);
          console.log(`${queryKeys.memberInfo.toString()} 쿼리 성공`);
        }
      },
    },
  );
};

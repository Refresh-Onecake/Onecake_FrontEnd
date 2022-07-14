import {QueryKey, useQueryClient} from 'react-query';

export const useQueryRefetchingOnError = (err: unknown, queryKey: QueryKey) => {
  const queryClient = useQueryClient();

  const response = err as Error;
  if (response.message === '401') {
    queryClient.invalidateQueries(queryKey);
    console.log(`${queryKey.toString()} 쿼리 성공`);
  }
};

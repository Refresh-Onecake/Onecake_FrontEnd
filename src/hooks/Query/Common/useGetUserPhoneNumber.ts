import {QueryClient, useQuery, useQueryClient} from 'react-query';
import {queryKeys} from '../../../enum';
import {customAxios} from '../../../api/customAxios';

export const getUserPhoneNumber = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {data} = await customAxios().get('/api/v1/member/phoneNumber');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data;
};

export const useGetUserPhoneNumberQuery = () => {
  return useQuery(queryKeys.PhoneNumber, getUserPhoneNumber, {
    onSuccess: data => {
      console.log(data);
    },
  });
};

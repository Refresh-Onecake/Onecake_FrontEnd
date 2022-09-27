import {QueryClient, useMutation, useQueryClient} from 'react-query';
import {queryKeys} from '../../../enum';
import {customAxios} from '../../../api/customAxios';

export const fetchUserPhoneNumber = async (phoneNumber: string) => {
  const {data} = await customAxios().put('/api/v1/member/phoneNumber', {
    phoneNumber,
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data;
};

export const useUserPhoneNumberMutate = () => {
  const queryClient = useQueryClient();
  return useMutation(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    async (phoneNumber: string) => await fetchUserPhoneNumber(phoneNumber),
    {
      onSuccess: data => {
        console.log(data);
        queryClient.invalidateQueries(queryKeys.PhoneNumber);
      },
    },
  );
};

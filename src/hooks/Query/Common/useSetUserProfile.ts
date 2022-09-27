import {QueryClient, useMutation} from 'react-query';
import {queryKeys} from '../../../enum';
import {customAxios} from '../../../api/customAxios';
import {UserProfile} from './useGetUserProfile';

export const setUserProfile = async ({nickname, profileImg}: UserProfile) => {
  const {data} = await customAxios().put('/api/v1/member/profile', {
    nickname,
    profileImg,
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data;
};

export const useSetUserProfile = (queryClient: QueryClient) => {
  return useMutation(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    async (userProfile: UserProfile) => await setUserProfile(userProfile),
    {
      onSuccess: data => {
        console.log(data);
        queryClient.invalidateQueries(queryKeys.ProfileEdit);
      },
    },
  );
};

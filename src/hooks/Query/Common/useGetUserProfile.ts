import {useQuery} from 'react-query';
import {queryKeys} from '../../../enum';
import {customAxios} from '../../../api/customAxios';

export type UserProfile = {
  profileImg: string;
  nickname: string;
};

export const getUserProfile = async () => {
  const {data} = await customAxios().get<UserProfile>('/api/v1/member/profile');
  return data;
};

/**
 *
 * @returns 수정 전 프로필이름과 사진 uri 를 반환한다.
 */
export const useGetUserProfile = () => {
  return useQuery(queryKeys.ProfileEdit, getUserProfile, {
    onSuccess: data => {
      // setProfileInfo(data);
      console.log(data);
    },
  });
};

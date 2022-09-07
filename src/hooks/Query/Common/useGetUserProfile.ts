import {useQuery, UseQueryResult} from 'react-query';
import {useRecoilState} from 'recoil';
import {queryKeys} from '../../../enum';
import {profileEditState} from '../../../recoil/atom';
import {customAxios} from '../../../services/customAxios';

export type UserProfile = {
  profileImg: string;
  nickname: string;
};

export const getUserProfile = async () => {
  //TODO:
  const {data} = await customAxios().get<UserProfile>('/api/v1/member/profile');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data;
};

/**
 *
 * @returns 수정 전 프로필이름과 사진 uri 를 반환한다.
 */
export const useGetUserProfile = () => {
  const [profileInfo, setProfileInfo] = useRecoilState(profileEditState);

  return useQuery(queryKeys.ProfileEdit, getUserProfile, {
    onSuccess: data => {
      setProfileInfo(data);
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });
};

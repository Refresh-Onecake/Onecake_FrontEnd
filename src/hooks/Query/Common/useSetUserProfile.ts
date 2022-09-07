import {useMutation} from 'react-query';
import {customAxios} from '../../../services/customAxios';
import {UserProfile} from './useGetUserProfile';

type SetUserProfile = ({nickname, profileImg}: UserProfile) => any;
export const setUserProfile: SetUserProfile = async ({
  nickname,
  profileImg,
}) => {
  await customAxios().put('/api/v1/member/profile', {nickname, profileImg});
};

export const useSetUserProfile = () => {
  return useMutation(setUserProfile, {
    onSuccess: data => {
      console.log(data);
    },
  });
};

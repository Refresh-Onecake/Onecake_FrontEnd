import {useMutation} from 'react-query';
import {getMultipleData} from '../../App';
import {IStoreImg} from '../screens/enterStore';
import {fetchEnterPicture, refetchToken} from '../services';

export const useMenuDetailsImageUpload = (pictureObj: IStoreImg) => {
  return useMutation(
    async (pictureObj: IStoreImg) =>
      await fetchEnterPicture(pictureObj).then(async res => {
        if (!res?.ok) {
          if (res?.status === 401) {
            const tokens = await getMultipleData();
            refetchToken(tokens);
          }
        } else {
          if (res) return res.text();
        }
      }),
    {
      retry: 3,
      onSuccess(data) {
        console.log(data);
      },
      onError(err) {
        console.log(err);
      },
    },
  );
};

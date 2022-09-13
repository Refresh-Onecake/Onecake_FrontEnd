import {AxiosError, AxiosPromise} from 'axios';
import {QueryClient, useMutation, useQueryClient} from 'react-query';
import {IStoreImg} from '../../../screens/enterStore';
import {customAxios} from '../../../services/customAxios';

export const fetchUploadPicture = async (storeImg: IStoreImg | undefined) => {
  const fd = new FormData();
  fd.append('image', storeImg);
  const {data} = await customAxios().post('/api/v1/member/image', fd);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data;
};

export const usePictureMutation = (
  setter: React.Dispatch<React.SetStateAction<string>>,
) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return useMutation(
    async (storeImg: IStoreImg | undefined) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await fetchUploadPicture(storeImg),
    {
      onSuccess: data => {
        console.log(data);
        setter(data as string);
      },
    },
  );
};

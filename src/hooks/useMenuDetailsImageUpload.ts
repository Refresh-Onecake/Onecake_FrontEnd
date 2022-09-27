import {QueryClient, useMutation} from 'react-query';
import {getMultipleData} from '../../App';
import {queryKeys} from '../enum';
import {refetchToken, setMenuDetailImageKeyword} from '../api';

export const useMenuDetailsImageUpload = (
  menuId: number,
  imageUri: string | undefined,
  anniversary: string,
  queryClient: QueryClient,
) => {
  return useMutation(
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await setMenuDetailImageKeyword(menuId, imageUri, anniversary).then(
        async res => {
          if (!res?.ok) {
            if (res?.status === 401) {
              const tokens = await getMultipleData();
              refetchToken(tokens);
            }
          } else {
            if (res) return res.json();
          }
        },
      ),
    {
      retry: 3,
      onSuccess: data => {
        console.log('메뉴 디테일이미지 업로드 성공');
        queryClient.invalidateQueries(queryKeys.sellerMenuListItemDetails);
      },
      onError(err) {
        console.log(err);
      },
    },
  );
};

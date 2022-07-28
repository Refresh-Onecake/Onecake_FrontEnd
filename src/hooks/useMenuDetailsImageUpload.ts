import {QueryClient, useMutation} from 'react-query';
import {getMultipleData} from '../../App';
import {queryKeys} from '../enum';
import {refetchToken, setMenuDetailImageKeyword} from '../services';

const anniv_key = {
  생일: 'BIRTHDAY',
  '월별 행사': 'MONTHLY_EVENT',
  기념일: 'ANNIVERSARY',
  취업: 'EMPLOYMENT',
  결혼: 'MARRIAGE',
  전역: 'DISCHARGE',
  기타: 'ETC',
};

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
        console.log(data);
      },
      onError(err) {
        console.log(err);
      },
    },
  );
};

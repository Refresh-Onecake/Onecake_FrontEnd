import {QueryClient, useQuery, UseQueryResult} from 'react-query';
import {queryKeys} from '../enum';
import {getMenuImageDetail, IMenuListItemDetails} from '../services';

export type IMenuImageDetail = {
  storeName: string;
  keyWord: string;
  imageDescription: string;
  image: string;
  isLiked: boolean;
};

export const useGetMenuImageDetailQuery = (
  queryClient: QueryClient,
  menuId: number,
  imageId: number,
): UseQueryResult<IMenuListItemDetails, Error> => {
  return useQuery(
    queryKeys.sellerMenuImageItemDetail, //고쳐야할 부분
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getMenuImageDetail(menuId, imageId).then(res => {
        if (!res?.ok) {
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.json();
        }
      }),
    {
      onSuccess(data) {
        console.log('이미지 선택 후 메뉴이미지디테일 내용 가져오기 성공');
        console.log(data);
      },
      onError(err) {
        const response = err;
        if (response.message === '401') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          queryClient.invalidateQueries(queryKeys.sellerMenuImageItemDetail);
          console.log(
            `${queryKeys.sellerMenuImageItemDetail.toString()} 쿼리 성공`,
          );
        }
      },
    },
  );
};

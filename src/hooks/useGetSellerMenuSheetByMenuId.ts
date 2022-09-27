import {QueryClient, useQuery} from 'react-query';
import {useSetRecoilState} from 'recoil';
import {queryKeys} from '../enum';
import {EditTargetMenuIdState, menuEditSheetInfoState} from '../recoil/atom';
import {IEditFetchMenu} from '../screens/enterMenu';
import {getMenuList} from '../api';
import {assert} from '../utils';

/**
 * @author min
 * @description menuId를 통하여 기존에 저장된 메뉴 주문서를 불러오는 쿼리 입니다.
 * @param queryClient - QueryClient
 * @param menuId - 메뉴 리스트 내 메뉴id
 */

export const useGetSellerMenuSheetByMenuId = (
  queryClient: QueryClient,
  menuId: number,
) => {
  const setMenuSheet = useSetRecoilState(menuEditSheetInfoState);
  const setEditTargetMenuId = useSetRecoilState(EditTargetMenuIdState);
  assert(
    menuId !== undefined, 
    '저장된 주문서를 가져올 때 필요한 menuId는 undefined가 되어선 안된다.',
  );
  return useQuery(
    queryKeys.sellerMenuSheet,
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getMenuList(menuId).then(res => {
        if (!res?.ok) {
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.json();
        }
      }),
    {
      enabled: false, //수정 버튼을 눌렀을때 refetch를 통해서 data를 query하도록 하기 위함
      onSuccess: data => {
        console.log('저장된 주문서 가져오기 성공');
        data && setMenuSheet(data as IEditFetchMenu);
        setEditTargetMenuId(menuId);
      },
      onError: err => {
        console.log('저장된 주문서 가져오기 오류');
        const response = err as Error;
        if (response.message === '401') {
          queryClient.invalidateQueries(queryKeys.sellerMenuSheet);
          console.log(`${queryKeys.sellerMenuSheet.toString()} 쿼리 성공`);
        }
      },
    },
  );
};

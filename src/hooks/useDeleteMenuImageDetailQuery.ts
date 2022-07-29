import {StackNavigationProp} from '@react-navigation/stack';
import {QueryClient, useMutation} from 'react-query';
import {getMultipleData} from '../../App';
import {queryKeys} from '../enum';
import {RootStackParamList} from '../screens/navigator';
import {getMenuImageDetail, refetchToken} from '../services';

export const useDeleteMenuImageDetailQuery = (
  menuId: number,
  imageId: number,
  method: string,
  queryClient: QueryClient,
  navigation: StackNavigationProp<
    RootStackParamList,
    keyof RootStackParamList,
    undefined
  >,
) => {
  return useMutation(
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getMenuImageDetail(menuId, imageId, method).then(async res => {
        if (!res?.ok) {
          if (res?.status === 401) {
            const token = await getMultipleData();
            refetchToken(token);
          }
        } else {
          if (res) return res.json();
        }
      }),
    {
      retry: 3,
      onSuccess: data => {
        console.log('특정 메뉴 이미지 삭제');
        console.log(data);
        queryClient.invalidateQueries(queryKeys.sellerMenuImageItemDetail);
        queryClient.invalidateQueries(queryKeys.sellerMenuListItemDetails);
        navigation.navigate('MenuImage');
      },
      onError(err) {
        console.log(err);
      },
    },
  );
};

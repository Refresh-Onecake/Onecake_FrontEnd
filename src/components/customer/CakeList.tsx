import {
  Image,
  ListRenderItem,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {FC} from 'react';
import {useRecoilValue} from 'recoil';
import {storeIdState} from '../../recoil/atom';
import {useQuery, useQueryClient} from 'react-query';
import {getCakeList, ICakeList} from '../../services/storeService';
import {queryKeys} from '../../enum';
import {FlatList} from 'react-native-gesture-handler';

export const CakeList: FC = () => {
  const queryClient = useQueryClient();
  const storeId = useRecoilValue(storeIdState);

  const {data} = useQuery<ICakeList[]>(
    queryKeys.storeCakeList,
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getCakeList(storeId).then(res => {
        if (!res?.ok) {
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.json();
        }
      }),
    {
      refetchOnMount: 'always',
      staleTime: 5000,
      cacheTime: Infinity,
      onError: err => {
        console.log('err');
        const response = err as Error;
        if (response.message === '401') {
          queryClient.invalidateQueries(queryKeys.sellerMenuList);
          console.log('쿼리 성공');
        }
      },
    },
  );

  const renderItem = (item: ListRenderItemInfo<ICakeList>) => {
    return (
      <View>
        <Image style={styles.image} source={{uri: item.item.image}}></Image>
        <Text>{item.item.menuName}</Text>
        <Text>{item.item.menuDescription}</Text>
        <Text>{item.item.price}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 65,
    height: 65,
  },
});

import {
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../styles/AppStyles';
import {queryKeys} from '../../../enum';
import {useQuery, useQueryClient} from 'react-query';
import {getCityCakeList, ICityCakeList} from '../../../services';

export const CityCakes = () => {
  const queryClient = useQueryClient();

  const {data} = useQuery<ICityCakeList[]>(
    queryKeys.cityCakeList,
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getCityCakeList().then(res => {
        if (!res?.ok) {
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.json();
        }
      }),
    {
      refetchOnMount: 'always',
      refetchOnWindowFocus: true,
      staleTime: 5000,
      cacheTime: Infinity,
      onSuccess: data => {
        console.log('cakeList', data);
      },
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

  const renderItem = (item: ListRenderItemInfo<ICityCakeList>) => {
    return (
      <>
        <Image
          style={styles.image}
          source={{uri: item.item.storeImage}}></Image>
      </>
    );
  };

  return (
    <>
      <Text style={styles.title}>우리 동네 케이크</Text>
      <FlatList data={data} renderItem={renderItem} horizontal={true} />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 35,
    marginLeft: 16,
    fontWeight: '800',
    color: AppStyles.color.black,
    fontSize: 19,
  },
  image: {
    width: 320,
    height: 223,
    borderRadius: 10,
    margin: 15,
    alignSelf: 'center',
  },
});
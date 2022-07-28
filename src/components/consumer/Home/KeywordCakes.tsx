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
import {useQuery, useQueryClient} from 'react-query';
import {getKeyWordCakeList, IKeywordCakeList} from '../../../services';
import {cakeKeywords, queryKeys} from '../../../enum';

export const KeywordCakes = () => {
  const queryClient = useQueryClient();

  const {data} = useQuery<IKeywordCakeList[]>(
    queryKeys.keywordCakeList,
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getKeyWordCakeList().then(res => {
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

  const renderItem = (item: ListRenderItemInfo<IKeywordCakeList>) => {
    return (
      <>
        <Image style={styles.image} source={{uri: item.item.image}}></Image>
        <View>
          <Text>#{cakeKeywords[item.item.keyword]}</Text>
        </View>
      </>
    );
  };

  return (
    <>
      <Text style={styles.title}>내가 찾는 기념일 케이크</Text>
      <FlatList data={data} renderItem={renderItem} horizontal={true} />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 31,
    marginBottom: 12,
    marginLeft: 16,
    fontWeight: '800',
    color: AppStyles.color.black,
    fontSize: 19,
  },
  image: {
    width: 320,
    height: 223,
    borderRadius: 10,
    marginLeft: 15,
    marginTop: 10,
    alignSelf: 'center',
  },
});

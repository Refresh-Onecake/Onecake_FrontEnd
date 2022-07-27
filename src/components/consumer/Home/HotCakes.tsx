import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  FlatList,
  ListRenderItemInfo,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../styles/AppStyles';
import {useQuery, useQueryClient} from 'react-query';
import {getHotCakeList, IHotCakeList} from '../../../services';
import {queryKeys} from '../../../enum';

export const HotCakes = () => {
  const queryClient = useQueryClient();

  const {data} = useQuery<IHotCakeList[]>(
    queryKeys.hotCakeList,
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getHotCakeList().then(res => {
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

  const renderItem = (item: ListRenderItemInfo<IHotCakeList>) => {
    return (
      <>
        <ImageBackground
          style={styles.image}
          source={{uri: item.item.image}}></ImageBackground>
      </>
    );
  };

  return (
    <>
      <TouchableOpacity style={{zIndex: 10}}>
        <Text style={styles.location}>마포구</Text>
      </TouchableOpacity>
      <View style={styles.text}>
        <Text style={styles.mainMent}>이번주 HOT한 케이크</Text>
        <Text style={styles.subMent}>
          오늘의 가장 인기있는 케이크를 찾아보세요!
        </Text>
      </View>
      <View style={styles.index}>
        <Text>1</Text>
      </View>
      <FlatList data={data} renderItem={renderItem} horizontal={true} />
    </>
  );
};

const styles = StyleSheet.create({
  location: {
    fontSize: 18,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 44,
    fontWeight: '800',
    color: AppStyles.color.white,
  },
  image: {
    height: 447,
    width: 375,
  },
  index: {
    position: 'absolute',
    opacity: 0.6,
    borderRadius: 10,
    right: 1,
    bottom: 1,
    marginBottom: 17,
    marginRight: 15,
    height: 22,
    width: 39,
    zIndex: 10,
    backgroundColor: AppStyles.color.black,
  },
  text: {
    top: 310,
    position: 'absolute',
    marginLeft: 16,
    zIndex: 10,
  },
  mainMent: {
    color: AppStyles.color.white,
    fontWeight: '800',
    fontSize: 25,
    marginBottom: 8,
    zIndex: 10,
  },
  subMent: {
    color: AppStyles.color.white,
    fontSize: 13,
    zIndex: 10,
  },
});

import {
  Image,
  ListRenderItem,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {getReviews, IReviews} from '../../services/storeService';
import {AppStyles} from '../../styles/AppStyles';
import {useQuery, useQueryClient} from 'react-query';
import {useRecoilValue} from 'recoil';
import {storeIdState} from '../../recoil/atom';
import {queryKeys} from '../../enum';

export const Review: FC = () => {
  const queryClient = useQueryClient();
  const storeId = useRecoilValue(storeIdState);

  const {data} = useQuery<IReviews>(
    queryKeys.storeReviews,
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getReviews(storeId).then(res => {
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
      onSuccess: data => {
        console.log(data.reviewNum);
        console.log(data.reviews);
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

  const renderItem = (item: ListRenderItemInfo<IReviews>) => {
    const review = item.item;
    return (
      <View style={styles.wrapper}>
        <View style={styles.infoWrapper}>
          <Image style={styles.image} source={{uri: review.profileImg}}></Image>
          <View style={{marginLeft: 11}}>
            <Text style={styles.userName}>{review.userName}</Text>
            <Text style={styles.history}>{review.timeHistory}</Text>
          </View>
        </View>
        <Text style={{fontSize: AppStyles.font.middle, padding: 15}}>
          {review.content}
        </Text>
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.reviewNum}>최근 리뷰 {data?.reviewNum} 개</Text>
      <FlatList data={data?.reviews} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  reviewNum: {
    padding: 20,
    fontWeight: '800',
  },
  userName: {
    color: AppStyles.color.black,
    fontSize: AppStyles.font.middle,
    fontWeight: '500',
  },
  history: {
    color: AppStyles.color.midGray,
    fontSize: AppStyles.font.small,
  },
  image: {
    width: 36,
    height: 36,
    borderRadius: 100,
  },
  wrapper: {
    borderColor: AppStyles.color.border,
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  infoWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 17,
    paddingTop: 17,
  },
});

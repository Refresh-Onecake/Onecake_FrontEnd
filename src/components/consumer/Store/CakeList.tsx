import {
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
} from 'react-native';
import React from 'react';
import {FC} from 'react';
import {useRecoilValue} from 'recoil';
import {useQuery, useQueryClient} from 'react-query';
import {storeIdState} from '../../../recoil/atom';
import {queryKeys} from '../../../enum';
import {getCakeList, ICakeList} from '../../../services/storeService';
import {AppStyles} from '../../../styles/AppStyles';

export const CakeList: FC = () => {
  const queryClient = useQueryClient();
  const storeId = useRecoilValue(storeIdState);

  const {data} = useQuery<ICakeList[]>(
    queryKeys.storeReviews,
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

  const renderItem = (item: ListRenderItemInfo<ICakeList>) => {
    return (
      <View style={styles.listView}>
        <Image style={styles.image} source={{uri: item.item.image}}></Image>
        <View style={styles.infos}>
          <Text style={styles.cakeTitle}>{item.item.menuName}</Text>
          <Text style={styles.desc}>{item.item.menuDescription}</Text>
          <Text style={styles.price}>{item.item.price}원~</Text>
          {/* <Icon style={styles.arrow} size={20} name="chevron-right"></Icon> */}
        </View>
      </View>
    );
  };

  return (
    <View>
      {data && data.length === 0 ? (
        <View>
          <Image
            style={styles.cake}
            source={require('../../../asset/cake.png')}></Image>
          <Text style={styles.noti}>아직 등록된 케이크가 없어요.</Text>
        </View>
      ) : (
        <FlatList data={data} renderItem={renderItem} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listView: {
    borderBottomColor: AppStyles.color.border,
    borderBottomWidth: 0.7,
    width: '90%',
    height: '100%',
    paddingVertical: 15,
    paddingTop: 25,
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 13,
    alignSelf: 'center',
  },
  infos: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 16,
  },
  cakeTitle: {
    fontSize: 13,
    marginBottom: 5,
    color: AppStyles.color.black,
    ...Platform.select({
      android: {
        fontFamily: 'NotoSansKR-Bold',
        lineHeight: 16,
      },
      ios: {fontWeight: '800'},
    }),
  },
  desc: {
    marginBottom: 10,
    marginTop: 5,
    fontSize: 11,
    ...Platform.select({
      android: {
        lineHeight: 16,
        fontFamily: 'NotoSansKR-Medium',
      },
      ios: {},
    }),
  },
  price: {
    fontSize: 11,
    color: AppStyles.color.black,
    ...Platform.select({
      android: {
        lineHeight: 16,
        fontFamily: 'NotoSansKR-Medium',
      },
      ios: {fontWeight: '600'},
    }),
  },
  arrow: {
    position: 'absolute',
    right: 1,
    top: '35%',
  },
  noti: {
    fontSize: AppStyles.font.middle,
    marginVertical: 10,
    alignSelf: 'center',
    ...Platform.select({
      android: {
        fontFamily: 'NotoSansKR-Medium',
      },
      ios: {},
    }),
  },
  cake: {
    height: 200,
    width: 150,
    marginTop: 30,
    alignSelf: 'center',
  },
});

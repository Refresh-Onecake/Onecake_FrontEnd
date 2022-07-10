import {
  Image,
  TouchableOpacity,
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
import {AppStyles} from '../../styles/AppStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
      <TouchableOpacity style={styles.listView}>
        <Image style={styles.image} source={{uri: item.item.image}}></Image>
        <View style={styles.infos}>
          <Text style={styles.cakeTitle}>{item.item.menuName}</Text>
          <Text style={styles.desc}>{item.item.menuDescription}</Text>
          <Text style={styles.price}>{item.item.price}~</Text>
          <Icon style={styles.arrow} size={20} name="chevron-right"></Icon>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList data={data} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  listView: {
    borderWidth: 0.7,
    borderColor: AppStyles.color.border,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
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
    fontSize: AppStyles.font.middle,
    fontWeight: '800',
    marginBottom: 5,
  },
  desc: {marginBottom: 10},
  price: {fontWeight: '600'},
  arrow: {
    position: 'absolute',
    right: 1,
    top: '35%',
  },
});

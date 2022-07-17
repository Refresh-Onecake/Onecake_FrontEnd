import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {AppStyles} from '../styles/AppStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MenuList} from '../components/seller/MenuList';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from './navigator';
import {appKeys, queryKeys} from '../enum';
import {useAsync} from '../hooks';
import {getStringValueFromAsyncStorage} from '../utils';
import {storeIdState} from '../recoil/atom';
import {useSetRecoilState} from 'recoil';
import {focusManager, useQuery, useQueryClient} from 'react-query';
import {getMenuList, IMenuList} from '../services';
import {useIsFocused} from '@react-navigation/native';

const Stores = ({navigation}: StackScreenProps<RootStackParamList>) => {
  const queryClient = useQueryClient();
  const [role, setRole] = useState<string>();
  const setStoreId = useSetRecoilState(storeIdState);
  const [error, resetError] = useAsync(async () => {
    resetError();
    const fetchData = await getStringValueFromAsyncStorage(
      appKeys.roleTokenKey,
    );
    if (fetchData) {
      setRole(fetchData);
    }
  });

  const {data, status} = useQuery<IMenuList[]>(
    queryKeys.sellerMenuList,
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getMenuList().then(res => {
        if (!res?.ok) {
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.json();
        }
      }),
    {
      refetchOnWindowFocus: true,

      onSuccess: data => {
        console.log(data);
      },
      onError: err => {
        console.log('메뉴 리스트 불러오기에서 에러 발생');
        const response = err as Error;
        if (response.message === '401') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          queryClient.invalidateQueries(queryKeys.sellerMenuList);
          console.log(`${queryKeys.sellerMenuList.toString()} 쿼리 성공`);
        }
      },
    },
  );
  const isFocused = useIsFocused();
  useEffect(() => {
    focusManager.setFocused(isFocused);
  }, [isFocused]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <SafeAreaView style={styles.view}>
      {role === 'SELLER' ? (
        // TODO: 사장님 페이지
        <>
          <MenuList data={data} />
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setStoreId(0);
              navigation.navigate('StoreDetail');
            }}>
            <Icon
              size={18}
              style={{position: 'absolute', right: 0}}
              name="heart-outline"
            />
            <Image
              style={styles.image}
              source={require('../asset/customer.png')}></Image>
            <Text>[강남구] 링링케이크</Text>
            <View style={styles.liked}>
              <Text style={{marginRight: 3}}>찜</Text>
              {/* TODO: 받아와야함*/}
              <Text>234</Text>
              <Text>개</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default Stores;

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: AppStyles.color.white},
  card: {
    width: 166,
    height: 250,
    borderRadius: 8,
    backgroundColor: 'yellow',
    justifyContent: 'space-between',
  },
  image: {
    width: 166,
    height: 214,
  },
  liked: {
    marginTop: 5,
    flexDirection: 'row',
  },
});

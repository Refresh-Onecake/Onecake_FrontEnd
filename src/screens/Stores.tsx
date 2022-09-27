import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {AppStyles} from '../styles/AppStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MenuList} from '../components/seller/MenuList/MenuList';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from './navigator';
import {appKeys, queryKeys} from '../enum';
import {useAsync} from '../hooks';
import {getStringValueFromAsyncStorage} from '../utils';
import {storeIdState} from '../recoil/atom';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {focusManager, useQuery, useQueryClient} from 'react-query';
import {getMenuList, IMenuList} from '../api';
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
  return (
    <SafeAreaView style={styles.view}>
      {role === 'SELLER' ? (
        // TODO: 사장님 페이지
        <>
          <MenuList data={data} />
        </>
      ) : (
        <View style={styles.flex}>
          <View>
            <Image
              style={{
                width: 250,
                height: 250,
              }}
              source={require('../asset/cake.png')}
            />
          </View>
          <Text style={styles.title}>
            런칭 준비중입니다. 조금만 기다려 주세요.
          </Text>
        </View>
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
  flex: {
    marginTop: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 20,
    color: AppStyles.color.subTitle,
    fontSize: AppStyles.font.middle,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {},
    }),
  },
});

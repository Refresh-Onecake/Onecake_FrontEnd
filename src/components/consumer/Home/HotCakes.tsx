import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {AppStyles} from '../../../styles/AppStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useQuery, useQueryClient} from 'react-query';
import {getHotCakeList, IHotCakeList} from '../../../services';
import {queryKeys} from '../../../enum';
import InfoModal from '../../common/InfoModal';

const phoneWidth = Dimensions.get('window').width;

export const HotCakes = () => {
  const queryClient = useQueryClient();
  const [locationVisible, setLocationVisible] = useState<boolean>(false);

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
          queryClient.invalidateQueries(queryKeys.hotCakeList);
          console.log('쿼리 성공');
        }
      },
    },
  );

  const renderItem = (item: ListRenderItemInfo<IHotCakeList>) => {
    return (
      <>
        <View style={styles.cover} />
        <Image style={styles.image} source={{uri: item.item.image}} />
      </>
    );
  };

  return (
    <>
      <TouchableOpacity
        style={{zIndex: 30}}
        onPress={() => setLocationVisible(true)}>
        <Text style={styles.location} onPress={() => setLocationVisible(true)}>
          마포구
          <Icon name="chevron-down" size={25} color="#D9D9D9" />
          {/* <Image
            style={{width: 15, height: 10}}
            source={require('../../../asset/down.png')}
          /> */}
        </Text>
      </TouchableOpacity>
      <View style={styles.text}>
        <Text style={styles.mainMent}>이번주 HOT한 케이크</Text>
        <Text style={styles.subMent}>
          오늘의 가장 인기있는 케이크를 찾아보세요!
        </Text>
      </View>
      <InfoModal
        modalVisible={locationVisible}
        setModalVisible={setLocationVisible}
        title={'입점 준비중'}
        subTitle={'현재 마포구 가게만 입점되어 있어요!'}
      />
      {/* <View style={styles.index}>
        <Text>index</Text>
      </View> */}
      <FlatList data={data} renderItem={renderItem} horizontal />
      <View
        style={{
          backgroundColor: AppStyles.color.lightGray,
          height: 10,
          borderBottomColor: '#C1C1C1',
          borderBottomWidth: 1,
        }}></View>
    </>
  );
};

const styles = StyleSheet.create({
  location: {
    fontSize: 18,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 44,
    color: AppStyles.color.white,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeo-Bold',
        // lineHeight: 20,
      },
      ios: {
        fontWeight: '800',
      },
    }),
  },
  image: {
    height: 446,
    width: phoneWidth,
  },
  cover: {
    height: 447,
    width: '100%',
    backgroundColor: AppStyles.color.black,
    position: 'absolute',
    opacity: 0.3,
    zIndex: 7,
  },
  index: {
    position: 'absolute',
    opacity: 0.6,
    borderRadius: 10,
    right: 1,
    top: 400,
    marginBottom: 17,
    marginRight: 15,
    height: 22,
    width: 39,
    zIndex: 10,
    backgroundColor: AppStyles.color.black,
  },
  text: {
    top: 370,
    position: 'absolute',
    marginLeft: 16,
    zIndex: 10,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {},
    }),
  },
  mainMent: {
    color: AppStyles.color.white,
    fontSize: 25,
    marginBottom: 8,
    zIndex: 10,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeo-Bold',
        lineHeight: 30,
      },
      ios: {
        fontWeight: '800',
      },
    }),
  },
  subMent: {
    color: AppStyles.color.white,
    fontSize: 13,
    zIndex: 10,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoL',
        lineHeight: 16,
      },
      ios: {},
    }),
  },
});

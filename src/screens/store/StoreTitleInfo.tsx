import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import React, {FC, useState} from 'react';
import {AppStyles} from '../../styles/AppStyles';
import {getStoreTitleInfo, IStoreTitleInfo} from '../../api/storeService';
import {useQuery, useQueryClient} from 'react-query';
import {useRecoilValue} from 'recoil';
import {storeIdState} from '../../recoil/atom';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {appKeys, queryKeys} from '../../enum';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useAsync} from '../../hooks';
import {getStringValueFromAsyncStorage} from '../../utils';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigator';
import {useNavigation} from '@react-navigation/native';
import {Button} from '../../components/common';

export const StoreTitleInfo = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const queryClient = useQueryClient();
  const storeId = useRecoilValue(storeIdState);
  const [liked, setLiked] = useState<boolean>(false);
  const [likedNum, setLikedNum] = useState(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [role, setRole] = useState<string>();
  const [error, resetError] = useAsync(async () => {
    resetError();
    const fetchData = await getStringValueFromAsyncStorage(
      appKeys.roleTokenKey,
    );
    if (fetchData) {
      console.log('role', fetchData);
      setRole(fetchData);
    }
  });

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const {data} = useQuery<IStoreTitleInfo>(
    queryKeys.storeTitleInfo,
    async () =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      await getStoreTitleInfo(storeId).then(res => {
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
        setLiked(data.isLiked);
        setLikedNum(data.likeNum);
      },
      onError: err => {
        console.log(err);
        const response = err as Error;
        if (response.message === '401') {
          queryClient.invalidateQueries(queryKeys.sellerMenuList);
          console.log('쿼리 성공');
        }
      },
    },
  );

  const pressHeart = async () => {
    setLiked(!liked);
    liked ? setLikedNum(likedNum - 1) : setLikedNum(likedNum + 1);
    const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
    if (token) {
      const response = await fetch(
        `https://want-onecake.com/api/v1/consumer/stores/${storeId}/like`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      ).then(res => {
        res.json().then(res => console.log(res));
      });
    }
  };

  return (
    <>
      <Image style={styles.image} source={{uri: data?.storeImage}} />
      <View
        style={[
          styles.back,
          {
            ...Platform.select({
              android: {
                height: '20%',
              },
            }),
          },
        ]}
      />
      <View style={styles.titleInfo}>
        <View>
          <Text style={styles.storeName}>{data?.storeName}</Text>
          <Text
            style={[
              {
                marginTop: 10,
                fontSize: AppStyles.font.subTitle,
              },
              {
                ...Platform.select({
                  android: {
                    fontFamily: 'AppleSDGothicNeoM',
                  },
                }),
              },
            ]}>
            {data?.storeDescription}
          </Text>
        </View>
        <View style={styles.userOptionWrapper}>
          <View
            style={[
              styles.userOption,
              {
                borderRightWidth: 1,
                borderColor: AppStyles.color.border,
              },
            ]}>
            <TouchableOpacity onPress={pressHeart}>
              <Icon size={18} name={liked ? 'heart' : 'heart-outline'} />
            </TouchableOpacity>
            <Text
              style={[
                {marginLeft: 5, marginRight: 5},
                {
                  ...Platform.select({
                    android: {
                      fontFamily: 'AppleSDGothicNeoM',
                    },
                  }),
                },
              ]}>
              찜
            </Text>
            <Text
              style={{
                ...Platform.select({
                  android: {
                    fontFamily: 'AppleSDGothicNeoM',
                  },
                }),
              }}>
              {likedNum}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.userOption}
            onPress={
              role === 'SELLER'
                ? () => navigation.navigate('MainNavigator', {screen: '상담'})
                : toggleModal
            }>
            <Icon
              style={{marginRight: 5}}
              size={18}
              name="chat-processing-outline"
            />
            <Text
              style={{
                ...Platform.select({
                  android: {
                    fontFamily: 'AppleSDGothicNeoM',
                  },
                }),
              }}>
              상담하기
            </Text>
          </TouchableOpacity>
          <Modal isVisible={modalVisible}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>{data?.storeName}</Text>
              <TouchableOpacity
                style={{position: 'absolute', left: '100%', bottom: '100%'}}
                onPress={toggleModal}>
                <Image
                  style={styles.Xicon}
                  source={require('../../asset/close_X.png')}
                />
              </TouchableOpacity>
              <Image
                style={styles.speaker}
                source={require('../../asset/speaker.png')}
              />
              <View style={styles.btn}>
                <Button text="카카오톡 채널로 이동" />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 280,
  },
  back: {
    width: '100%',
    ...Platform.select({
      android: {
        paddingTop: 140,
      },
      ios: {
        paddingTop: 30,
        marginBottom: 20,
      },
    }),
    backgroundColor: AppStyles.color.white,
  },
  storeName: {
    color: AppStyles.color.black,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
        lineHeight: 30,
      },
      ios: {
        fontWeight: '500',
      },
    }),
    fontSize: AppStyles.font.title,
  },
  userOptionWrapper: {
    flexDirection: 'row',
    marginTop: 10,
  },
  userOption: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
  },
  Xicon: {
    height: 15,
    width: 15,
  },
  btn: {
    width: 304,
    height: 44,
    alignSelf: 'center',
    bottom: 1,
    position: 'absolute',
    marginBottom: '5%',
  },
  titleInfo: {
    top: 250,
    position: 'absolute',
    width: 370,
    height: 160,
    alignSelf: 'center',
    borderRadius: 13,
    backgroundColor: AppStyles.color.white,
    justifyContent: 'space-evenly',
    alignContent: 'center',
    paddingHorizontal: AppStyles.padding.small,
    paddingVertical: 10,
    ...Platform.select({
      ios: {
        top: '28%',
        shadowColor: '#000000',
        shadowRadius: 7,
        shadowOffset: {height: 1, width: 1},
        shadowOpacity: 0.11,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modal: {
    alignSelf: 'center',
    width: 350,
    height: 390,
    backgroundColor: AppStyles.color.white,
    borderRadius: 30,
    padding: 20,
  },
  modalTitle: {
    fontSize: AppStyles.font.large,
    alignSelf: 'center',
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
        lineHeight: 30,
      },
      ios: {fontWeight: '600'},
    }),
  },
  speaker: {
    height: 250,
    width: 200,
    marginTop: '5%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

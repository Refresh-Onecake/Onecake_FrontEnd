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
import {getStoreTitleInfo, IStoreTitleInfo} from '../../services/storeService';
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
      <View style={styles.back} />
      <View style={styles.titleInfo}>
        <View>
          <Text
            style={{
              fontSize: AppStyles.font.title,
              fontWeight: '500',
            }}>
            {data?.storeName}
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: AppStyles.font.subTitle,
            }}>
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
                backgroundColor: 'red',
              },
            ]}>
            <TouchableOpacity onPress={pressHeart}>
              <Icon size={15} name={liked ? 'heart' : 'heart-outline'} />
            </TouchableOpacity>
            <Text style={{marginLeft: 5, marginRight: 5}}>찜</Text>
            <Text>{likedNum}</Text>
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
              size={15}
              name="chat-processing-outline"
            />
            <Text>상담하기</Text>
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
    height: '30%',
  },
  back: {
    width: '100%',
    ...Platform.select({
      android: {
        height: '15%',
      },
      ios: {
        paddingTop: 30,
        marginBottom: 20,
      },
    }),
    backgroundColor: AppStyles.color.white,
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
    top: '26%',
    position: 'absolute',
    width: 370,
    height: '16%',
    alignSelf: 'center',
    borderRadius: 13,
    backgroundColor: AppStyles.color.white,
    justifyContent: 'space-evenly',
    alignContent: 'center',
    paddingHorizontal: AppStyles.padding.small,
    paddingVertical: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 10,
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
    fontWeight: '600',
    alignSelf: 'center',
  },
  speaker: {
    height: 250,
    width: 200,
    marginTop: '5%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

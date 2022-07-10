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
import {Button} from '../../components';

export const StoreTitleInfo: FC = () => {
  const queryClient = useQueryClient();
  const storeId = useRecoilValue(storeIdState);
  const [liked, setLiked] = useState<boolean>(false);
  const [likedNum, setLikedNum] = useState(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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
        `http://15.165.27.120:8080/api/v1/consumer/stores/${storeId}/like`,
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
      <Image style={styles.image} source={{uri: data?.storeImage}}></Image>
      <SafeAreaView style={styles.back}></SafeAreaView>
      <SafeAreaView style={styles.titleInfo}>
        <View>
          <Text
            style={{
              fontSize: AppStyles.font.title,
            }}>
            {data?.storeName}
          </Text>
          <Text
            style={{
              fontSize: AppStyles.font.subTitle,
            }}>
            {data?.storeDescription}
          </Text>
        </View>
        <View style={styles.userOptionWrapper}>
          <View
            style={[
              styles.userOption,
              {borderRightWidth: 1, borderColor: AppStyles.color.border},
            ]}>
            <TouchableOpacity onPress={pressHeart}>
              <Icon size={15} name={liked ? 'heart' : 'heart-outline'}></Icon>
            </TouchableOpacity>
            <Text style={{marginLeft: 5, marginRight: 5}}>찜</Text>
            <Text>{likedNum}</Text>
          </View>
          <TouchableOpacity style={styles.userOption} onPress={toggleModal}>
            <Icon
              style={{marginRight: 5}}
              size={15}
              name="chat-processing-outline"></Icon>
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
                  source={require('../../asset/close_X.png')}></Image>
              </TouchableOpacity>
              <Image
                style={styles.speaker}
                source={require('../../asset/speaker.png')}></Image>
              <View style={styles.btn}>
                <Button text="카카오톡 채널로 이동"></Button>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: AppStyles.color.white}} />
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
    height: '13%',
    backgroundColor: AppStyles.color.white,
    marginBottom: 10,
  },
  userOptionWrapper: {
    flexDirection: 'row',
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
  btn: {width: 304, height: 44, alignSelf: 'center'},
  titleInfo: {
    top: '26%',
    position: 'absolute',
    width: 370,
    height: '15%',
    alignSelf: 'center',
    borderRadius: 13,
    backgroundColor: AppStyles.color.white,
    justifyContent: 'space-evenly',
    alignContent: 'center',
    paddingHorizontal: AppStyles.padding.small,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.5,
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
    height: 270,
    width: 300,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
});

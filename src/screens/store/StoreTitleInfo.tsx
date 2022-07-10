import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useEffect, useState, FC} from 'react';
import {AppStyles} from '../../styles/AppStyles';
import {getStoreTitleInfo, IstoreTitleInfo} from '../../services/storeService';
import {useQuery} from 'react-query';
import {queryKeys} from '../../enum';
import {useRecoilValue} from 'recoil';
import {storeIdState} from '../../recoil/atom';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const StoreTitleInfo: FC = () => {
  const storeId = useRecoilValue(storeIdState);

  const {data} = useQuery<IstoreTitleInfo>(
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
      onError: err => {
        console.log(err);
      },
    },
  );

  return (
    <>
      <Image style={styles.image} source={{uri: data?.storeImage}}></Image>
      <SafeAreaView
        style={{
          width: '100%',
          height: '15%',
          backgroundColor: AppStyles.color.white,
          marginBottom: 10,
        }}></SafeAreaView>
      <SafeAreaView style={styles.titleInfo}>
        <View>
          <Text
            style={{
              fontSize: AppStyles.font.title,
              marginBottom: 10,
            }}>
            {data?.storeName}
          </Text>
          <Text
            style={{
              fontSize: AppStyles.font.subTitle,
              marginBottom: 20,
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
            {/*TODO: 눌렀을 때 색 채워지기, 개수 받아오기.*/}
            <Icon size={15} name="heart-outline"></Icon>
            <Text style={{marginLeft: 5, marginRight: 5}}>찜</Text>
            {/* <Text>data?.storeLikeNum</Text> */}
            <Text>개수</Text>
          </View>
          <TouchableOpacity style={styles.userOption}>
            <Icon
              style={{marginRight: 5}}
              size={15}
              name="chat-processing-outline"></Icon>
            <Text>상담하기</Text>
          </TouchableOpacity>
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
  userOptionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  userOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  titleInfo: {
    top: '26%',
    position: 'absolute',
    width: 370,
    height: 147,
    alignSelf: 'center',
    borderRadius: 13,
    backgroundColor: AppStyles.color.white,
    justifyContent: 'space-between',
    alignContent: 'center',
    padding: AppStyles.padding.small,
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
});

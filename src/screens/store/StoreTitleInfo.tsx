import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, {useEffect} from 'react';
import {AppStyles} from '../../styles/AppStyles';
import {getStoreTitleInfo, IstoreTitleInfo} from '../../services/storeService';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {queryKeys} from '../../enum';

export default function StoreTitleInfo(storeId: number) {
  // const getStoreDetailInfo = async () => {
  //   // const token = await AsyncStorage.getItem(appKeys.accessTokenKey);
  //   const response = await fetch(
  //     `${baseURL}/api/v1/consumer/stores/1/mainInfo`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY1Njg3MzQ1M30.O3I4pIvxt0_lk-CkSBVVHUpcsLh_sWf5R9yNlyVP-_z7S8VDOW1574GrADuIh083erLf4JeehGcvRsbYN2_G7Q`,
  //       },
  //     },
  //   )
  //     .then(response => response.json())
  //     .then(data => {
  //       IStoreDetailInfo.likedNum = data.likedNum;
  //       IStoreDetailInfo.storeDescription = data.storeDescription;
  //       IStoreDetailInfo.storeName = data.storeName;
  //       console.log(data);
  //     })
  //     .catch(error => {
  //       console.error('실패:', error);
  //     });
  // };

  const {data} = useQuery<IstoreTitleInfo>(
    queryKeys.sellerMenuList,
    async () =>
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
            {/*TODO: 받아와야 함*/}
            {data?.storeName}
          </Text>
          {/*TODO: 설명 받아와야 함*/}
          <Text>{data?.storeDescription}</Text>
        </View>
        <View style={styles.userOptionWrapper}>
          <View
            style={[
              styles.userOption,
              {borderRightWidth: 1, borderColor: AppStyles.color.border},
            ]}></View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 375,
    height: '30%',
  },
  userOptionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  userOption: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%',
  },
  titleInfo: {
    top: '25%',
    position: 'absolute',
    width: 350,
    height: 146,
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

import {
  StyleSheet,
  Image,
  View,
  Text,
  SafeAreaView,
  Platform,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../navigator';
import React, {FC, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppStyles} from '../../styles/AppStyles';
import {Button} from '../../components';
import TabView from './TabView';

type Props = StackScreenProps<RootStackParamList, 'StoreDetail'>;

type IStoreInfo = {
  likedNum: 0;
  reviewNum: 0;
  storeDescription: 'string';
  storeImage: 'string';
  storeName: 'string';
};

const token =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY1NjYxNDkyOX0.yCoykwPZMV8kz-2ZEfpsumb0Jxv7H-M4tGxivagosvu-TylRoyNJRM4TohWUqg9hkB4MxZmtPntSo1nQqfP0kA';
const baseURL = 'http://15.165.27.120:8080';

export const StoreDetail: FC<Props> = ({
  route,
  navigation,
}: StackScreenProps<RootStackParamList>) => {
  const titleInfoCard = useRef<SafeAreaView>(null);
  const storeId = route.params;
  console.log(storeId);

  const getStoreInfo = async () => {
    const data = await fetch(`${baseURL}/api/v1/consumer/stores/1/mainInfo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then(res => {
      if (!res?.ok) {
        throw new Error(res?.status.toString());
      } else {
        if (res) console.log(res);
      }
    });
  };

  return (
    <>
      {/*TODO: 눌렀을 때 색 채워지기*/}
      <Icon size={24} name="heart-outline" style={styles.heart}></Icon>
      {/*TODO: 이미지 받아와야 함*/}
      <Image
        style={styles.image}
        source={require('../../asset/customer.png')}></Image>
      <SafeAreaView
        style={{
          width: '100%',
          height: '20%',
          backgroundColor: AppStyles.color.white,
          marginBottom: 10,
        }}></SafeAreaView>
      <SafeAreaView style={styles.titleInfo} ref={titleInfoCard}>
        <View>
          <Text
            style={{
              fontSize: AppStyles.font.title,
              marginBottom: 10,
            }}>
            {/*TODO: 받아와야 함*/}
            링링케이크
          </Text>
          {/*TODO: 설명 받아와야 함*/}
          <Text>
            마포구에 위치한 케이크 가게에요. 어쩌구저꺼주 이렇게 이렇게
          </Text>
        </View>
        <View style={styles.userOptionWrapper}>
          <View
            style={[
              styles.userOption,
              {borderRightWidth: 1, borderColor: AppStyles.color.border},
            ]}></View>
        </View>
      </SafeAreaView>
      <TabView></TabView>
      <SafeAreaView style={styles.OrderBtnWrapper}>
        {/* TODO: 주문서 */}
        <View style={styles.OrderBtn}>
          <Button text="주문서 작성하기" onPress={getStoreInfo}></Button>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 375,
    height: '40%',
  },
  titleInfo: {
    top: '35%',
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
  userOptionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  userOption: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%',
  },
  heart: {
    position: 'absolute',
    right: 1,
    marginRight: 20,
    marginTop: 20,
  },
  OrderBtnWrapper: {
    backgroundColor: AppStyles.color.white,
    position: 'absolute',
    bottom: 1,
    width: '100%',
    height: 105,
    alignSelf: 'center',
  },
  OrderBtn: {
    height: 44,
    width: 344,
    marginTop: 13,
    alignSelf: 'center',
  },
});

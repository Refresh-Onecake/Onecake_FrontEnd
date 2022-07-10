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
import React, {FC, useRef, useEffect, useState} from 'react';
import {AppStyles} from '../../styles/AppStyles';
import {BottomSheet, Button} from '../../components';
import TabView from './TabView';
import {IstoreTitleInfo, getCakeSize} from '../../services/storeService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appKeys} from '../../enum';
import {StoreTitleInfo} from './StoreTitleInfo';
import {storeIdState} from '../../recoil/atom';
import {useRecoilValue} from 'recoil';

type Props = StackScreenProps<RootStackParamList, 'StoreDetail'>;

export const StoreDetail: FC<Props> = navigation => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const storeId = useRecoilValue(storeIdState);

  const showOrderList = async (storeId: number) => {
    const data = await getCakeSize(storeId);
    setModalVisible(true);
  };

  return (
    <>
      {/*TODO: 이미지 받아와야 함*/}
      <StoreTitleInfo></StoreTitleInfo>
      <TabView></TabView>
      <SafeAreaView style={styles.OrderBtnWrapper}>
        {/* TODO: 주문서 */}
        <View style={styles.OrderBtn}>
          <Button
            text="주문서 작성하기"
            onPress={() => showOrderList(storeId)}></Button>
        </View>
        <BottomSheet
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          height="40%">
          <View>
            <Text>케이크사이즈</Text>
          </View>
        </BottomSheet>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 375,
    height: '30%',
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
    zIndex: 10,
    elevation: Platform.OS === 'android' ? 50 : 0,
  },
  OrderBtn: {
    height: 44,
    width: 344,
    marginTop: 13,
    alignSelf: 'center',
    zIndex: 10,
    elevation: Platform.OS === 'android' ? 50 : 0,
  },
});

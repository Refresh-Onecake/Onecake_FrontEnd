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
import {TabView} from './TabView';
import {getCakeSize} from '../../services/storeService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appKeys} from '../../enum';
import {StoreTitleInfo} from './StoreTitleInfo';
import {storeIdState} from '../../recoil/atom';
import {useRecoilValue} from 'recoil';

type Props = StackScreenProps<RootStackParamList, 'StoreDetail'>;

export const StoreDetail: FC<Props> = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const storeId = useRecoilValue(storeIdState);

  const showOrderList = async (storeId: number) => {
    const data = await getCakeSize(storeId);
    setModalVisible(true);
  };

  return (
    <>
      <StoreTitleInfo />
      <TabView />
      <View style={styles.OrderBtnWrapper}>
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  OrderBtnWrapper: {
    backgroundColor: AppStyles.color.white,
    bottom: 1,
    width: '100%',
    height: '11%',
    alignSelf: 'center',
    // elevation: Platform.OS === 'android' ? 50 : 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: {
        elevation: 50,
      },
    }),
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

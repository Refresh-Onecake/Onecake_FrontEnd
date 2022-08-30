import {
  AppState,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback, useState} from 'react';
import {orderStatusKeys} from '../../../enum';
import {AppStyles} from '../../../styles/AppStyles';
import InfoModal from '../../common/InfoModal';
import {useSetRecoilState} from 'recoil';
import {orderHistoryIdState} from '../../../recoil/atom';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../screens/navigator';

type ConsumerOrderCardBtnProps = {
  currentOrderState: string;
  orderHistoryId: number;
};
export const ConsumerOrderCardBtn: FC<ConsumerOrderCardBtnProps> = ({
  currentOrderState,
  orderHistoryId,
}) => {
  console.log(orderHistoryId);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const setOrderHistoryId = useSetRecoilState(orderHistoryIdState);
  const ModalToggle = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);

  const ConsumerOrderCardOrderDetailBtn = useCallback(() => {
    return (
      <View style={styles.btnTextWrap}>
        <Image
          source={require('../../../asset/order.png')}
          style={styles.orderDetailIcon}
        />
        <Text style={styles.btnText}>주문상세</Text>
      </View>
    );
  }, []);

  const ConsumerOrderCardReviewBtn = useCallback(() => {
    return (
      <View style={styles.btnTextWrap}>
        <Image
          source={require('../../../asset/edit.png')}
          style={styles.orderDetailIcon}
        />
        <Text style={styles.btnText}>리뷰쓰기</Text>
      </View>
    );
  }, []);

  const onClickOrderHistoryDetail = () => {
    setOrderHistoryId(orderHistoryId);
    navigation.navigate('OrderDetail');
  };

  return (
    <View style={styles.btnWrap}>
      {currentOrderState.toLowerCase() !== orderStatusKeys.픽업완료 ? (
        <TouchableOpacity
          style={styles.singleBtnWrap}
          onPress={onClickOrderHistoryDetail}>
          <ConsumerOrderCardOrderDetailBtn />
        </TouchableOpacity>
      ) : (
        <View style={styles.CompletedBtnWrap}>
          <TouchableOpacity onPress={onClickOrderHistoryDetail}>
            <ConsumerOrderCardOrderDetailBtn />
          </TouchableOpacity>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 100,
              borderColor: AppStyles.color.border,
            }}
          />
          <TouchableOpacity onPress={ModalToggle}>
            <ConsumerOrderCardReviewBtn />
          </TouchableOpacity>
        </View>
      )}
      <InfoModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  btnWrap: {
    borderRadius: 5,
    borderColor: '#D5D5D5',
    borderWidth: 1,
    height: 49,
    justifyContent: 'center',
  },
  orderDetailIcon: {
    width: 13,
    height: 13,
    marginRight: 6.89,
  },
  btnTextWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  singleBtnWrap: {
    alignItems: 'center',
  },
  CompletedBtnWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  btnText: {
    fontSize: 11,
    color: AppStyles.color.black,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {
        fontWeight: '600',
      },
    }),
  },
});

import {
  AppState,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback, useState} from 'react';
import {orderStatusKeys} from '../../../enum';
import {AppStyles} from '../../../styles/AppStyles';
import InfoModal from '../../common/InfoModal';

type ConsumerOrderCardBtnProps = {
  currentOrderState: string;
};
export const ConsumerOrderCardBtn: FC<ConsumerOrderCardBtnProps> = ({
  currentOrderState,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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

  return (
    <View style={styles.btnWrap}>
      {currentOrderState.toLowerCase() !== orderStatusKeys.픽업완료 ? (
        <TouchableOpacity style={styles.singleBtnWrap}>
          <ConsumerOrderCardOrderDetailBtn />
        </TouchableOpacity>
      ) : (
        <View style={styles.CompletedBtnWrap}>
          <TouchableOpacity>
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
    fontWeight: '600',
    fontSize: 11,
    color: AppStyles.color.black,
  },
});

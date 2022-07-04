import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import {orderStatusKeys} from '../../enum';
import {Button} from '../common/Button';
import {AppStyles} from '../../styles/AppStyles';
import Modal from 'react-native-modal';
import {ModalHeader} from '../common/ModalHeader';

type OrderManageFooterProps = {
  status: typeof orderStatusKeys[keyof typeof orderStatusKeys];
};

export const OrderManageFooter: FC<OrderManageFooterProps> = ({status}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <View>
      {
        {
          [orderStatusKeys.주문대기중]: (
            <View style={[styles.view, styles.shadowView]}>
              <View style={styles.btnWrap}>
                <Button text="주문 진행하기" />
              </View>
              <View style={styles.btnWrap}>
                <Button
                  text="주문 취소하기"
                  onPress={() => setModalVisible(true)}
                />
              </View>
            </View>
          ),
          [orderStatusKeys.주문완료]: (
            <View style={[styles.view, styles.shadowView]}>
              <View style={styles.btnWrap}>
                <Button text="케이크 제작하기" />
              </View>
            </View>
          ),
          [orderStatusKeys.제작중]: (
            <View style={[styles.view, styles.shadowView]}>
              <View style={styles.btnWrap}>
                <Button text="픽업 완료하기" />
              </View>
            </View>
          ),
          [orderStatusKeys.픽업완료]: <></>,
          [orderStatusKeys.취소된주문]: (
            <View style={[styles.view, styles.shadowView]}>
              <View style={styles.btnWrap}>
                <Button text="다시 진행하기" />
              </View>
            </View>
          ),
        }[status]
      }
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <SafeAreaView style={styles.modalView}>
          <ModalHeader
            title="주문 취소 사유 선택"
            setVisible={setModalVisible}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    paddingHorizontal: 13,
    paddingTop: 13,
    marginTop: 10,
    justifyContent: 'space-around',
    backgroundColor: AppStyles.color.white,
  },
  btnWrap: {
    padding: 7,
    flex: 1,
    height: 60,
  },
  shadowView: {
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowRadius: 9,
        shadowOffset: {height: -20, width: 0},
        shadowOpacity: 0.05,
      },
    }),
  },
  modalView: {
    backgroundColor: AppStyles.color.white,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

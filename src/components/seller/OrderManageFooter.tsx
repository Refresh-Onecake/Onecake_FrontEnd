import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import Modal from 'react-native-modal';

import {orderStatusKeys, queryKeys} from '../../enum';
import {Button} from '../common/Button';
import {AppStyles} from '../../styles/AppStyles';
import {ModalHeader} from '../common/ModalHeader';
import {RadioList} from '../common/RadioList';
import {orderSheetChangeState} from '../../services/orderService';
import {useMutation, useQueryClient} from 'react-query';
import {getMultipleData} from '../../../App';
import {refetchToken} from '../../services';
import {useRecoilValue} from 'recoil';
import {orderSheetIdState} from '../../recoil/atom';

type OrderManageFooterProps = {
  // status: typeof orderStatusKeys[keyof typeof orderStatusKeys];
  state: string;
};
export const cancelReasonList = ['고객 요청', '가게 사정', '재료 소진', '기타'];

export const OrderManageFooter: FC<OrderManageFooterProps> = ({state}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [cancelReason, setCancelReason] = useState<string>('');
  const orderId = useRecoilValue(orderSheetIdState);
  const queryClient = useQueryClient();

  const ChangeStatusMutation = useMutation(
    async (orderId: number) =>
      await orderSheetChangeState(orderId).then(async res => {
        if (!res?.ok) {
          if (res?.status === 401) {
            const tokens = await getMultipleData();
            refetchToken(tokens);
          }
          throw new Error(res?.status.toString());
        } else {
          if (res) return res.text();
        }
      }),
    {
      retry: 3,
      onSuccess: data => {
        console.log(data);
        queryClient.invalidateQueries(queryKeys.sellerOrderList);
        queryClient.invalidateQueries(queryKeys.sellerOrderSheet);
      },
      onError: err => {
        console.log(err);
      },
    },
  );

  const handleClickChangeStatus = () => {
    ChangeStatusMutation.mutate(orderId);
  };

  return (
    <View>
      {
        {
          ['RECEIVED'.toString()]: (
            <View style={[styles.view, styles.shadowView]}>
              <View style={styles.btnWrap}>
                <Button
                  text="주문 진행하기"
                  onPress={handleClickChangeStatus}
                />
              </View>
              <View style={styles.btnWrap}>
                <Button
                  text="주문 취소하기"
                  onPress={() => setModalVisible(true)}
                />
              </View>
            </View>
          ),
          ['ACCEPTED'.toString()]: (
            <View style={[styles.view, styles.shadowView]}>
              <View style={styles.btnWrap}>
                <Button
                  text="케이크 제작하기"
                  onPress={handleClickChangeStatus}
                />
              </View>
            </View>
          ),
          ['MAKING'.toString()]: (
            <View style={[styles.view, styles.shadowView]}>
              <View style={styles.btnWrap}>
                <Button
                  text="픽업 완료하기"
                  onPress={handleClickChangeStatus}
                />
              </View>
            </View>
          ),
          ['CANCELED'.toString()]: <></>,
          [orderStatusKeys.취소된주문]: (
            <View style={[styles.view, styles.shadowView]}>
              <View style={styles.btnWrap}>
                <Button
                  text="다시 진행하기"
                  onPress={handleClickChangeStatus}
                />
              </View>
            </View>
          ),
        }[state]
      }
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <SafeAreaView style={styles.modalView}>
          <ModalHeader
            title="주문 취소 사유 선택"
            setVisible={setModalVisible}
          />
          <RadioList
            renderList={cancelReasonList}
            setSelectedItem={setCancelReason}
            selectedItem={cancelReason}
          />
          <View style={styles.modalBtnWrap}>
            <Button text="취소하기" />
          </View>
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
  modalBtnWrap: {
    height: 60,
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

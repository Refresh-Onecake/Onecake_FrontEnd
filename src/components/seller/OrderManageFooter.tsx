import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {orderStatusKeys} from '../../enum';
import {Button} from '../common/Button';
import {AppStyles} from '../../styles/AppStyles';

type OrderManageFooterProps = {
  status: typeof orderStatusKeys[keyof typeof orderStatusKeys];
};

export const OrderManageFooter: FC<OrderManageFooterProps> = ({status}) => {
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
                <Button text="주문 취소하기" />
              </View>
            </View>
          ),
          [orderStatusKeys.주문완료]: <Text>주문 완료</Text>,
          [orderStatusKeys.제작중]: <Text>주문 제작중</Text>,
          [orderStatusKeys.제작완료]: <Text>주문 제작완료</Text>,
          [orderStatusKeys.취소된주문]: <Text>주문 취소된 주문</Text>,
        }[status]
      }
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
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000000',
        shadowRadius: 9,
        shadowOffset: {height: -20, width: 0},
        shadowOpacity: 0.05,
      },
    }),
  },
});

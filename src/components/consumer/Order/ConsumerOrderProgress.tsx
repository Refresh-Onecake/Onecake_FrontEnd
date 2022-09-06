import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {AppStyles} from '../../../styles/AppStyles';

const ORDER_STATE_LIST = ['RECEIVED', 'ACCEPTED', 'MAKING', 'COMPLETED'];

type ConsumerOrderProgressProps = {
  currentOrderState: string;
};
export const ConsumerOrderProgress: FC<ConsumerOrderProgressProps> = ({
  currentOrderState,
}) => {
  return (
    <>
      {ORDER_STATE_LIST.map((val, idx) => (
        <View
          key={idx}
          style={[
            styles.textWrap,
            currentOrderState === val
              ? {backgroundColor: AppStyles.color.hotPink}
              : {backgroundColor: AppStyles.color.border},
          ]}>
          <Text style={styles.text}>{idx + 1}</Text>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  textWrap: {
    width: 17,
    height: 17,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  text: {
    fontSize: 13,
    color: AppStyles.color.white,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
        lineHeight: 16,
      },
      ios: {
        fontWeight: '500',
      },
    }),
  },
});

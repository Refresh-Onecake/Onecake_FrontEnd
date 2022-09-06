import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React from 'react';
import {Button, ButtonProps} from './Button';
import {AppStyles} from '../../styles/AppStyles';
import {commonStyles} from '../../styles/commonStyles';

export const ScreenBottomButton = ({
  ...props
}: ButtonProps & TouchableOpacityProps) => {
  return (
    <View style={[styles.BottomBtnWrap, commonStyles.shadowTop]}>
      <Button {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  BottomBtnWrap: {
    height: 58,
    paddingTop: 14,
    paddingHorizontal: 15,
    backgroundColor: AppStyles.color.white,
    ...Platform.select({
      android: {
        height: 72,
        paddingBottom: 14,
      },
      ios: {
        height: 58,
      },
    }),
  },
});

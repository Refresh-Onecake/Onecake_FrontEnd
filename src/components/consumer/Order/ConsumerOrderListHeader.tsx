import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {AppStyles} from '../../../styles/AppStyles';

export const ConsumerOrderListHeader: FC<TouchableOpacityProps> = ({
  ...props
}) => {
  return (
    <View style={styles.view}>
      <View style={{width: 24, height: 24}} />
      <Text style={styles.title}>나의 주문 내역</Text>
      <TouchableOpacity {...props}>
        <Image
          style={styles.retry}
          source={require('../../../asset/retry.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    paddingHorizontal: 23,
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    fontSize: 15,
    color: AppStyles.color.black,
    ...Platform.select({
      android: {
        marginTop: 20,
        fontFamily: 'NotoSansKR-Medium',
      },
      ios: {
        fontWeight: '600',
      },
    }),
  },
  retry: {
    width: 24,
    height: 24,
    ...Platform.select({
      android: {
        marginTop: 30,
      },
    }),
  },
});

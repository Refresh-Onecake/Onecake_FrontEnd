import {
  Image,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {IConsumerOrderHistoryType} from '../../../services/Consumer';
import {commonStyles} from '../../../styles/commonStyles';
import {AppStyles} from '../../../styles/AppStyles';
import {orderStateTranslate} from '../../../utils';
import {ConsumerOrderProgress} from './ConsumerOrderProgress';
import {ConsumerOrderCardBtn} from './ConsumerOrderCardBtn';

type IConsumerOrderCardProps = {
  item: IConsumerOrderHistoryType;
  index: number;
  dataLength: number;
};

export const ConsumerOrderCard: FC<IConsumerOrderCardProps> = ({
  item,
  index,
  dataLength,
}) => {
  return (
    <View
      style={[
        styles.view,
        commonStyles.lightShadow,
        index !== dataLength - 1 && {marginBottom: 18.9},
      ]}>
      <View style={styles.cardHeader}>
        <Image source={{uri: item.menuImage}} style={styles.menuImage} />
        <View style={styles.cardHeaderInfoWrap}>
          <View style={styles.cardHeaderTitle}>
            <Text
              style={[
                styles.cardHeaderTitleText,
                {color: AppStyles.color.black},
              ]}>
              {item.storeName}{' '}
            </Text>
            <Text
              style={[
                styles.cardHeaderTitleText,
                {color: AppStyles.color.hotPink},
              ]}>
              {orderStateTranslate(item.orderState)}
            </Text>
          </View>
          <Text style={styles.cardHeaderSubTitleText} numberOfLines={2}>
            {item.menuName} {item.menuPrice}원
          </Text>
        </View>
      </View>
      {/* 주문 상태 */}
      <View style={styles.ConsumerOrderProgressWrap}>
        <View style={styles.ConsumerOrderProgressBorder} />
        <ConsumerOrderProgress currentOrderState={item.orderState} />
      </View>
      {/* 주문 상태에 따른 버튼 */}
      <View style={styles.ConsumerOrderCardBtnWrap}>
        <ConsumerOrderCardBtn
          currentOrderState={item.orderState}
          orderHistoryId={item.orderHistoryId}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    padding: 18,
    borderRadius: 16,
    width: 336.49,
    height: 225.99,
    backgroundColor: AppStyles.color.white,
  },
  cardHeader: {
    flexDirection: 'row',
  },
  cardHeaderInfoWrap: {
    paddingLeft: 18,
    justifyContent: 'center',
    flexShrink: 1,
  },
  cardHeaderTitle: {
    flexDirection: 'row',
    flexShrink: 1,
  },
  menuImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  cardHeaderTitleText: {
    fontWeight: '600',
    fontSize: 15,
    flexShrink: 1,
    ...Platform.select({
      android: {
        fontFamily: 'NotoSansKR-Medium',
        lineHeight: 18,
      },
      ios: {
        fontWeight: '600',
      },
    }),
  },
  cardHeaderSubTitleText: {
    paddingTop: 6.41,
    fontSize: 13,
    lineHeight: 16,
    color: '#777777',
    ...Platform.select({
      android: {
        fontFamily: 'NotoSansKR-Medium',
      },
      ios: {
        fontWeight: '500',
      },
    }),
  },
  ConsumerOrderProgressWrap: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 34,
  },
  ConsumerOrderProgressBorder: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: AppStyles.color.border,
    width: '100%',
    zIndex: 10,
    top: '50%',
  },
  ConsumerOrderCardBtnWrap: {
    marginTop: 20,
  },
});

import {
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {FC} from 'react';
import {ISellerOrder, IStoreMenuListDto} from '../../services/orderService';
import {AppStyles} from '../../styles/AppStyles';
import {priceFormatParser} from '../../utils';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {orderListModalState, orderSheetIdState} from '../../recoil/atom';
import {appKeys} from '../../enum';
export type OrderManageContentProps = {
  renderData: ISellerOrder[];
  status: string;
};
export const OrderManageContent: FC<OrderManageContentProps> = ({
  renderData,
  status,
}) => {
  const RenderItem = ({
    item,
    idx,
    id,
  }: {
    item: IStoreMenuListDto;
    idx: number;
    id: number;
  }) => {
    const setOrderSheetId = useSetRecoilState(orderSheetIdState);
    const [orderListState, setOrderModalState] =
      useRecoilState(orderListModalState);

    const onPressItem = () => {
      setOrderModalState(appKeys.orderListMore);
      setOrderSheetId(id);
    };

    return (
      <TouchableOpacity
        style={[
          styles.listItem,
          idx !== 0 && {
            borderTopWidth: 1,
            borderTopColor: AppStyles.color.border,
          },
        ]}
        onPress={onPressItem}>
        <View style={{paddingRight: 11.61}}>
          {/* FIXME: 이후 item.uri로 변경할 예정 */}
          <Image
            style={styles.image}
            source={{
              uri: item.image,
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.title}>{item.menuName}</Text>
          <Text style={styles.subTitle}>{item.menuDescription}</Text>
          <Text style={styles.price}>{item.price}원~</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 24,
      }}>
      <Text style={styles.viewTitle}>{status}</Text>
      <View>
        {renderData.length > 0 &&
          renderData.map(({storeMenuListDto, id}, idx) => (
            <RenderItem item={storeMenuListDto} idx={idx} id={id} key={id} />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewTitle: {
    color: AppStyles.color.black,
    fontSize: 17,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeo-Bold',
        lineHeight: 20,
      },
      ios: {
        fontWeight: '700',
      },
    }),
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingRight: 11,
  },
  image: {
    width: 64.5,
    height: 64.5,
    borderRadius: 13,
  },
  title: {
    fontSize: 13,
    lineHeight: 16,
    paddingBottom: 3,
    color: AppStyles.color.black,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeo-Bold',
      },
      ios: {
        fontWeight: '600',
      },
    }),
  },
  subTitle: {
    fontSize: 11,
    lineHeight: 13,
    paddingBottom: 11.46,
    color: AppStyles.color.midGray,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {
        fontWeight: '400',
      },
    }),
  },
  price: {
    fontSize: 11,
    lineHeight: 13,
    color: AppStyles.color.midBlack,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {
        fontWeight: '400',
      },
    }),
  },
});

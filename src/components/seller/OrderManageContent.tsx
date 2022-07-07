import {
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {FC} from 'react';
import {
  ISellerOrder,
  ISellerOrderList,
  IStoreMenuListDto,
} from '../../services/orderService';
import {AppStyles} from '../../styles/AppStyles';
import {priceFormatParser} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../screens/navigator';
import {useRecoilState, useRecoilValue} from 'recoil';
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
    const [orderListState, setOrderModalState] =
      useRecoilState(orderListModalState);
    const [orderSheetId, setOrderSheetId] = useRecoilState(orderSheetIdState);
    // 특정 주문서 가져오기

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
              uri: 'https://onecake-image-bucket.s3.ap-northeast-2.amazonaws.com/a9bcd249-5d3c-41bb-b4cf-afcb406b20ee-D446A8F7-4323-4A61-8158-794082BBF508.jpg',
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.title}>{item.menuName}</Text>
          <Text style={styles.subTitle}>{item.menuDescription}</Text>
          <Text style={styles.price}>{priceFormatParser(item.price)}원~</Text>
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
    fontWeight: '700',
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 11,
  },
  image: {
    width: 64.5,
    height: 64.5,
    borderRadius: 13,
  },
  title: {
    fontWeight: '600',
    fontSize: 13,
    lineHeight: 16,
    color: AppStyles.color.black,
  },
  subTitle: {
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 13,
    color: AppStyles.color.midGray,
    paddingBottom: 11,
  },
  price: {
    fontWeight: '400',
    fontSize: 11,
    lineHeight: 13,
    color: AppStyles.color.midBlack,
  },
});

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
import {ISellerOrderList} from '../../services/orderService';
import {AppStyles} from '../../styles/AppStyles';
import {priceFormatParser} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../screens/navigator';
export type OrderManageContentProps = {
  title: string;
  renderData: ISellerOrderList[];
};
export const OrderManageContent: FC<OrderManageContentProps> = ({
  title,
  renderData,
}) => {
  const RenderItem = ({item, idx}: {item: ISellerOrderList; idx: number}) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('OrderSheet')}
        style={[
          styles.listItem,
          idx !== 0 && {
            borderTopWidth: 1,
            borderTopColor: AppStyles.color.border,
          },
        ]}>
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
          <Text style={styles.title}>{item.cakeTitle}</Text>
          <Text style={styles.subTitle}>{item.cakeDescription}</Text>
          <Text style={styles.price}>{priceFormatParser(item.price)}원~</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text style={styles.viewTitle}>{title}</Text>
      <View>
        {renderData.length > 0 &&
          renderData.map((val, idx) => (
            <RenderItem item={val} idx={idx} key={idx} />
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
    paddingVertical: 4,
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

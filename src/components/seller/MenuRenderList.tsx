import {
  Image,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {IMenuList} from '../../services';
import {AppStyles} from '../../styles/AppStyles';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {priceFormatParser} from '../../utils';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../screens/navigator';

export type MenuRenderListProps = {
  data: IMenuList[] | undefined;
};

export const MenuRenderList: FC<MenuRenderListProps> = ({data}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const RenderItem = (item: ListRenderItemInfo<IMenuList>) => {
    return (
      <View
        style={[
          styles.listItem,
          item.index !== 0 && {
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
          <Text style={styles.title}>{item.item.menuName}</Text>
          <Text style={styles.subTitle}>{item.item.menuDescription}</Text>
          <Text style={styles.price}>
            {priceFormatParser(item.item.price)}원~
          </Text>
        </View>
        <View style={styles.more}>
          <Icon name="dots-horizontal" size={20} color="#D9D9D9" />
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.view]}>
      <View style={[styles.shadowView, styles.listWrap]}>
        <FlatList data={data} renderItem={RenderItem} />
      </View>
      <TouchableOpacity
        style={[styles.shadowView, styles.btn]}
        onPress={() =>
          navigation.navigate('StackNavigator', {
            screen: 'EnterMenu',
          })
        }>
        <Image
          source={require('../../asset/plus_btn_gray.png')}
          style={{width: 25, height: 25}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 15,
    paddingTop: 24.24,
  },
  shadowView: {
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000000',
        shadowRadius: 9,
        shadowOffset: {height: 1, width: 0},
        shadowOpacity: 0.16,
      },
    }),
  },
  listWrap: {
    flex: 1,
    backgroundColor: AppStyles.color.white,
    borderRadius: 13,
  },
  image: {
    width: 64.5,
    height: 64.5,
    borderRadius: 13,
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 11,
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
  more: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginTop: 21,
    height: 70,
    backgroundColor: AppStyles.color.white,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

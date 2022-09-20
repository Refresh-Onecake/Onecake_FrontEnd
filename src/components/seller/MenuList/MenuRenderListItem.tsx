import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {FC, useCallback, useRef, useState} from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MenuRenderListDropdown} from './MenuRenderListDropdown';
import {AppStyles} from '../../../styles/AppStyles';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../screens/navigator';
import {useSetRecoilState} from 'recoil';
import {menuRenderListItemState} from '../../../recoil/atom';
type MenuRenderListItemProps = {
  menuId: number;
  idx: number;
  menuName: string;
  menuDescription: string;
  price: number;
  image: string;
};

export const MenuRenderListItem: FC<MenuRenderListItemProps> = ({
  menuId,
  idx,
  menuName,
  menuDescription,
  price,
  image,
}) => {
  const [visible, setVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const DropdownButton = useRef<TouchableOpacity | null>(null);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const setMenuRenderListItemState = useSetRecoilState(menuRenderListItemState);
  const openDropdown = useCallback(() => {
    DropdownButton.current?.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + 20);
      setDropdownLeft(_px - 185.44);
      setDropdownWidth(_w);
    });
    setVisible(true);
  }, []);

  const toggleDropdown = useCallback(() => {
    visible ? setVisible(false) : openDropdown();
  }, [openDropdown, visible]);

  const onClickMenuRenderListItem = () => {
    setMenuRenderListItemState({
      id: menuId,
      menuName,
      menuDescription,
      price,
      image,
    });
    navigation.navigate('MenuImage');
  };

  return (
    <TouchableOpacity
      onPress={onClickMenuRenderListItem}
      style={[
        styles.listItem,
        idx !== 0 && {
          borderTopWidth: 1,
          borderTopColor: AppStyles.color.border,
        },
      ]}>
      <View style={{paddingRight: 11.61}}>
        {/* FIXME: 이후 item.uri로 변경할 예정 */}
        <Image style={styles.image} source={{uri: image}} />
      </View>
      <View style={{flex: 1}}>
        <Text style={styles.title}>{menuName}</Text>
        <Text style={styles.subTitle}>{menuDescription}</Text>
        <Text style={styles.price}>{price}원~</Text>
      </View>
      <TouchableOpacity
        style={styles.more}
        ref={DropdownButton}
        onPress={toggleDropdown}>
        <Icon name="dots-horizontal" size={20} color="#D9D9D9" />
      </TouchableOpacity>
      <MenuRenderListDropdown
        menuId={menuId}
        visible={visible}
        setVisible={setVisible}
        dropdownLeft={dropdownLeft}
        dropdownTop={dropdownTop}
        dropdownWidth={dropdownWidth}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 13,
    lineHeight: 16,
    paddingVertical: 4,
    color: AppStyles.color.black,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {fontWeight: '600'},
    }),
  },
  subTitle: {
    fontSize: 11,
    lineHeight: 13,
    color: AppStyles.color.midGray,
    paddingBottom: 11,
    ...Platform.select({
      android: {
        fontFamily: 'AppleSDGothicNeoM',
      },
      ios: {fontWeight: '400'},
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
      ios: {fontWeight: '400'},
    }),
  },
  more: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

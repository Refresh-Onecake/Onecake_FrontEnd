import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useCallback, useRef, useState} from 'react';
import {AppStyles} from '../../styles/AppStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MenuRenderListDropdown} from './MenuRenderListDropdown';
type MenuRenderListItemProps = {
  idx: number;
  menuName: string;
  menuDescription: string;
  price: number;
};

export const MenuRenderListItem: FC<MenuRenderListItemProps> = ({
  idx,
  menuName,
  menuDescription,
  price,
}) => {
  const [visible, setVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const DropdownButton = useRef<TouchableOpacity | null>(null);

  const openDropdown = useCallback(() => {
    DropdownButton.current?.measure((_fx, _fy, _w, h, _px, py) => {
      console.log(py, _px, _w);
      setDropdownTop(py + 20);
      setDropdownLeft(_px - 185.44);
      setDropdownWidth(_w);
    });
    setVisible(true);
  }, []);

  const toggleDropdown = useCallback(() => {
    visible ? setVisible(false) : openDropdown();
  }, [openDropdown, visible]);

  return (
    <View
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
        visible={visible}
        setVisible={setVisible}
        dropdownLeft={dropdownLeft}
        dropdownTop={dropdownTop}
        dropdownWidth={dropdownWidth}
      />
    </View>
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
});

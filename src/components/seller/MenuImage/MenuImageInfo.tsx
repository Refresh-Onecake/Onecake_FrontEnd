import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {useRecoilValue} from 'recoil';
import {menuRenderListItemState} from '../../../recoil/atom';
import {AppStyles} from '../../../styles/AppStyles';

type MenuImageInfoProps = {
  title?: string;
  subTitle?: string;
};

export const MenuImageInfo: FC<MenuImageInfoProps> = ({
  subTitle = '케이크 맛',
  title = '케이크',
}) => {
  return (
    <View>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleWrap: {
    paddingBottom: 20.08,
  },
  title: {
    fontWeight: '600',
    fontSize: 15,
    color: AppStyles.color.black,
  },
  subTitle: {
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 22.65,
    color: '#818181',
  },
});

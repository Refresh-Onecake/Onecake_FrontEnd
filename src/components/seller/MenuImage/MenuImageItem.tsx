import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {AppStyles} from '../../../styles/AppStyles';
import {MenuImageUploadItem} from './MenuImageUploadItem';

type MenuImageItemProps = {
  item: {
    id: number;
    image: string;
  };
  index: number;
  width: number;
};

export const MenuImageItem: FC<MenuImageItemProps> = ({item, index, width}) => {
  return (
    <View style={styles.view}>
      {item.id < 0 ? (
        <MenuImageUploadItem width={width} />
      ) : (
        <Image
          source={{uri: item.image}}
          style={{width: width, height: width}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {paddingBottom: 2, paddingRight: 2},
});

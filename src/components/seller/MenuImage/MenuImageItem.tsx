import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

type MenuImageItemProps = {
  item: {
    id: number;
    image: string;
  };
  index: number;
  width: number;
};

export const MenuImageItem: FC<MenuImageItemProps> = ({item, index, width}) => {
  console.log(item, index);
  return (
    <View style={styles.view}>
      <Image source={{uri: item.image}} style={{width: width, height: width}} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {paddingBottom: 2},
});

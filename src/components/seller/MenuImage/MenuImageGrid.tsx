import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useCallback, useMemo, useState} from 'react';
import {Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {MenuImageItem} from './MenuImageItem';
import {MenuImageUploadItem} from './MenuImageUploadItem';
type MenuImageGridProps = {
  images?: {
    id: number;
    image: string;
  }[];
  menuId: number;
};

const NUM_COLUMNS = 3;

export const MenuImageGrid: FC<MenuImageGridProps> = ({images, menuId}) => {
  const [containerWidth, setContainerWidth] = useState(0);

  const currentWidth = useMemo(() => {
    return containerWidth / NUM_COLUMNS;
  }, [containerWidth]);
  console.log(menuId);
  return (
    <View>
      {images && images.length > 0 && (
        <FlatList
          data={images}
          numColumns={NUM_COLUMNS}
          onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
          renderItem={item => (
            <MenuImageItem
              item={item.item}
              index={item.index}
              width={currentWidth}
              menuId={menuId}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

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
};

const NUM_COLUMNS = 3;

export const MenuImageGrid: FC<MenuImageGridProps> = ({images}) => {
  const [containerWidth, setContainerWidth] = useState(0);

  const currentWidth = useMemo(() => {
    return containerWidth / NUM_COLUMNS;
  }, [containerWidth]);

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
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

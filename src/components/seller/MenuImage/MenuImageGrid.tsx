import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useMemo, useState} from 'react';
import {MenuImageUploadItem} from './MenuImageUploadItem';
import {FlatList} from 'react-native-gesture-handler';
import {MenuImageItem} from './MenuImageItem';

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
      <FlatList
        columnWrapperStyle={styles.list}
        data={images}
        numColumns={NUM_COLUMNS}
        onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
        renderItem={item => (
          <MenuImageItem
            item={item.item}
            index={item.index}
            width={currentWidth - 2}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    justifyContent: 'space-between',
  },
});

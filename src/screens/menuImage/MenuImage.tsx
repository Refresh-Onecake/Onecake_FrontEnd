import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {MenuImageGrid, MenuImageInfo} from '../../components/seller/MenuImage';
import {AppStyles} from '../../styles/AppStyles';

import {useRecoilValue} from 'recoil';
import {menuRenderListItemState} from '../../recoil/atom';
import {useQueryClient} from 'react-query';
import {useGetMenuListItemDetailsQuery} from '../../hooks/useGetMenuListItemDetailsQuery';

export const MenuImage = () => {
  const menuRenderItemData = useRecoilValue(menuRenderListItemState);
  const queryClient = useQueryClient();
  const {data} = useGetMenuListItemDetailsQuery(
    queryClient,
    menuRenderItemData.id,
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: AppStyles.color.white,
        flex: 1,
        borderTopWidth: 6,
        borderTopColor: '#F4F4F4',
      }}>
      <View style={styles.menuImageInfoWrap}>
        <MenuImageInfo subTitle={data && data.menuTaste} title={'전체사진'} />
      </View>

      {/* 그리드 컴포넌트로 추상화할 곳 */}
      <View style={styles.gridWrap}>
        <MenuImageGrid
          images={data && data.images}
          menuId={menuRenderItemData.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gridWrap: {
    flex: 1,
  },
  menuImageInfoWrap: {
    paddingHorizontal: 15.74,
    paddingVertical: 22.26,
  },
});

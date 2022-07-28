import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {menuImageDetailState} from '../../recoil/atom';
import {AppStyles} from '../../styles/AppStyles';
import {MenuImageInfo} from '../../components/seller/MenuImage';
import {useGetMenuImageDetailQuery} from '../../hooks';
import {useQueryClient} from 'react-query';

export type IMenuImageDetailsItem = {
  imageId: number;
  image: string;
  menuId: number;
};

export const MenuImageDetails = () => {
  const useMenuImageDetailItem = useRecoilValue(menuImageDetailState);
  console.log(
    useMenuImageDetailItem.imageId,
    useMenuImageDetailItem.image,
    useMenuImageDetailItem.menuId,
  );
  const queryClient = useQueryClient();
  const {data} = useGetMenuImageDetailQuery(
    queryClient,
    useMenuImageDetailItem.menuId,
    useMenuImageDetailItem.imageId,
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
        <MenuImageInfo subTitle={'안녕'} title={'전체사진'} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  menuImageInfoWrap: {
    paddingHorizontal: 15.74,
    paddingVertical: 22.26,
  },
});

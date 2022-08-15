import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {menuImageDetailState} from '../../recoil/atom';
import {AppStyles} from '../../styles/AppStyles';
import {MenuImageInfo} from '../../components/seller/MenuImage';
import {useGetMenuImageDetailQuery} from '../../hooks';
import {useQueryClient} from 'react-query';
import {anniversaryKeywordTranslate} from '../../utils';

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
        <MenuImageInfo
          subTitle={data?.imageDescription}
          title={data?.keyWord}
        />
      </View>
      <View>
        <Image
          style={styles.img}
          source={{uri: useMenuImageDetailItem.image}}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  menuImageInfoWrap: {
    paddingHorizontal: 15.74,
    paddingTop: 22.26,
    paddingBottom: 16.64,
  },
  img: {
    width: '100%',
    height: 375,
  },
});
